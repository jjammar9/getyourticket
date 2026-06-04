<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    v-bind="$attrs"
    class="w-full px-4 py-3.5 outline-none text-[16px] text-gray-800 dark:text-gray-200 dark:bg-transparent font-medium placeholder:text-gray-400"
  />
</template>
