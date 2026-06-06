import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

const STORAGE_PREFIX = "touriste-favorites";

const relationByType = {
  city: "city",
  activity: "activity",
  restaurant: "restaurant",
  place: "place",
  gem: "gem",
};

const getStorageKey = (userId) => `${STORAGE_PREFIX}-${userId || "guest"}`;

const getFavoriteKey = (itemType, itemId) => `${itemType}:${itemId}`;

const isSameFavorite = (favorite, itemType, itemId) =>
  favorite?.item_type === itemType && String(favorite?.item_id) === String(itemId);

const isLocalFavoriteId = (favoriteId) => String(favoriteId || "").startsWith("local-");

const normalizeFavorite = (favorite, options = {}) => {
  if (!favorite?.item_type || !favorite?.item_id) return null;

  const relation = relationByType[favorite.item_type];
  if (!relation) return null;

  const item = favorite[relation] || favorite.item || null;
  const normalized = {
    ...favorite,
    favorite_id:
      favorite.favorite_id ||
      (options.persisted && !isLocalFavoriteId(favorite.id) ? favorite.id : null),
  };

  if (item) {
    normalized.item = item;
    normalized[relation] = item;
  }

  return normalized;
};

const normalizeFavorites = (favorites, options = {}) =>
  favorites
    .map((favorite) => normalizeFavorite(favorite, options))
    .filter(Boolean);

const readStoredFavorites = (storageKey) => {
  try {
    const stored = localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? normalizeFavorites(parsed) : [];
  } catch (error) {
    console.error("Unable to read favorites from storage:", error);
    return [];
  }
};

const writeStoredFavorites = (storageKey, favorites) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch (error) {
    console.error("Unable to save favorites to storage:", error);
  }
};

const buildLocalFavorite = (itemType, item, userId) => {
  const relation = relationByType[itemType];

  return {
    id: `local-${itemType}-${item.id}`,
    favorite_id: null,
    user_id: userId || null,
    item_type: itemType,
    item_id: item.id,
    local: true,
    item,
    [relation]: item,
  };
};

const mergeWithStoredFavorites = (apiFavorites, storedFavorites) => {
  const normalizedApiFavorites = normalizeFavorites(apiFavorites, { persisted: true });
  const normalizedStoredFavorites = normalizeFavorites(storedFavorites);
  const storedByKey = new Map(
    normalizedStoredFavorites.map((favorite) => [
      getFavoriteKey(favorite.item_type, favorite.item_id),
      favorite,
    ])
  );

  const merged = normalizedApiFavorites.map((favorite) => {
    const relation = relationByType[favorite.item_type];
    const stored = storedByKey.get(getFavoriteKey(favorite.item_type, favorite.item_id));
    const storedItem = stored?.[relation] || stored?.item;

    if (relation && storedItem && !favorite?.[relation]) {
      return {
        ...favorite,
        item: favorite.item || storedItem,
        [relation]: storedItem,
      };
    }

    return favorite;
  });

  const apiKeys = new Set(
    merged.map((favorite) => getFavoriteKey(favorite.item_type, favorite.item_id))
  );

  normalizedStoredFavorites.forEach((favorite) => {
    const key = getFavoriteKey(favorite.item_type, favorite.item_id);
    if (!apiKeys.has(key) && favorite.local) {
      merged.push(favorite);
    }
  });

  return merged;
};

