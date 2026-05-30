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
      'font-bold rounded-full transition',
      variant === 'primary'
        ? 'bg-[#0071eb] hover:bg-[#005fd1] text-white'
        : 'bg-white text-[#0f2147]',
    ]"
  >
    <slot />
  </button>
</template>
