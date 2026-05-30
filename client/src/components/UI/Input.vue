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
    class="w-full px-5 py-3 rounded-xl sm:rounded-full outline-none text-gray-800 font-semibold placeholder:font-medium"
  />
</template>
