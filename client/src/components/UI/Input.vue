<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="w-full px-4 py-3.5 outline-none text-[16px] text-gray-800 font-medium placeholder:text-gray-400"
  />
</template>
