<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import { getSiteContent } from "../api.js";
import { handleImageError } from "../constants/placeholder.js";
import { toSlug } from "../utils/helpers.js";

const router = useRouter();

const navData = ref({});

onMounted(async () => {
  try {
    navData.value = await getSiteContent("megaMenu");
  } catch (e) {
    console.error("Failed to load nav data", e);
  }
});

const categories = computed(() => navData.value?.things?.categories || {});
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="[{ label: 'Things To Do' }]" />
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-2">
        Things To Do
      </h1>
      <p class="text-[16px] text-gray-500 mb-10">Tours, activities, and experiences worldwide</p>

      <div v-for="(items, category) in categories" :key="category" class="mb-12">
        <h2 class="text-[20px] font-bold text-[#0b2343] mb-4">{{ category }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            v-for="item in items"
            :key="item.title"
            @click="router.push(`/destination/${toSlug(item.title)}`)"
            class="text-left bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition group"
          >
            <img
              :src="item.image"
              :alt="item.title"
              @error="handleImageError"
              class="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div class="p-3">
              <p class="font-semibold text-[#0b2343] text-[15px]">{{ item.title }}</p>
              <p class="text-[13px] text-gray-500 mt-0.5">{{ item.subtitle }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>
