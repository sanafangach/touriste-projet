export const getFieldConfig = (section, mode, cities = [], isSelf = false) => {
  const cityOptions = cities.map((city) => ({
    value: String(city.id),
    label: city.name,
  }));

  const sharedContentFields = [
    {
      name: "city_id",
      label: "City",
      type: "select",
      required: true,
      options: cityOptions,
      disabled: cityOptions.length === 0,
    },
    { name: "name", label: "Name", type: "text", required: true },
    { name: "rating", label: "Rating", type: "number", min: "0", max: "5", step: "0.1" },
    { name: "image", label: "Image path", type: "text" },
    { name: "image_file", label: "Upload image", type: "file" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const configs = {
    users: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "password",
        label: mode === "create" ? "Password" : "New password",
        type: "password",
        required: mode === "create",
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        disabled: isSelf,
        options: [
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
        ],
      },
      { name: "ville", label: "City", type: "text" },
      { name: "image", label: "Avatar URL", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
    ],
    cities: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "rating", label: "Rating", type: "number", min: "0", max: "5", step: "0.1" },
      { name: "image", label: "Image path", type: "text" },
      { name: "image_file", label: "Upload image", type: "file" },
      { name: "description", label: "Description", type: "textarea" },
    ],
    activities: [
      ...sharedContentFields.slice(0, 3),
      { name: "price", label: "Price", type: "number", min: "0", step: "0.01", suffix: "MAD" },
      { name: "duration", label: "Duration", type: "text" },
      ...sharedContentFields.slice(3),
    ],
    restaurants: [
      ...sharedContentFields.slice(0, 3),
      { name: "cuisine", label: "Cuisine", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "opening_hours", label: "Opening hours", type: "text" },
      ...sharedContentFields.slice(3),
    ],
    places: [
      ...sharedContentFields.slice(0, 3),
      { name: "category", label: "Category", type: "text" },
      { name: "entry_price", label: "Entry price", type: "number", min: "0", step: "0.01" },
      ...sharedContentFields.slice(3),
    ],
    hiddenGems: [
      ...sharedContentFields.slice(0, 2),
      { name: "location", label: "Location", type: "text" },
      { name: "best_time", label: "Best time", type: "text" },
      ...sharedContentFields.slice(3),
    ],
    hotels: [
      ...sharedContentFields.slice(0, 3),
      { name: "price", label: "Price", type: "text", suffix: "MAD" },
      { name: "reviews", label: "Reviews", type: "text", suffix: "k" },
      {
        name: "budget_level",
        label: "Budget level",
        type: "select",
        options: [
          { value: "cheap", label: "Cheap" },
          { value: "moderate", label: "Moderate" },
          { value: "luxury", label: "Luxury" },
        ],
      },
      { name: "source", label: "Source", type: "text" },
      { name: "maps_query", label: "Maps query", type: "text" },
      ...sharedContentFields.slice(3),
    ],
  };

  return configs[section] || [];
};
