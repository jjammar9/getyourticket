<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: "default",
  },

  title: String,
  subtitle: String,
  image: String,
  price: Number,
  badge: String,
});

const handleClick = () => {
  if (props.type === "destination") {
    const slug = props.title.toLowerCase().replace(/\s+/g, "-");

    router.push(`/destination/${slug}`);
  }
};
</script>

<template>
  <div class="group cursor-pointer" @click="handleClick">
    <div class="overflow-hidden rounded-2xl relative">
      <img
        :src="image"
        :alt="title"
        class="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
      />

      <div
        v-if="badge"
        class="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold"
      >
        {{ badge }}
      </div>
    </div>

    <div class="mt-3">
      <h3 class="text-[18px] font-bold text-[#0f2147]">
        {{ title }}
      </h3>

      <p v-if="subtitle" class="text-sm text-gray-500 mt-1">
        {{ subtitle }}
      </p>

      <p v-if="price" class="text-sm font-semibold text-gray-900 mt-2">
        From €{{ price }}
      </p>
    </div>
  </div>
</template>
