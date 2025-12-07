const trimTrailingSlash = (value = "") =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const env = import.meta.env;

export const API_BASES = {
  auth: trimTrailingSlash(env.VITE_AUTH_API_URL ?? "http://localhost:3001/api/v1/auth"),
  darna: trimTrailingSlash(env.VITE_DARNA_API_URL ?? "http://localhost:4001/api"),
  tirelire: trimTrailingSlash(env.VITE_TIRELIRE_API_URL ?? "http://localhost:5001/api"),
};

export const APP_BASE_URL =
  trimTrailingSlash(env.VITE_APP_BASE_URL ?? window.location.origin);

export const GOOGLE_SSO_URL = `${API_BASES.auth}/google`;

export const SSO_ALLOWED_ORIGINS = (env.VITE_SSO_ALLOWED_ORIGINS ?? APP_BASE_URL)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

