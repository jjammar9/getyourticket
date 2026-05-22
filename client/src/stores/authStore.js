import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  const loginAsUser = () => {
    user.value = {
      name: "JJ",
      role: "user",
    };
  };

  const loginAsAdmin = () => {
    user.value = {
      name: "Admin",
      role: "admin",
    };
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    loginAsUser,
    loginAsAdmin,
    logout,
  };
});
