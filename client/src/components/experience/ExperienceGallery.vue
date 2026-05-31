<script setup>
defineProps({
  experience: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <!-- MAIN IMAGE -->
    <div class="col-span-3">
      <img
        :src="experience.image"
        :alt="experience.title"
        class="w-full h-[500px] object-cover rounded-3xl"
      />
    </div>

    <!-- SIDE IMAGES -->
    <div class="flex flex-col gap-3">
      <img
        :src="experience.image"
        :alt="experience.title"
        class="h-[116px] object-cover rounded-2xl"
      />

      <img
        :src="experience.image"
        :alt="experience.title"
        class="h-[116px] object-cover rounded-2xl"
      />

      <img
        :src="experience.image"
        :alt="experience.title"
        class="h-[116px] object-cover rounded-2xl"
      />

      <div class="relative">
        <img
          :src="experience.image"
          :alt="experience.title"
          class="h-[116px] w-full object-cover rounded-2xl"
        />

        <div
          class="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center"
        >
          <button
            class="bg-white px-4 py-2 rounded-xl font-semibold text-[#0b2343]"
          >
            See all photos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
