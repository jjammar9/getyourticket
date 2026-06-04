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
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const props = defineProps({
  isScrolled: Boolean,
  scrollY: Number,
  isHomePage: Boolean,
});

const router = useRouter();

const searchTerm = ref("");

const showSearch = computed(() => {
  return !props.isHomePage || props.scrollY > 100;
});

const isDarkMode = ref(false);
const showProfileMenu = ref(false);
let closeTimer = null;

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
  isDarkMode.value = !isDarkMode.value;
};

const handleSearch = () => {
  const query = searchTerm.value.trim();

  if (!query) {
    router.push("/");
    return;
  }

  router.push({
    path: "/search",
    query: {
      q: query,
    },
  });
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
        class="w-[58px] select-none cursor-pointer shrink-0 font-black uppercase leading-[0.78] text-[#ff5b00]"
      >
        <p class="text-[18px] tracking-[-1.4px]">Get</p>
        <p class="text-[18px] tracking-[-1.4px]">Your</p>
        <p class="text-[18px] tracking-[-1.4px]">Ticket</p>
      </div>

      <!-- SEARCH -->
      <div
        class="flex-1 overflow-hidden transition-all duration-300 ease-out"
        :class="showSearch ? 'opacity-100' : 'opacity-0'"
      >
        <div
          class="w-[420px] flex items-center bg-white rounded-full p-1"
          :class="isHomePage ? 'border border-gray-300' : 'border border-black'"
        >
          <input
            v-model="searchTerm"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Find places and things to do"
            class="flex-1 px-5 py-2 outline-none rounded-full text-[14px] text-gray-700 placeholder:text-black"
          />

          <button
            @click="handleSearch"
            class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[14px] font-semibold px-7 py-2 rounded-full transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex items-start gap-8 shrink-0">
      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <Heart :size="22" :stroke-width="2.5" />
        <span>Wishlist</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <ShoppingCart :size="22" :stroke-width="2.5" />
        <span>Cart</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <Globe :size="22" :stroke-width="2.5" />
        <span>EN/EUR €</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <div
        @mouseenter="onProfileEnter"
        @mouseleave="onProfileLeave"
      >
        <button
          class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
        >
          <User :size="22" :stroke-width="2.5" />
          <span>Profile</span>
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
            <div class="w-[260px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            <!-- Profile header -->
            <div class="px-4 pt-4 pb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User :size="20" class="text-gray-500" />
                </div>
                <div class="flex-1">
                  <p class="text-[14px] font-semibold text-gray-900">Profile</p>
                  <button class="flex items-center gap-1 text-[12px] text-blue-600 hover:text-blue-700 mt-0.5">
                    <LogIn :size="13" />
                    <span>Log in or sign in</span>
                    <ArrowRight :size="13" />
                  </button>
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-100" />

            <!-- Updates -->
            <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
              <div class="flex items-center gap-3">
                <Bell :size="18" class="text-gray-500" />
                <span class="text-[13px] text-gray-700 font-medium">Updates</span>
              </div>
              <ArrowRight :size="15" class="text-gray-400" />
            </div>

            <!-- Appearance -->
            <div class="px-4 py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Sun :size="18" class="text-gray-500" />
                <span class="text-[13px] text-gray-700 font-medium">Appearance</span>
              </div>
              <div
                @click="toggleTheme"
                class="relative w-11 h-[22px] rounded-full cursor-pointer transition-colors"
                :class="isDarkMode ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <div
                  class="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all duration-200 flex items-center justify-center"
                  :class="isDarkMode ? 'right-0.5' : 'left-0.5'"
                >
                  <component :is="isDarkMode ? Moon : Sun" :size="10" class="text-gray-600" />
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-100" />

            <!-- Support -->
            <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
              <div class="flex items-center gap-3">
                <Headphones :size="18" class="text-gray-500" />
                <span class="text-[13px] text-gray-700 font-medium">Support</span>
              </div>
              <ArrowRight :size="15" class="text-gray-400" />
            </div>

            <!-- Download the app -->
            <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors border-t border-gray-100">
              <div class="flex items-center gap-3">
                <Smartphone :size="18" class="text-gray-500" />
                <div>
                  <span class="text-[13px] text-gray-700 font-medium">Download the app</span>
                  <p class="text-[11px] text-gray-400">Get the best experience</p>
                </div>
              </div>
              <ArrowRight :size="15" class="text-gray-400" />
            </div>
          </div>
        </div>
        </Transition>
</template>
