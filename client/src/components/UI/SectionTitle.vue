<script setup>
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
});
</script>

<template>
  <div :class="['mb-10', align === 'center' ? 'text-center' : 'text-left']">
    <h2
      :class="[
        'text-[52px] font-black tracking-[-2px] leading-tight',
        color === 'primary' ? 'text-[#0b2343]' : 'text-white',
      ]"
    >
      {{ title }}
    </h2>

    <p v-if="subtitle" class="mt-3 text-[18px] font-medium text-gray-500">
      {{ subtitle }}
    </p>
  </div>
</template>
