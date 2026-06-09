const BASE = "https://getyourticket-api.onrender.com/api";

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
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

export async function getListingsWithTotal(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await fetchJSON(`${BASE}/listings${qs ? `?${qs}` : ""}`);
  return data; // { listings: [...], total: number }
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

export async function updateProfile(data) {
  return fetchJSON(`${BASE}/user/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
}

export async function getWishlistLists() {
  return fetchJSON(`${BASE}/user/wishlist-lists`, {
    headers: { ...authHeaders() },
  });
}

export async function getWishlistList(id) {
  return fetchJSON(`${BASE}/user/wishlist-lists/${id}`, {
    headers: { ...authHeaders() },
  });
}

export async function createWishlistList(name) {
  return fetchJSON(`${BASE}/user/wishlist-lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name }),
  });
}

export async function deleteWishlistList(id) {
  return fetchJSON(`${BASE}/user/wishlist-lists/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}

export async function addToWishlistList(listId, listingId) {
  return fetchJSON(`${BASE}/user/wishlist-lists/${listId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ listingId }),
  });
}

export async function removeFromWishlistList(listId, listingId) {
  return fetchJSON(`${BASE}/user/wishlist-lists/${listId}/items/${listingId}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}

export async function getBookings() {
  return fetchJSON(`${BASE}/user/bookings`, {
    headers: { ...authHeaders() },
  });
}

export async function createBooking(data) {
  return fetchJSON(`${BASE}/user/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
}

export async function cancelBooking(id) {
  return fetchJSON(`${BASE}/user/bookings/${id}/cancel`, {
    method: "PUT",
    headers: { ...authHeaders() },
  });
}

export async function createReview(data) {
  return fetchJSON(`${BASE}/user/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
}

export async function getUserStats() {
  return fetchJSON(`${BASE}/user/stats`, {
    headers: { ...authHeaders() },
  });
}

export async function createPaymentIntent(amount, currency = "usd") {
  return fetchJSON(`${BASE}/payments/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ amount, currency }),
  });
}

export async function forgotPassword(email) {
  return fetchJSON(`${BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token, password) {
  return fetchJSON(`${BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
}

export async function subscribeNewsletter(email) {
  return fetchJSON(`${BASE}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

// Admin endpoints
export async function getAdminListings(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await fetchJSON(`${BASE}/admin/listings${qs ? `?${qs}` : ""}`, {
    headers: { ...authHeaders() },
  });
  return data; // { listings: [...], total: number }
}

export async function createAdminListing(data) {
  return fetchJSON(`${BASE}/admin/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
}

export async function updateAdminListing(id, data) {
  return fetchJSON(`${BASE}/admin/listings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
}

export async function deleteAdminListing(id) {
  return fetchJSON(`${BASE}/admin/listings/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}

export async function getAdminUsers() {
  const data = await fetchJSON(`${BASE}/admin/users`, {
    headers: { ...authHeaders() },
  });
  return data; // { users: [...] }
}

export async function updateAdminUserRole(userId, role) {
  return fetchJSON(`${BASE}/admin/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ role }),
  });
}

export async function deleteAdminUser(userId) {
  return fetchJSON(`${BASE}/admin/users/${userId}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}
