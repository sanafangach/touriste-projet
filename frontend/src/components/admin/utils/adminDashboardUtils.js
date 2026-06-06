import {
  favoriteRelationByType,
  uploadsBaseUrl,
} from "../config/adminDashboardConfig";

const isResolvedImage = (image) =>
  typeof image === "string" &&
  (image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:") ||
    image.startsWith("blob:"));

const toFormValue = (value, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  return String(value);
};

export const getImageSrc = (image) => {
  if (!image) return "";
  return isResolvedImage(image) ? image : `${uploadsBaseUrl}${image}`;
};

export const normalizeList = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  return [];
};

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  const validationMessage = data?.errors
    ? Object.values(data.errors)?.[0]?.[0]
    : "";

  return validationMessage || data?.message || "Something went wrong. Please try again.";
};

export const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getFavoriteItem = (favorite) => {
  const relation = favoriteRelationByType[favorite?.item_type];

  return favorite?.item || favorite?.[relation] || null;
};

export const getFavoriteCityName = (favorite) => {
  const item = getFavoriteItem(favorite);

  if (favorite?.item_type === "city") return item?.name || "-";
  return item?.city?.name || favorite?.city?.name || "-";
};

export const getEmptyForm = (section, cities = []) => {
  const firstCityId = cities[0]?.id ? String(cities[0].id) : "";

  const forms = {
    users: {
      name: "",
      email: "",
      password: "",
      role: "user",
      image: "",
      ville: "",
      bio: "",
    },
    cities: {
      name: "",
      slug: "",
      image: "",
      image_file: null,
      description: "",
      rating: "0",
    },
    activities: {
      city_id: firstCityId,
      name: "",
      image: "",
      image_file: null,
      price: "0",
      duration: "",
      rating: "0",
      description: "",
    },
    restaurants: {
      city_id: firstCityId,
      name: "",
      image: "",
      image_file: null,
      cuisine: "",
      rating: "0",
      description: "",
      phone: "",
      opening_hours: "",
    },
    places: {
      city_id: firstCityId,
      name: "",
      image: "",
      image_file: null,
      category: "",
      rating: "0",
      description: "",
      entry_price: "0",
    },
    hiddenGems: {
      city_id: firstCityId,
      name: "",
      image: "",
      image_file: null,
      location: "",
      best_time: "",
      description: "",
    },
  };

  return { ...(forms[section] || {}) };
};

export const getFormFromItem = (section, item, cities = []) => {
  const base = getEmptyForm(section, cities);
  const next = { ...base, ...item };

  if (section === "users") {
    return {
      ...next,
      password: "",
      name: toFormValue(item.name),
      email: toFormValue(item.email),
      role: item.role || "user",
      image: toFormValue(item.image),
      ville: toFormValue(item.ville),
      bio: toFormValue(item.bio),
    };
  }

  next.city_id = toFormValue(item.city_id, base.city_id);
  next.rating = toFormValue(item.rating, "0");
  next.price = toFormValue(item.price, "0");
  next.entry_price = toFormValue(item.entry_price, "0");
  next.image = toFormValue(item.image);
  next.image_file = null;

  return next;
};

export const buildAdminFormData = (form) => {
  const payload = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (key === "image_file") {
      if (typeof File !== "undefined" && value instanceof File) {
        payload.append(key, value);
      }
      return;
    }

    if (value !== undefined && value !== null) {
      payload.append(key, value);
    }
  });

  return payload;
};
