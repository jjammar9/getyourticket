import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { loginUser, registerUser, getMe } from "../api.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);

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
      return data;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    clearAuth();
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
    } catch {
      clearAuth();
    }
  }

  function init() {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  return { user, token, loading, isLoggedIn, login, register, logout, checkAuth, init };
});
