<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import { navData } from "../data/megaMenuData.js";
import { handleImageError } from "../constants/placeholder.js";
import { toSlug } from "../utils/helpers.js";

const route = useRoute();
const router = useRouter();

const title = computed(() => {
  const slug = route.params.slug || "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
});

const items = computed(() => {
  const slug = (route.params.slug || "").toLowerCase();
  for (const section of Object.values(navData)) {
    for (const [catName, catItems] of Object.entries(section.categories)) {
      if (toSlug(catName) === slug) {
        return catItems;
      }
    }
  }
  return [];
});

const breadcrumbs = computed(() => [{ label: title.value }]);
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="breadcrumbs" />

      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ title }}
      </h1>

      <div v-if="items.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

      <div v-else class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343]">Category not found</h2>
        <p class="mt-2 text-gray-500">This category doesn't have any listings yet.</p>
      </div>
    </div>
  </Container>
</template>
