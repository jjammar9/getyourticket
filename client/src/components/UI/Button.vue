<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <button
    :class="[
      'px-5 py-3 rounded-xl font-semibold transition',
      variant === 'primary'
        ? 'bg-[#0f2147] text-white'
        : 'bg-white text-[#0f2147]',
    ]"
  >
    <slot />
  </button>
</template>
