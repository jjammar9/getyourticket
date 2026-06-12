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
  const bookingCount = ref(0);
  const wishlistItemIds = ref([]);
  const itemToListMap = ref({});

  const isLoggedIn = computed(() => !!token.value && !!user.value);

  function isInWishlist(listingId) {
    return wishlistItemIds.value.includes(listingId);
  }

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
      fetchWishlistData();
      fetchBookingCount();
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
      fetchWishlistData();
      fetchBookingCount();
      return data;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    clearAuth();
  }

  async function fetchWishlistData() {
    try {
      const lists = await getWishlistListsApi();
      const ids = [];
      const map = {};
      let total = 0;
      for (const list of lists) {
        if (list.items) {
          for (const item of list.items) {
            const lid = item.listing?.id || item.listingId;
            if (lid) {
              ids.push(lid);
              map[lid] = list.id;
              total++;
            }
          }
        }
      }
      wishlistItemIds.value = ids;
      itemToListMap.value = map;
      wishlistCount.value = total;
    } catch {
      wishlistItemIds.value = [];
      itemToListMap.value = {};
      wishlistCount.value = 0;
    }
  }

  async function fetchBookingCount() {
    try {
      const bookingsData = await getBookingsApi();
      bookingCount.value = Array.isArray(bookingsData) ? bookingsData.length : 0;
    } catch {
      bookingCount.value = 0;
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
      fetchWishlistData();
      fetchBookingCount();
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

  async function toggleWishlist(listingId) {
    if (!isLoggedIn.value) return;
    if (isInWishlist(listingId)) {
      const listId = itemToListMap.value[listingId];
      if (listId) {
        await removeFromWishlistListApi(listId, listingId);
        wishlistItemIds.value = wishlistItemIds.value.filter((id) => id !== listingId);
        const newMap = { ...itemToListMap.value };
        delete newMap[listingId];
        itemToListMap.value = newMap;
        wishlistCount.value = Math.max(0, wishlistCount.value - 1);
      }
    } else {
      let lists = await getWishlistListsApi();
      let targetList;
      if (lists.length === 0) {
        const created = await createWishlistListApi("Favorites");
        targetList = created.list;
      } else {
        targetList = lists[0];
      }
      await addToWishlistListApi(targetList.id, listingId);
      wishlistItemIds.value = [...wishlistItemIds.value, listingId];
      itemToListMap.value = { ...itemToListMap.value, [listingId]: targetList.id };
      wishlistCount.value += 1;
    }
  }

  async function removeWishlistItem(listingId) {
    if (!isInWishlist(listingId)) return;
    const listId = itemToListMap.value[listingId];
    if (listId) {
      await removeFromWishlistListApi(listId, listingId);
      wishlistItemIds.value = wishlistItemIds.value.filter((id) => id !== listingId);
      const newMap = { ...itemToListMap.value };
      delete newMap[listingId];
      itemToListMap.value = newMap;
      wishlistCount.value = Math.max(0, wishlistCount.value - 1);
    }
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
    user, token, loading, isLoggedIn, wishlistCount, bookingCount,
    wishlistItemIds, isInWishlist,
    login, register, logout, checkAuth, init, updateProfile,
    fetchWishlistData, fetchBookingCount,
    getWishlistLists, getWishlistList, createWishlistList, deleteWishlistList,
    addToWishlistList, removeFromWishlistList,
    toggleWishlist, removeWishlistItem,
    createBooking, getBookings, cancelBooking, createReview,
  };
});
