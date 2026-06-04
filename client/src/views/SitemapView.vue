<script setup>
import Container from "../components/ui/Container.vue";

const continents = [
  {
    name: "North America",
    countries: ["USA", "Canada", "Mexico"],
  },
  {
    name: "South America",
    countries: ["Brazil", "Peru", "Argentina", "Chile", "Bolivia", "Ecuador", "Colombia", "Venezuela"],
  },
  {
    name: "Europe",
    countries: ["France", "UK", "Netherlands", "Czech Republic", "Italy", "Switzerland", "Germany", "Croatia", "Vatican City", "Spain", "Austria", "Iceland", "Greece", "Portugal", "Hungary", "Denmark"],
  },
  {
    name: "Asia",
    countries: ["Japan", "Thailand", "China", "India", "South Korea", "Vietnam", "Indonesia", "Malaysia", "Philippines", "Cambodia", "Sri Lanka", "Nepal", "Turkey"],
  },
  {
    name: "Africa",
    countries: ["Egypt", "Morocco", "South Africa", "Kenya", "Tanzania", "Namibia", "Botswana", "Ethiopia", "Ghana"],
  },
  {
    name: "Middle East",
    countries: ["UAE", "Qatar", "Saudi Arabia", "Jordan", "Israel", "Oman"],
  },
  {
    name: "Oceania",
    countries: ["Australia", "New Zealand", "Fiji"],
  },
];

function makeSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Sitemap</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Sitemap</h1>
          <p class="text-blue-200 mt-2 text-[15px]">Discover every destination across the globe</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-6xl mx-auto -mt-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="continent in continents"
            :key="continent.name"
            class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden"
          >
            <div class="bg-blue-50 px-5 py-4 text-center">
              <h3 class="text-[14px] font-bold text-[#0b2343]">{{ continent.name }}</h3>
            </div>
            <div class="p-5">
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="country in continent.countries"
                  :key="country"
                  :to="'/country/' + makeSlug(country)"
                  class="text-[13px] px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-[#fcb034] hover:text-white dark:hover:bg-[#fcb034] dark:hover:text-white transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-[#fcb034] font-medium"
                >
                  {{ country }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
