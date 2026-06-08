<script setup>
import {
  Heart,
  ShoppingCart,
  User,
  Globe,
  LogIn,
  ArrowRight,
  Sun,
  Moon,
  Headphones,
  Smartphone,
  Bell,
  Calendar,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useSearchSuggestions } from "../../composables/useSearchSuggestions.js";
import { getCountries } from "../../api.js";
import { useNavSearch } from "../../composables/useNavSearch.js";
import { useThemeStore } from "../../stores/themeStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { useAuthStore } from "../../stores/authStore.js";
import { locales } from "../../i18n/translations.js";
import logoImage from "../../assets/0e31b4a5-ec0a-496e-81a1-cc44c5729c06.png";
import AuthModal from "../auth/AuthModal.vue";

const props = defineProps({
  isScrolled: Boolean,
  scrollY: Number,
  isHomePage: Boolean,
});

const router = useRouter();
const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();
const authStore = useAuthStore();

const showAuthModal = ref(false);
const openAuthHandler = () => { showAuthModal.value = true; };

const { searchQuery, setSearchQuery } = useNavSearch();
const searchTerm = ref("");
const showSuggestions = ref(false);
const searchInput = ref(null);
const { suggestions } = useSearchSuggestions(searchTerm);
const countries = ref({});

watch(searchQuery, (val) => {
  if (val) {
    searchTerm.value = val;
    setSearchQuery("");
  }
});

const showSearch = computed(() => {
  return !props.isHomePage || props.scrollY > 100;
});

const themeStore = useThemeStore();
const showProfileMenu = ref(false);
let closeTimer = null;

const showLocaleMenu = ref(false);
const langDrop = ref(false);
const currDrop = ref(false);

const currencyOptions = [
  { code: "EUR", label: "Euro (\u20AC)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "GBP", label: "British Pound (\u00A3)" },
  { code: "CHF", label: "Swiss Franc (CHF)" },
  { code: "JPY", label: "Japanese Yen (\u00A5)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
  { code: "CAD", label: "Canadian Dollar (CA$)" },
];

const typeLabels = {
  location: () => localeStore.t("search.type.location"),
  activity: () => localeStore.t("search.type.activity"),
  category: () => localeStore.t("search.type.category"),
  country: () => localeStore.t("search.type.country"),
};

function onDocumentClick(e) {
  showLocaleMenu.value = false;
  langDrop.value = false;
  currDrop.value = false;
}

onMounted(() => {
  authStore.checkAuth();
  document.addEventListener("click", onDocumentClick);
  window.addEventListener("open-auth-modal", openAuthHandler);
  getCountries().then(list => {
    const map = {};
    for (const c of list) map[c.slug] = c;
    countries.value = map;
  }).catch(e => console.error("Failed to load countries", e));
});
onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
  window.removeEventListener("open-auth-modal", openAuthHandler);
});

const onProfileEnter = () => {
  clearTimeout(closeTimer);
  showProfileMenu.value = true;
};

const onProfileLeave = () => {
  closeTimer = setTimeout(() => {
    showProfileMenu.value = false;
  }, 500);
};

const onMenuLeave = () => {
  showProfileMenu.value = false;
};

const toggleTheme = () => {
  themeStore.toggle();
};

const selectSuggestion = (s) => {
  searchTerm.value = s.text;
  showSuggestions.value = false;
  if (s.type === "country" && s.slug) {
    router.push(`/country/${s.slug}`);
  } else {
    router.push({ path: "/search", query: { q: s.text } });
  }
};

const onSearchBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const handleSearch = () => {
  const query = searchTerm.value.trim();
  showSuggestions.value = false;

  if (!query) {
    router.push("/");
    return;
  }

  const slug = Object.entries(countries.value).find(
    ([, c]) => c.name.toLowerCase() === query.toLowerCase()
  )?.[0];

  if (slug) {
    router.push(`/country/${slug}`);
  } else {
    router.push({ path: "/search", query: { q: query } });
  }
};
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between transition-all duration-500 ease-out relative',
      isScrolled ? 'pt-3 pb-2' : 'pt-4 pb-3',
    ]"
  >
    <!-- LEFT -->
    <div class="flex items-center flex-1 gap-8">
      <!-- LOGO -->
      <div
        @click="router.push('/')"
        class="select-none cursor-pointer shrink-0 flex items-center gap-2"
      >
        <img :src="logoImage" alt="GetYourTicket" loading="lazy" class="h-[52px] w-auto -ml-2" />
      </div>

      <!-- SEARCH -->
      <div
        class="flex-1 overflow-visible transition-all duration-300 ease-out relative"
        :class="showSearch ? 'opacity-100' : 'opacity-0'"
      >
        <div
          class="w-[420px] flex items-center bg-white dark:bg-gray-800 rounded-full p-1"
          :class="isHomePage ? 'border border-gray-300 dark:border-gray-600' : 'border border-black dark:border-gray-500'"
        >
          <input
            ref="searchInput"
            v-model="searchTerm"
            @keyup.enter="handleSearch"
            @focus="showSuggestions = true"
            @blur="onSearchBlur"
            @input="showSuggestions = true"
            type="text"
            :placeholder="localeStore.t('nav.search.placeholder')"
            class="flex-1 px-5 py-2 outline-none rounded-full text-[14px] text-gray-700 dark:text-gray-200 placeholder:text-black dark:placeholder:text-gray-400"
          />

          <button
            @click="handleSearch"
            class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[14px] font-semibold px-7 py-2 rounded-full transition"
          >
            {{ localeStore.t("nav.search") }}
          </button>
        </div>

        <!-- Autocomplete dropdown -->
        <div
          v-if="showSuggestions && suggestions.length > 0"
          class="absolute top-full left-0 mt-2 w-[420px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        >
          <div
            v-for="s in suggestions"
            :key="s.text"
            @mousedown.prevent="selectSuggestion(s)"
            class="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div>
              <span class="text-[13px] text-gray-700 dark:text-gray-200">{{ s.text }}</span>
              <span class="text-[11px] text-gray-400 ml-2">&mdash; {{ (typeLabels[s.type] || (() => s.type))() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex items-start gap-8 shrink-0">
      <router-link
        to="/wishlist"
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] dark:text-gray-300 hover:text-[#ff5533] transition-colors"
      >
        <Heart :size="22" :stroke-width="2.5" />
        <span>{{ localeStore.t("nav.wishlist") }}</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </router-link>

      <router-link
        v-if="authStore.isLoggedIn"
        to="/bookings"
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] dark:text-gray-300 hover:text-[#ff5533] transition-colors"
      >
        <Calendar :size="22" :stroke-width="2.5" />
        <span>{{ localeStore.t("nav.bookings") }}</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </router-link>

      <router-link
        to="/cart"
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] dark:text-gray-300 hover:text-[#ff5533] transition-colors"
      >
        <ShoppingCart :size="22" :stroke-width="2.5" />
        <span>{{ localeStore.t("nav.cart") }}</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </router-link>

      <!-- Globe / Language-Currency -->
      <div class="relative">
        <button
          @click.stop="showLocaleMenu = !showLocaleMenu"
          class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] dark:text-gray-300 hover:text-[#ff5533] transition-colors"
        >
          <Globe :size="22" :stroke-width="2.5" />
          <span>{{ localeStore.selectedLocale.toUpperCase() }}/{{ currencyStore.symbol }}</span>
          <span
            class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
          />
        </button>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="showLocaleMenu"
            class="absolute right-0 top-full mt-2 w-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 p-5 z-[200]"
          >
            <p class="text-[13px] font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ localeStore.t("footer.language") }}</p>
            <div class="relative mb-5">
              <button
                @click.stop="langDrop = !langDrop; currDrop = false"
                class="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-[14px] font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              >
                <span>{{ localeStore.localeLabel }}</span>
                <svg :class="langDrop ? 'rotate-180' : 'rotate-0'" class="transition-transform duration-200 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div
                v-if="langDrop"
                class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded-lg z-50 shadow-lg border border-gray-100 dark:border-gray-600 max-h-[220px] overflow-y-auto"
              >
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  @click="localeStore.setLocale(loc.code); langDrop = false"
                  class="block w-full text-left px-4 py-2.5 text-[14px] font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  :class="localeStore.selectedLocale === loc.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'"
                >
                  {{ loc.label }}
                </button>
              </div>
            </div>

            <p class="text-[13px] font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ localeStore.t("footer.currency") }}</p>
            <div class="relative">
              <button
                @click.stop="currDrop = !currDrop; langDrop = false"
                class="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-[14px] font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              >
                <span>{{ currencyStore.label }}</span>
                <svg :class="currDrop ? 'rotate-180' : 'rotate-0'" class="transition-transform duration-200 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div
                v-if="currDrop"
                class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded-lg z-50 shadow-lg border border-gray-100 dark:border-gray-600 max-h-[220px] overflow-y-auto"
              >
                <button
                  v-for="opt in currencyOptions"
                  :key="opt.code"
                  @click="currencyStore.setCurrency(opt.code); currDrop = false"
                  class="block w-full text-left px-4 py-2.5 text-[14px] font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  :class="currencyStore.selectedCurrency === opt.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div
        @mouseenter="onProfileEnter"
        @mouseleave="onProfileLeave"
      >
        <button
          class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] dark:text-gray-300 hover:text-[#ff5533] transition-colors"
        >
          <User :size="22" :stroke-width="2.5" />
          <span class="font-bold capitalize">{{ authStore.isLoggedIn ? (authStore.user?.name || localeStore.t("nav.profile")) : localeStore.t("nav.profile") }}</span>
          <span
            class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
          />
        </button>
      </div>
    </div>
  </div>

  <!-- Profile Dropdown (at NavbarTop level, sibling of the main flex div) -->
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="showProfileMenu"
      class="absolute right-0"
      style="top: 100%; transform: translateY(-18px); z-index: 200;"
      @mouseenter="onProfileEnter"
      @mouseleave="onMenuLeave"
    >
            <div class="w-[260px] bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 overflow-hidden">
            <!-- Profile header -->
            <div class="px-4 pt-4 pb-3">
              <div v-if="authStore.isLoggedIn" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#ff5533] flex items-center justify-center text-white text-[16px] font-bold">
                  {{ (authStore.user?.name || "?").charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[14px] font-semibold text-gray-900 dark:text-white truncate">{{ authStore.user?.name }}</p>
                  <p class="text-[12px] text-gray-500 dark:text-gray-400 truncate">{{ authStore.user?.email }}</p>
                </div>
              </div>
              <div v-else class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <User :size="20" class="text-gray-500 dark:text-gray-300" />
                </div>
                <div class="flex-1">
                  <p class="text-[14px] font-semibold text-gray-900 dark:text-white">{{ localeStore.t("nav.profile") }}</p>
                  <button
                    @click="showAuthModal = true; showProfileMenu = false"
                    class="flex items-center gap-1 text-[12px] text-blue-600 dark:text-blue-400 hover:text-blue-700 mt-0.5"
                  >
                    <LogIn :size="13" />
                    <span>{{ localeStore.t("nav.login") }}</span>
                    <ArrowRight :size="13" />
                  </button>
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-100 dark:bg-gray-700" />

            <!-- Profile -->
            <div
              v-if="authStore.isLoggedIn"
              @click="router.push('/profile'); showProfileMenu = false"
              class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div class="flex items-center gap-3">
                <User :size="18" class="text-gray-500 dark:text-gray-300" />
                <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("nav.profile") }}</span>
              </div>
              <ArrowRight :size="15" class="text-gray-400 dark:text-gray-500" />
            </div>

            <!-- Updates -->
            <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <div class="flex items-center gap-3">
                <Bell :size="18" class="text-gray-500 dark:text-gray-300" />
                <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("nav.updates") }}</span>
              </div>
              <ArrowRight :size="15" class="text-gray-400 dark:text-gray-500" />
            </div>

            <!-- Appearance -->
            <div class="px-4 py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Sun :size="18" class="text-gray-500 dark:text-gray-300" />
                <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("nav.appearance") }}</span>
              </div>
              <div
                @click="toggleTheme"
                class="relative w-11 h-[22px] rounded-full cursor-pointer transition-colors"
                :class="themeStore.isDark ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <div
                  class="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all duration-200 flex items-center justify-center"
                  :class="themeStore.isDark ? 'right-0.5' : 'left-0.5'"
                >
                  <component :is="themeStore.isDark ? Moon : Sun" :size="10" class="text-gray-600" />
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-100 dark:bg-gray-700" />

            <!-- Support -->
            <div
              @click="router.push('/support'); showProfileMenu = false"
              class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div class="flex items-center gap-3">
                <Headphones :size="18" class="text-gray-500 dark:text-gray-300" />
                <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("nav.support") }}</span>
              </div>
              <ArrowRight :size="15" class="text-gray-400 dark:text-gray-500" />
            </div>

            <!-- Download the app -->
            <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-3">
                <Smartphone :size="18" class="text-gray-500 dark:text-gray-300" />
                <div>
                  <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("nav.download") }}</span>
                  <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ localeStore.t("nav.best") }}</p>
                </div>
              </div>
              <ArrowRight :size="15" class="text-gray-400 dark:text-gray-500" />
            </div>

            <!-- Logout (logged in only) -->
            <div
              v-if="authStore.isLoggedIn"
              @click="authStore.logout(); showProfileMenu = false"
              class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-t border-gray-100 dark:border-gray-700"
            >
              <div class="flex items-center gap-3">
                <LogIn :size="18" class="text-gray-500 dark:text-gray-300 rotate-180" />
                <span class="text-[13px] text-gray-700 dark:text-gray-200 font-medium">{{ localeStore.t("auth.logout") }}</span>
              </div>
            </div>
          </div>
        </div>
        </Transition>

  <AuthModal :show="showAuthModal" @close="showAuthModal = false" />
</template>
