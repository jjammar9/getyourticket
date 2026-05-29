<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <div
    class="border border-[#dfe3eb] rounded-[28px] bg-white px-10 py-10 flex flex-col items-center text-center hover:shadow-md transition duration-300"
  >
    <!-- IMAGE COLLAGE -->
    <div class="relative w-[120px] h-[120px]">
      <!-- TOP LEFT -->
      <img
        :src="item.images[0]"
        class="absolute top-0 left-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm"
      />

      <!-- TOP RIGHT -->
      <img
        :src="item.images[1]"
        class="absolute top-0 right-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm"
      />

      <!-- BOTTOM LEFT -->
      <img
        :src="item.images[2]"
        class="absolute bottom-0 left-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm"
      />

      <!-- BOTTOM RIGHT -->
      <img
        :src="item.images[3]"
        class="absolute bottom-0 right-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm"
      />

      <!-- CENTER ICON -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="w-[48px] h-[48px] rounded-full bg-[#0b2343] text-white flex items-center justify-center text-[22px] font-bold shadow-xl border-4 border-white"
        >
          {{ item.icon }}
        </div>
      </div>
    </div>

    <!-- TITLE -->
    <h3
      class="mt-8 text-[30px] font-extrabold tracking-[-1px] text-[#0b2343] leading-tight"
    >
      {{ item.title }}
    </h3>

    <!-- DESCRIPTION -->
    <p
      class="mt-4 text-[18px] leading-[1.5] text-[#5f6b85] font-medium max-w-[420px]"
    >
      {{ item.description }}
    </p>
  </div>
</template>
