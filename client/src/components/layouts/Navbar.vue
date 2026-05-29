<script setup>
import NavbarTop from "./NavbarTop.vue";
import NavbarLinks from "./NavbarLinks.vue";
import MegaMenu from "./MegaMenu.vue";
import MobileNavbar from "./MobileNavbar.vue";

import { ref, computed, onMounted, onUnmounted } from "vue";
import { navData } from "../../data/megaMenuData.js";

let hoverTimer = null;

const navbarRef = ref(null);
const activeDropdown = ref(null);
const activeCategory = ref(null);
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const handleClickOutside = (event) => {
  if (!navbarRef.value) return;

  if (!navbarRef.value.contains(event.target)) {
    activeDropdown.value = null;
    activeCategory.value = null;
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY;

  if (!isScrolled.value && scrollY > 140) {
    isScrolled.value = true;
  }

  if (isScrolled.value && scrollY < 80) {
    isScrolled.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll);
  clearTimeout(hoverTimer);
});

const currentCategories = computed(() => {
  if (!activeDropdown.value) return [];
  return Object.keys(navData[activeDropdown.value].categories);
});

const currentItems = computed(() => {
  if (!activeDropdown.value || !activeCategory.value) return [];

  return navData[activeDropdown.value].categories[activeCategory.value] || [];
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

const handleHoverStart = (id) => {
  clearTimeout(hoverTimer);

  hoverTimer = setTimeout(() => {
    activeDropdown.value = id;
    activeCategory.value = Object.keys(navData[id].categories)[0];
  }, 1000);
};

const handleHoverEnd = () => {
  clearTimeout(hoverTimer);
};
</script>

<template>
  <nav
    ref="navbarRef"
    :class="[
      'w-full bg-white z-50 transition-all duration-300',
      isScrolled
        ? 'fixed top-0 left-0 shadow-md'
        : 'relative border-b border-gray-200',
    ]"
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
        <NavbarTop :isScrolled="isScrolled" />

        <NavbarLinks
          :navData="navData"
          :toggleDropdown="toggleDropdown"
          :handleHoverStart="handleHoverStart"
          :handleHoverEnd="handleHoverEnd"
        />
      </div>

      <MegaMenu
        :activeDropdown="activeDropdown"
        :currentCategories="currentCategories"
        :activeCategory="activeCategory"
        :setActiveCategory="(category) => (activeCategory = category)"
        :currentItems="currentItems"
      />
    </div>
  </nav>
</template>
