<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'font-bold rounded-full transition',
      size === 'sm' ? 'px-4 py-2 text-[12px]' : size === 'lg' ? 'px-10 py-4 text-[17px]' : 'px-8 py-3.5 text-[14px]',
      variant === 'primary'
        ? 'bg-[#0071eb] hover:bg-[#005fd1] text-white disabled:opacity-50 disabled:cursor-not-allowed'
        : 'bg-white text-[#0f2147] border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>
