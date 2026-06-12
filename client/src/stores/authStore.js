import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  loginUser, registerUser, getMe,
  updateProfile as updateProfileApi,
  getWishlistLists as getWishlistListsApi,
  getWishlistList as getWishlistListApi,
  createWishlistList as createWishlistListApi,
  deleteWishlistList as deleteWishlistListApi,
  addToWishlistList as addToWishlistListApi,
  removeFromWishlistList as removeFromWishlistListApi,
  createBooking as createBookingApi,
  getBookings as getBookingsApi,
  cancelBooking as cancelBookingApi,
  createReview as createReviewApi,
} from "../api.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const wishlistCount = ref(0);

  const isLoggedIn = computed(() => !!token.value && !!user.value);

  function setAuth(data) {
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async function login(email, password) {
    loading.value = true;
    try {
      const data = await loginUser(email, password);
      setAuth(data);
      fetchWishlistCount();
      return data;
    } finally {
      loading.value = false;
    }
  }

  async function register(name, email, password) {
    loading.value = true;
    try {
      const data = await registerUser(name, email, password);
      setAuth(data);
      fetchWishlistCount();
      return data;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    clearAuth();
  }

  async function fetchWishlistCount() {
    try {
      const lists = await getWishlistListsApi();
      const total = lists.reduce((sum, l) => sum + (l.items?.length || 0), 0);
      wishlistCount.value = total;
    } catch {
      wishlistCount.value = 0;
    }
  }

  async function checkAuth() {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!storedToken || !storedUser) {
      clearAuth();
      return;
    }
    token.value = storedToken;
    try {
      const data = await getMe();
      user.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
      fetchWishlistCount();
    } catch {
      clearAuth();
    }
  }

  function init() {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      token.value = storedToken;
      try {
        user.value = JSON.parse(storedUser);
      } catch {
        user.value = null;
      }
    }
  }

  async function updateProfile(data) {
    const res = await updateProfileApi(data);
    setAuth(res);
    return res;
  }

  // Wishlist lists
  async function getWishlistLists() {
    return getWishlistListsApi();
  }

  async function getWishlistList(id) {
    return getWishlistListApi(id);
  }

  async function createWishlistList(name) {
    return createWishlistListApi(name);
  }

  async function deleteWishlistList(id) {
    return deleteWishlistListApi(id);
  }

  async function addToWishlistList(listId, listingId) {
    return addToWishlistListApi(listId, listingId);
  }

  async function removeFromWishlistList(listId, listingId) {
    return removeFromWishlistListApi(listId, listingId);
  }

  // Bookings
  async function createBooking(data) {
    return createBookingApi(data);
  }

  async function getBookings() {
    return getBookingsApi();
  }

  async function cancelBooking(id) {
    return cancelBookingApi(id);
  }

  async function createReview(data) {
    return createReviewApi(data);
  }

  return {
    user, token, loading, isLoggedIn, wishlistCount,
    login, register, logout, checkAuth, init, updateProfile, fetchWishlistCount,
    getWishlistLists, getWishlistList, createWishlistList, deleteWishlistList,
    addToWishlistList, removeFromWishlistList,
    createBooking, getBookings, cancelBooking, createReview,
  };
});
