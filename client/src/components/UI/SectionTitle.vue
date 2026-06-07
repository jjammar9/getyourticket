<script setup>
import { useRouter } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

defineProps({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    default: "",
  },

  align: {
    type: String,
    default: "left",
  },

  color: {
    type: String,
    default: "primary",
  },

  viewAllTo: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="['mb-10 flex items-end justify-between', align === 'center' ? 'text-center' : 'text-left']">
    <div>
      <h2
        :class="[
          'text-[32px] font-bold tracking-[-0.5px] leading-tight',
          color === 'primary' ? 'text-[#0b2343] dark:text-white' : 'text-white',
        ]"

      >
        {{ title }}
      </h2>

      <p v-if="subtitle" class="mt-3 text-[18px] font-medium text-gray-500">
        {{ subtitle }}
      </p>
    </div>

    <a
      v-if="viewAllTo"
      @click.prevent="router.push(viewAllTo)"
      class="text-[15px] font-bold text-[#0071eb] dark:text-blue-400 hover:text-[#0050a0] cursor-pointer whitespace-nowrap ml-6 transition-colors"
    >
      {{ localeStore.t("section.viewAll") }} &rarr;
    </a>
  </div>
</template>
