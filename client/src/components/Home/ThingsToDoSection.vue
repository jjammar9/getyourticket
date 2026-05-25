<script setup>
const cards = [
  {
    title: "Amsterdam",
    subtitle: "Canals & culture",
    image:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80",
  },
  {
    title: "Rome",
    subtitle: "Historic wonders",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  },
  {
    title: "Budapest",
    subtitle: "City views",
    image:
      "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=600&q=80",
  },
  {
    title: "Paris",
    subtitle: "Iconic attractions",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  },
  {
    title: "London",
    subtitle: "Museums & landmarks",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  },
  {
    title: "Barcelona",
    subtitle: "Architecture & food",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
  },
];
</script>

<template>
  <section class="max-w-7xl mx-auto px-8 py-14">
    <div class="mb-8">
      <h2 class="text-[48px] font-bold text-[#0f2147]">
        Things to do wherever you're going
      </h2>
    </div>

    <div class="grid grid-cols-6 gap-5">
      <div v-for="card in cards" :key="card.title" class="group cursor-pointer">
        <div class="overflow-hidden rounded-2xl">
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        <div class="mt-3">
          <h3 class="text-[16px] font-semibold text-[#0f2147]">
            {{ card.title }}
          </h3>

          <p class="text-[13px] text-gray-500 mt-1">
            {{ card.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
