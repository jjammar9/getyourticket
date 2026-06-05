<script setup>
import NavbarTop from "../Navbar/NavbarTop.vue";
import NavbarLinks from "../Navbar/NavbarLinks.vue";
import MegaMenu from "../Navbar/MegaMenu.vue";
import MobileNavbar from "../Navbar/MobileNavbar.vue";
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
const scrollY = ref(0);
const isScrolled = computed(() => scrollY.value > 30);

const isHoveringMegaMenu = ref(false);

const isHomePage = computed(() => {
  return route.path === "/";
});

const showNavLinks = computed(() => {
  return route.path === "/" || route.path === "/about" || route.path === "/blog" || route.path === "/press";
});

const handleClickOutside = (event) => {
  if (!navbarRef.value) return;

  if (!navbarRef.value.contains(event.target)) {
    activeDropdown.value = null;
    activeCategory.value = null;
  }
};

const handleScroll = () => {
  scrollY.value = window.scrollY;

  if (scrollY.value > 30) {
    activeDropdown.value = null;
    activeCategory.value = null;
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

  return Object.keys(navData[activeDropdown.value]?.categories || {});
});

const currentItems = computed(() => {
  if (!activeDropdown.value || !activeCategory.value) return [];

  return navData[activeDropdown.value]?.categories[activeCategory.value] || [];
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
    activeCategory.value = Object.keys(navData[id]?.categories || {})[0] || null;
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
    class="w-full bg-white dark:bg-gray-900 z-50 fixed top-0 left-0 transition-all duration-500 ease-out"
    :class="[isScrolled ? 'shadow-md' : '']"
  >
    <!-- MOBILE -->
    <MobileNavbar
      :mobileMenuOpen="mobileMenuOpen"
      :navData="navData"
      :toggleMobileMenu="toggleMobileMenu"
    />

    <!-- DESKTOP -->
    <div class="hidden lg:block bg-white dark:bg-gray-900" @mouseleave="closeMegaMenu">
      <Container>
        <NavbarTop :isScrolled="isScrolled" :scrollY="scrollY" :isHomePage="isHomePage" />

        <div
          v-if="showNavLinks"
          class="overflow-hidden transition-all duration-300 ease-out pt-3"
          :class="
            isScrolled
              ? 'opacity-0 max-h-0 -translate-y-2 pointer-events-none'
              : 'opacity-100 max-h-[60px] translate-y-0'
          "
        >
          <NavbarLinks
            :navData="navData"
            :toggleDropdown="toggleDropdown"
            :handleHoverStart="handleHoverStart"
            :handleHoverEnd="handleHoverEnd"
          />
        </div>
      </Container>

      <MegaMenu
        v-if="!isScrolled && activeDropdown"
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
