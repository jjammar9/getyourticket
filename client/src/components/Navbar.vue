<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import { navData, imagePool } from "../data/megaMenuData";
import {
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-vue-next";

const authStore = useAuthStore();

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

const getImage = (index) => imagePool[index % imagePool.length];
</script>
<template>
  <nav
    ref="navbarRef"
    class="w-full bg-white border-b border-gray-200 relative z-50"
  >
    <!-- MOBILE -->
    <div class="lg:hidden flex items-center justify-between px-5 py-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold"
        >
          G
        </div>

        <h1 class="text-xl font-bold text-gray-900">GetYourTicket</h1>
      </div>

      <button @click="mobileMenuOpen = !mobileMenuOpen">
        <Menu v-if="!mobileMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="lg:hidden px-5 pb-6 border-t bg-white">
      <div class="flex flex-col gap-5 pt-5">
        <a
          v-for="(item, key) in navData"
          :key="key"
          href="#"
          class="font-semibold text-gray-700"
        >
          {{ item.label }}
        </a>
      </div>
    </div>

    <!-- DESKTOP -->
    <div class="hidden lg:block bg-white">
      <div class="max-w-7xl mx-auto px-8">
        <div class="flex items-center justify-between pt-5">
          <div class="flex items-center gap-4">
            <div
              class="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            >
              G
            </div>

            <h1 class="text-2xl font-bold text-gray-900">GetYourTicket</h1>
          </div>

          <div class="flex items-center gap-5">
            <button
              class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              <Heart :size="18" />
              Wishlist
            </button>

            <button
              class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              <ShoppingCart :size="18" />
              Cart
            </button>

            <button
              class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              <User :size="18" />
              Profile
            </button>
          </div>
        </div>

        <!-- NAV LINKS -->
        <div class="flex items-center gap-10 pt-5 pb-3 pl-16">
          <button
            v-for="(item, key) in navData"
            :key="key"
            @click="toggleDropdown(key)"
            class="group relative flex items-center gap-1 font-semibold text-gray-700 hover:text-orange-500 transition pb-2"
          >
            {{ item.label }}
            <ChevronDown :size="16" />

            <span
              class="absolute left-1/2 bottom-0 h-[2px] w-0 bg-orange-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
            ></span>
          </button>
        </div>
      </div>

      <!-- MEGA MENU -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="activeDropdown"
          class="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100"
        >
          <div class="max-w-7xl mx-auto px-8 py-6">
            <div class="grid grid-cols-[220px_auto] gap-6 items-start">
              <!-- LEFT -->
              <div class="border-r border-gray-200 pr-8 space-y-3">
                <button
                  v-for="category in currentCategories"
                  :key="category"
                  @click="activeCategory = category"
                  class="flex items-center gap-2 w-full text-left text-xl font-bold transition"
                  :class="
                    activeCategory === category
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-800'
                  "
                >
                  <span
                    v-if="activeCategory === category"
                    class="w-2 h-2 bg-orange-500 rounded-full"
                  ></span>

                  <span v-else class="w-2 h-2"></span>

                  {{ category }}
                </button>
              </div>

              <!-- RIGHT -->
              <!-- RIGHT -->
              <div class="grid grid-cols-4 gap-x-6 gap-y-2">
                <button
                  v-for="(item, index) in currentItems"
                  :key="item.title"
                  class=""
                >
                  <div
                    class="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sky-100 transition text-left"
                  >
                    <img
                      :src="getImage(index)"
                      :alt="item.title"
                      class="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <p class="font-medium text-gray-900 text-[15px]">
                        {{ item.title }}
                      </p>

                      <p class="text-[13px] text-gray-500">
                        {{ item.subtitle }}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- FADE -->
          <div
            class="w-full h-16 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"
          ></div>
        </div>
      </transition>
    </div>
  </nav>
</template>
