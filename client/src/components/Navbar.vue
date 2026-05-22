<script setup>
import { useAuthStore } from "../stores/authStore";
import {
  Heart,
  ShoppingCart,
  User,
  UserPlus,
  ChevronDown,
} from "lucide-vue-next";

const authStore = useAuthStore();
</script>

<template>
  <nav class="w-full bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
      <!-- Left -->
      <div class="flex items-center gap-4">
        <div
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold"
        >
          G
        </div>

        <div>
          <h1 class="text-xl font-bold text-gray-900">GetYourTicket</h1>

          <div class="flex items-center gap-8 mt-1 text-sm">
            <a
              href="#"
              class="flex items-center gap-1 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Places to see
              <ChevronDown :size="16" />
            </a>

            <a
              href="#"
              class="flex items-center gap-1 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Things to do
              <ChevronDown :size="16" />
            </a>

            <a
              href="#"
              class="flex items-center gap-1 font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Trip inspiration
              <ChevronDown :size="16" />
            </a>
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-5">
        <!-- Visitor -->
        <template v-if="!authStore.isAuthenticated">
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
            @click="authStore.loginAsUser"
            class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
          >
            <User :size="18" />
            Log in
          </button>

          <button
            class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
          >
            <UserPlus :size="18" />
            Sign up
          </button>
        </template>

        <!-- Logged-in User -->
        <template v-else-if="authStore.user?.role === 'user'">
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

          <button
            @click="authStore.logout"
            class="font-semibold text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>
