<script setup>
import { Heart, ShoppingCart, User, Globe } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  isScrolled: Boolean,
  scrollY: Number,
});

const route = useRoute();

const showSearch = computed(() => {
  return route.path !== "/" || props.isScrolled;
});

const searchWidth = computed(() => {
  const value = Math.min(props.scrollY || 0, 150);
  return `${(value / 150) * 420}px`;
});
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between transition-all duration-500 ease-out',
      isScrolled ? 'py-2' : 'py-3',
    ]"
  >
    <!-- LEFT -->
    <div class="flex items-center flex-1 gap-8">
      <!-- LOGO -->
      <div
        class="w-[58px] select-none cursor-pointer shrink-0 font-black uppercase leading-[0.78] text-[#ff5b00]"
      >
        <p class="text-[18px] tracking-[-1.4px]">Get</p>
        <p class="text-[18px] tracking-[-1.4px]">Your</p>
        <p class="text-[18px] tracking-[-1.4px]">Ticket</p>
      </div>

      <!-- SEARCH -->
      <div
        class="flex-1 overflow-hidden transition-all duration-300 ease-out"
        :style="{
          maxWidth: showSearch ? searchWidth : '0px',
          opacity: showSearch ? 1 : 0,
        }"
      >
        <div
          class="w-[420px] flex items-center bg-white border border-gray-300 rounded-full p-1"
        >
          <input
            type="text"
            placeholder="Find places and things to do"
            class="flex-1 px-5 py-2 outline-none rounded-full text-[14px] text-gray-700"
          />

          <button
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
        <Heart :size="22" :stroke-width="2" />
        <span>Wishlist</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <ShoppingCart :size="22" :stroke-width="2" />
        <span>Cart</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <Globe :size="22" :stroke-width="2" />
        <span>EN/EUR €</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>

      <button
        class="group relative flex flex-col items-center gap-1 text-[13px] font-medium text-[#4f5a72] hover:text-[#ff5533] transition-colors"
      >
        <User :size="22" :stroke-width="2" />
        <span>Profile</span>
        <span
          class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
        />
      </button>
    </div>
  </div>
</template>
