const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");
const trimLeadingSlash = (value) => String(value || "").replace(/^\/+/, "");

export const BACKEND_BASE_URL = trimTrailingSlash(
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000"
);

export const API_BASE_URL = trimTrailingSlash(
  process.env.REACT_APP_API_URL || `${BACKEND_BASE_URL}/api`
);

export const UPLOADS_BASE_URL = `${BACKEND_BASE_URL}/uploads/`;

export const isResolvedAssetUrl = (value) =>
  typeof value === "string" &&
  (value.startsWith("http") ||
    value.startsWith("/") ||
    value.startsWith("data:") ||
    value.startsWith("blob:"));

export const getUploadUrl = (path) => {
  if (!path) return "";
  return isResolvedAssetUrl(path)
    ? path
    : `${UPLOADS_BASE_URL}${trimLeadingSlash(path)}`;
};
