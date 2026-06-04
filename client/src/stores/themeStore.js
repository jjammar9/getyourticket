import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(localStorage.getItem("theme") === "dark");

  watch(isDark, (val) => {
    localStorage.setItem("theme", val ? "dark" : "light");
    applyTheme(val);
  });

  function applyTheme(val) {
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggle() {
    isDark.value = !isDark.value;
  }

  applyTheme(isDark.value);

  return { isDark, toggle };
});
