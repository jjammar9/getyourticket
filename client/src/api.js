const BASE = "/api";

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginUser(email, password) {
  return fetchJSON(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(name, email, password) {
  return fetchJSON(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
}

export async function getMe() {
  return fetchJSON(`${BASE}/auth/me`, {
    headers: { ...authHeaders() },
  });
}

export async function getListings(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await fetchJSON(`${BASE}/listings${qs ? `?${qs}` : ""}`);
  return data.listings;
}

export async function getListingById(id) {
  const data = await fetchJSON(`${BASE}/listings/${id}`);
  return data.listing;
}

export async function getCountries() {
  const data = await fetchJSON(`${BASE}/countries`);
  return data.countries;
}

export async function getCountryBySlug(slug) {
  const data = await fetchJSON(`${BASE}/countries/${slug}`);
  return data.country;
}

export async function getCategories() {
  const data = await fetchJSON(`${BASE}/categories`);
  return data.categories;
}

export async function getSiteContent(key) {
  const data = await fetchJSON(`${BASE}/site-content/${key}`);
  return data.content.value;
}

export async function getAllSiteContent() {
  const data = await fetchJSON(`${BASE}/site-content`);
  return data.siteContent;
}

export async function getReviews(expId) {
  const qs = expId ? `?expId=${expId}` : "";
  const data = await fetchJSON(`${BASE}/reviews${qs}`);
  return data.reviews;
}