export function FavoritesProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const storageKey = useMemo(() => getStorageKey(userId), [userId]);

  const [favorites, setFavorites] = useState(() =>
    readStoredFavorites(getStorageKey(userId))
  );
  const [loading, setLoading] = useState(false);

  const replaceFavorites = useCallback(
    (updater) => {
      setFavorites((current) => {
        const next = typeof updater === "function" ? updater(current) : updater;
        writeStoredFavorites(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );

  const refreshFavorites = useCallback(async () => {
    if (authLoading) return [];

    const storedFavorites = readStoredFavorites(storageKey);

    if (!userId) {
      setFavorites(storedFavorites);
      return storedFavorites;
    }

    setLoading(true);

    try {
      const response = await api.get("/favorites", {
        params: { user_id: userId },
      });
      const apiFavorites = Array.isArray(response.data)
        ? response.data
        : response.data?.favorites || [];
      const mergedFavorites = mergeWithStoredFavorites(apiFavorites, storedFavorites);

      writeStoredFavorites(storageKey, mergedFavorites);
      setFavorites(mergedFavorites);

      return mergedFavorites;
    } catch (error) {
      console.error("Unable to fetch favorites:", error);
      setFavorites(storedFavorites);
      return storedFavorites;
    } finally {
      setLoading(false);
    }
  }, [authLoading, storageKey, userId]);

  useEffect(() => {
    setFavorites(readStoredFavorites(storageKey));
    refreshFavorites();
  }, [refreshFavorites, storageKey]);

  const getFavorite = useCallback(
    (itemType, itemId) =>
      favorites.find((favorite) => isSameFavorite(favorite, itemType, itemId)),
    [favorites]
  );

  const isFavorite = useCallback(
    (itemType, itemId) => Boolean(getFavorite(itemType, itemId)),
    [getFavorite]
  );

  const toggleFavorite = useCallback(
    async (itemType, item) => {
      if (!item?.id || !relationByType[itemType]) return false;

      const existingFavorite = getFavorite(itemType, item.id);
      const optimisticFavorite = buildLocalFavorite(itemType, item, userId);

      replaceFavorites((current) =>
        existingFavorite
          ? current.filter((favorite) => !isSameFavorite(favorite, itemType, item.id))
          : [optimisticFavorite, ...current]
      );

      if (!userId) {
        return !existingFavorite;
      }

      try {
        const response = await api.post("/favorites/toggle", {
          user_id: userId,
          item_type: itemType,
          item_id: item.id,
        });

        if (response.data?.saved === false) {
          replaceFavorites((current) =>
            current.filter((favorite) => !isSameFavorite(favorite, itemType, item.id))
          );
          return false;
        }

        if (response.data?.favorite) {
          const relation = relationByType[itemType];
          const serverFavorite = normalizeFavorite(
            {
              ...response.data.favorite,
              item: response.data.favorite.item || response.data.favorite[relation] || item,
              [relation]: response.data.favorite[relation] || response.data.favorite.item || item,
            },
            { persisted: true }
          );

          replaceFavorites((current) => [
            serverFavorite,
            ...current.filter(
              (favorite) => !isSameFavorite(favorite, itemType, item.id)
            ),
          ]);
        }

        return true;
      } catch (error) {
        console.error("Unable to toggle favorite:", error);

        replaceFavorites((current) => {
          const withoutOptimistic = current.filter(
            (favorite) => !isSameFavorite(favorite, itemType, item.id)
          );

          return existingFavorite ? [existingFavorite, ...withoutOptimistic] : withoutOptimistic;
        });

        return Boolean(existingFavorite);
      }
    },
    [getFavorite, replaceFavorites, userId]
  );

  const removeFavorite = useCallback(
    async (favoriteToRemove) => {
      if (!favoriteToRemove) return;

      replaceFavorites((current) =>
        current.filter(
          (favorite) =>
            !isSameFavorite(
              favorite,
              favoriteToRemove.item_type,
              favoriteToRemove.item_id
            )
        )
      );

      if (!userId || String(favoriteToRemove.id).startsWith("local-")) {
        return;
      }

      try {
        const payload = {
          user_id: userId,
          item_type: favoriteToRemove.item_type,
          item_id: favoriteToRemove.item_id,
        };

        if (favoriteToRemove.favorite_id) {
          await api.delete(`/favorites/${favoriteToRemove.favorite_id}`, {
            data: payload,
          });
        } else {
          await api.delete("/favorites/by-item", {
            data: payload,
          });
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          return;
        }

        console.error("Unable to remove favorite:", error);
        replaceFavorites((current) => [favoriteToRemove, ...current]);
      }
    },
    [replaceFavorites, userId]
  );

  const value = useMemo(
    () => ({
      favorites,
      loading,
      getFavorite,
      isFavorite,
      refreshFavorites,
      removeFavorite,
      toggleFavorite,
    }),
    [
      favorites,
      getFavorite,
      isFavorite,
      loading,
      refreshFavorites,
      removeFavorite,
      toggleFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
