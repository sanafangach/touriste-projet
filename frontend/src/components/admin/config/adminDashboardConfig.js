import {
  Activity,
  Building2,
  Gem,
  Heart,
  MapPin,
  Users,
  Utensils,
} from "lucide-react";

export const uploadsBaseUrl = "http://localhost:8000/uploads/";

export const adminEndpoints = {
  users: "/admin/users",
  cities: "/admin/cities",
  activities: "/admin/activities",
  restaurants: "/admin/restaurants",
  places: "/admin/places",
  hiddenGems: "/admin/hidden-gems",
  favorites: "/admin/favorites",
};

export const adminSections = [
  { key: "users", label: "Users", singular: "User", icon: Users },
  { key: "cities", label: "Cities", singular: "City", icon: MapPin },
  { key: "activities", label: "Activities", singular: "Activity", icon: Activity },
  { key: "restaurants", label: "Restaurants", singular: "Restaurant", icon: Utensils },
  { key: "places", label: "Places", singular: "Place", icon: Building2 },
  { key: "hiddenGems", label: "Hidden Gems", singular: "Hidden Gem", icon: Gem },
  { key: "favorites", label: "Favorites", singular: "Favorite", icon: Heart, readOnly: true },
];

export const adminStatCards = [
  { key: "total_users", label: "Users", icon: Users, tone: "blue", collection: "users" },
  { key: "total_cities", label: "Cities", icon: MapPin, tone: "green", collection: "cities" },
  { key: "total_activities", label: "Activities", icon: Activity, tone: "amber", collection: "activities" },
  { key: "total_restaurants", label: "Restaurants", icon: Utensils, tone: "rose", collection: "restaurants" },
  { key: "total_places", label: "Places", icon: Building2, tone: "violet", collection: "places" },
  { key: "total_hidden_gems", label: "Hidden Gems", icon: Gem, tone: "cyan", collection: "hiddenGems" },
  { key: "total_favorites", label: "Favorites", icon: Heart, tone: "teal", collection: "favorites" },
];

export const favoriteRelationByType = {
  city: "city",
  activity: "activity",
  restaurant: "restaurant",
  place: "place",
  gem: "gem",
};

export const favoriteTypeLabels = {
  city: "City",
  activity: "Activity",
  restaurant: "Restaurant",
  place: "Place",
  gem: "Hidden gem",
};

export const createEmptyCollections = () => ({
  users: [],
  cities: [],
  activities: [],
  restaurants: [],
  places: [],
  hiddenGems: [],
  favorites: [],
});
