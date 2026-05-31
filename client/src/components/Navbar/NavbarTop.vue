<script setup>
import { Heart, ShoppingCart, User, Globe } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const { isScrolled } = defineProps({
  isScrolled: Boolean,
});

const showSearch = computed(() => {
  return route.path !== "/" || isScrolled;
});
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between transition-all duration-500 ease-out',
      isScrolled ? 'py-2' : 'pt-2.5 pb-2',
    ]"
  >
    <!-- LEFT -->
    <div class="flex items-center flex-1 gap-8">
      <!-- LOGO -->
      <div class="leading-[0.78] select-none cursor-pointer shrink-0">
        <p
          class="text-[20px] font-black uppercase tracking-[-4px] text-[#ff5b00]"
        >
          <span class="relative inline-block">
            G
            <span
              class="absolute left-0 top-1/2 w-full h-[2px] bg-white -translate-y-1/2"
            ></span>
          </span>
          et
        </p>

        <p
          class="text-[20px] font-black uppercase tracking-[-2px] text-[#ff5b00]"
        >
          Your
        </p>

        <p
          class="text-[20px] font-black uppercase tracking-[-3px] text-[#ff5b00]"
        >
          <span class="relative inline-block">
            T
            <span
              class="absolute left-0 top-1/2 w-full h-[3px] bg-white -translate-y-1/2"
            ></span>
          </span>
          icke
          <span class="relative inline-block">
            t
            <span
              class="absolute left-0 top-1/2 w-full h-[3px] bg-white -translate-y-1/2"
            ></span>
          </span>
        </p>
      </div>

      <!-- SEARCH -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showSearch" class="flex-1 max-w-[650px]">
          <div
            class="flex items-center bg-white border border-gray-300 rounded-full shadow-sm p-1"
          >
            <input
              type="text"
              placeholder="Find places and things to do"
              class="flex-1 px-5 py-2 outline-none rounded-full text-sm text-gray-700"
            />

            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Search
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-8 pt-2 shrink-0">
      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <Heart :size="20" />
        <span>Wishlist</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <ShoppingCart :size="20" />
        <span>Cart</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <Globe :size="20" />
        <span>EN/EUR €</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <User :size="20" />
        <span>Profile</span>
      </button>
    </div>
  </div>
</template>
