<script setup>
defineProps({
  meetingPoint: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-if="meetingPoint" class="mt-14">
    <h2 class="text-[24px] font-bold tracking-[-0.3px] text-[#0b2343]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      Meeting point
    </h2>

    <p class="mt-5 text-[16px] leading-8 text-gray-600">
      {{ meetingPoint }}
    </p>
  </div>
</template>
