<script setup>
import NavbarTop from "../navbar/NavbarTop.vue";
import NavbarLinks from "../navbar/NavbarLinks.vue";
import MegaMenu from "../navbar/MegaMenu.vue";
import MobileNavbar from "../navbar/MobileNavbar.vue";
import Container from "../ui/Container.vue";

import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { navData } from "../../data/megaMenuData.js";

const route = useRoute();

let hoverTimer = null;

const navbarRef = ref(null);
const activeDropdown = ref(null);
const activeCategory = ref(null);
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const isHoveringMegaMenu = ref(false);

const isHomePage = computed(() => {
  return route.path === "/";
});

const handleClickOutside = (event) => {
  if (!navbarRef.value) return;

  if (!navbarRef.value.contains(event.target)) {
    activeDropdown.value = null;
    activeCategory.value = null;
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY;

  const newScrolledState = scrollY > 80;

  if (newScrolledState !== isScrolled.value) {
    isScrolled.value = newScrolledState;

    if (newScrolledState) {
      activeDropdown.value = null;
      activeCategory.value = null;
    }
  }
};

const closeMegaMenu = () => {
  clearTimeout(hoverTimer);

  activeDropdown.value = null;
  activeCategory.value = null;
};

const handleMegaMenuEnter = () => {
  isHoveringMegaMenu.value = true;
};

const handleMegaMenuLeave = () => {
  isHoveringMegaMenu.value = false;
  closeMegaMenu();
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
  }, 120);
};

const handleHoverEnd = () => {
  clearTimeout(hoverTimer);

  hoverTimer = setTimeout(() => {
    if (!isHoveringMegaMenu.value) {
      activeDropdown.value = null;
      activeCategory.value = null;
    }
  }, 80);
};
</script>

<template>
  <nav
    ref="navbarRef"
    :class="[
      'w-full bg-white z-50 transition-all duration-500 ease-out',
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
    <div class="hidden lg:block bg-white" @mouseleave="closeMegaMenu">
      <Container>
        <NavbarTop :isScrolled="isScrolled" />

        <NavbarLinks
          v-if="isHomePage && !isScrolled"
          :navData="navData"
          :toggleDropdown="toggleDropdown"
          :handleHoverStart="handleHoverStart"
          :handleHoverEnd="handleHoverEnd"
        />
      </Container>

      <MegaMenu
        v-if="isHomePage && !isScrolled"
        :activeDropdown="activeDropdown"
        :currentCategories="currentCategories"
        :activeCategory="activeCategory"
        :setActiveCategory="(category) => (activeCategory = category)"
        :currentItems="currentItems"
        @mouseenter-menu="handleMegaMenuEnter"
        @mouseleave-menu="handleMegaMenuLeave"
      />
    </div>
  </nav>
</template>
