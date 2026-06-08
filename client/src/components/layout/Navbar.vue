<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu } from "lucide-vue-next";
import { getCountries, getSiteContent } from "../../api.js";
import NavbarTop from "../../components/Navbar/NavbarTop.vue";
import NavbarLinks from "../../components/Navbar/NavbarLinks.vue";
import MobileNavbar from "../../components/Navbar/MobileNavbar.vue";
import MegaMenu from "../../components/Navbar/MegaMenu.vue";
import Container from "../ui/Container.vue";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const route = useRoute();
const localeStore = useLocaleStore();

const navData = ref({});
const countries = ref([]);

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

const isSupportPage = computed(() => {
  return route.path === "/support";
});

const isCountryPage = computed(() => {
  return route.path.startsWith("/country/");
});

const countriesMap = computed(() => {
  const map = {};
  for (const c of countries.value) map[c.slug] = c;
  return map;
});

const countryName = computed(() => {
  if (!isCountryPage.value) return "";
  const slug = route.params.slug;
  if (!slug) return "";
  const country = countriesMap.value[slug];
  return country?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
});

const showNavLinks = computed(() => {
  return route.path === "/" || route.path === "/about" || route.path === "/explorer" || isCountryPage.value;
});

const partnerBreadcrumb = computed(() => {
  const map = {
    "/supply-partner": localeStore.t("footer.linkSupplyPartner"),
    "/content-creator": localeStore.t("footer.linkContentCreator"),
    "/affiliate-partner": localeStore.t("footer.linkAffiliatePartner"),
  };
  return map[route.path] || null;
});

const showBreadcrumbs = computed(() => !!partnerBreadcrumb.value);

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

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleScroll);
  try {
    const data = await Promise.all([
      getSiteContent("megaMenu"),
      getCountries()
    ]);
    navData.value = data[0];
    countries.value = data[1];
  } catch (e) {
    console.error("Failed to load nav data", e);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll);
  clearTimeout(hoverTimer);
});

const currentCategories = computed(() => {
  if (!activeDropdown.value) return [];

  return Object.keys(navData.value[activeDropdown.value]?.categories || {});
});

const currentItems = computed(() => {
  if (!activeDropdown.value || !activeCategory.value) return [];

  return navData.value[activeDropdown.value]?.categories[activeCategory.value] || [];
});

const toggleDropdown = (id) => {
  if (activeDropdown.value === id) {
    activeDropdown.value = null;
    activeCategory.value = null;
    return;
  }

  activeDropdown.value = id;
  activeCategory.value = Object.keys(navData.value[id].categories)[0];
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleHoverStart = (id) => {
  clearTimeout(hoverTimer);

  hoverTimer = setTimeout(() => {
    activeDropdown.value = id;
    activeCategory.value = Object.keys(navData.value[id]?.categories || {})[0] || null;
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
    :class="[isScrolled ? 'shadow-md' : '', !isSupportPage ? 'border-b border-gray-200 dark:border-gray-700' : '']"
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
          v-if="showNavLinks || showBreadcrumbs"
          class="overflow-hidden transition-all duration-300 ease-out pt-3"
          :class="
            isScrolled
              ? 'opacity-0 max-h-0 -translate-y-2 pointer-events-none'
              : 'opacity-100 max-h-[60px] translate-y-0'
          "
        >
          <NavbarLinks
            v-if="showNavLinks"
            :navData="navData"
            :toggleDropdown="toggleDropdown"
            :handleHoverStart="handleHoverStart"
            :handleHoverEnd="handleHoverEnd"
            :countryName="isCountryPage ? countryName : ''"
          />
          <div v-if="showBreadcrumbs" class="flex items-center gap-2 text-[14px] pb-2">
            <button @click="router.push('/')" class="text-gray-400 hover:text-[#0b2343] transition-colors cursor-pointer">{{ localeStore.t("breadcrumb.home") }}</button>
            <span class="text-gray-300 text-[18px] font-bold leading-none">&#8250;</span>
            <span class="text-[#0b2343] font-semibold">{{ partnerBreadcrumb }}</span>
          </div>
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
