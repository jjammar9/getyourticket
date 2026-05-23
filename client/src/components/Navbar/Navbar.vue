<script setup>
import NavbarTop from "./NavbarTop.vue";
import NavbarLinks from "./NavbarLinks.vue";
import MegaMenu from "./MegaMenu.vue";
import MobileNavbar from "./MobileNavbar.vue";

import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { navData, imagePool } from "../../data/megaMenuData";

const navbarRef = ref(null);
const activeDropdown = ref(null);
const activeCategory = ref(null);
const mobileMenuOpen = ref(false);

const handleClickOutside = (event) => {
  if (!navbarRef.value) return;

  if (!navbarRef.value.contains(event.target)) {
    activeDropdown.value = null;
    activeCategory.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const currentCategories = computed(() => {
  if (!activeDropdown.value) return [];
  return Object.keys(navData[activeDropdown.value].categories);
});

const currentItems = computed(() => {
  if (!activeDropdown.value || !activeCategory.value) return [];

  const raw = navData[activeDropdown.value].categories[activeCategory.value];
  const grouped = [];

  for (let i = 0; i < raw.length; i += 2) {
    grouped.push({
      title: raw[i],
      subtitle: raw[i + 1],
    });
  }

  return grouped;
});

const toggleDropdown = (id) => {
  if (activeDropdown.value === id) {
    activeDropdown.value = null;
    activeCategory.value = null;
    return;
  }

  activeDropdown.value = id;
  activeCategory.value = Object.keys(navData[id].categories)[0];
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const getImage = (index) => imagePool[index % imagePool.length];
</script>
<template>
  <nav
    ref="navbarRef"
    class="w-full bg-white border-b border-gray-200 relative z-50"
  >
    <!-- MOBILE -->
    <MobileNavbar
      :mobileMenuOpen="mobileMenuOpen"
      :navData="navData"
      :toggleMobileMenu="toggleMobileMenu"
    />

    <!-- DESKTOP -->
    <div class="hidden lg:block bg-white">
      <div class="max-w-7xl mx-auto px-8">
        <NavbarTop />

        <!-- NAV LINKS -->
        <NavbarLinks :navData="navData" :toggleDropdown="toggleDropdown" />
      </div>

      <!-- MEGA MENU -->
      <MegaMenu
        :activeDropdown="activeDropdown"
        :currentCategories="currentCategories"
        :activeCategory="activeCategory"
        :setActiveCategory="(category) => (activeCategory = category)"
        :currentItems="currentItems"
        :getImage="getImage"
      />
    </div>
  </nav>
</template>
