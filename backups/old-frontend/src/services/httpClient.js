import { API_BASES } from "../config/apiConfig";

const METHODS_WITHOUT_BODY = ["GET", "DELETE"];

const buildUrl = (service, path = "", query = {}) => {
  const base = API_BASES[service];
  const normalizedPath = path.startsWith("/")
    ? path.substring(1)
    : path;
  const url = new URL(`${base}/${normalizedPath}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url;
};

const parseResponse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const serviceRequest = async ({
  service,
  path,
  method = "GET",
  token,
  body,
  query,
  headers = {},
  formData,
}) => {
  const url = buildUrl(service, path, query);
  const finalHeaders = new Headers(headers);
  if (token) {
    finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  let payload;
  if (!METHODS_WITHOUT_BODY.includes(method.toUpperCase())) {
    if (formData) {
      payload = formData;
    } else if (body !== undefined) {
      finalHeaders.set("Content-Type", "application/json");
      payload = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: payload,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

