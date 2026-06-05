<script setup>
import Container from "../components/ui/Container.vue";
import PressCard from "../components/ui/PressCard.vue";
import heroImage from "../assets/aquarium-hero.webp";

const slides = [
  {
    image: "https://cdn.prod.website-files.com/637b6b9b9e498752e18dca14/6a1ebc8f2de10166f83f5e39_t415578.%20Austin%20-%20Sunset%20Bat%20Watching%20Kayak%20Tour-nr91.-800x533-85e90a9.jpg",
    badge: "Press Release",
    date: "Jan 2, 2026",
    title: "GetYourGuide unveils summer 2026's three defining travel trends",
  },
  {
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=60",
    badge: "Press Release",
    date: "Dec 15, 2025",
    title: "Brits dig archaeology tours: bookings up more than 50% in two years",
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=60",
    badge: "Report",
    date: "Nov 28, 2025",
    title: "AI in Travel: GetYourGuide releases practical playbook for operators",
  },
  {
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459b5e4e?auto=format&fit=crop&w=600&q=60",
    badge: "Press Release",
    date: "Nov 10, 2025",
    title: "Why the 'Londonmaxxing' trend is on the rise this summer",
  },
  {
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=60",
    badge: "Press Release",
    date: "Oct 22, 2025",
    title: "GetYourGuide partners with TikTok GO to inspire travelers",
  },
];

const tickerTitles = [
  "GetYourGuide unveils summer 2026's three defining travel trends",
  "Brits dig archaeology tours: bookings for archaeologist-led experiences up more than 50%",
  "AI in Travel: GetYourGuide releases practical playbook for experience operators",
  "Why the 'Londonmaxxing' trend is on the rise",
  "GetYourGuide partners with TikTok GO to bring travel experiences to new audiences",
  "GetYourGuide launches AI-powered features for confident trip booking",
  "Record-breaking $500 million funding round announced",
  "GetYourGuide expands to 50 new cities across Asia Pacific",
  "Sustainability initiative: carbon-neutral tours commitment by 2030",
  "GetYourGuide named Top Travel Tech Company by Fast Company",
  "New 'Originals' collection of exclusive experiences launches globally",
  "GetYourGuide reaches 200 million tickets sold milestone",
  "Winter Travel Report: top destinations and trends for 2026",
  "GetYourGuide acquires local tour operator platform TripGalaxy",
  "Holiday campaign: GetYourGuide partners with UNICEF",
  "GetYourGuide appoints new Chief Technology Officer",
  "Customer satisfaction reaches all-time high in Q1 2026",
  "GetYourGuide introduces flexible cancellation on all bookings",
  "New partnership with leading airlines for seamless travel booking",
  "GetYourGuide launches in 10 new Latin American destinations",
];
</script>

<template>
  <div>
    <!-- Media Nav -->
    <nav class="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50">
      <Container>
        <div class="flex items-center justify-between h-24">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 shrink-0">
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="17.5" stroke="currentColor" stroke-width="3" class="text-gray-900 dark:text-white" />
              <path d="M19 7C12 7 7 12 7 19s5 12 12 12c3.5 0 6.5-1.5 8.5-3.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-gray-900 dark:text-white" />
              <path d="M19 16h8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-gray-900 dark:text-white" />
              <circle cx="27" cy="23" r="2" fill="#ff5a1f" />
            </svg>
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="17.5" stroke="currentColor" stroke-width="3" class="text-gray-900 dark:text-white" />
              <path d="M10 10L14 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-gray-900 dark:text-white" />
              <path d="M28 10L24 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-gray-900 dark:text-white" />
              <path d="M19 22v5" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-gray-900 dark:text-white" />
              <circle cx="19" cy="17" r="2" fill="#ff5a1f" />
            </svg>
          </router-link>

          <!-- Center links -->
          <div class="flex items-center gap-8">
            <router-link to="/about" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">About Us</router-link>
            <a href="/blog" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">News</a>
            <a href="#" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">Download Center</a>
          </div>

          <!-- Contact button -->
          <a href="#" class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full transition-colors">Contact</a>
        </div>
      </Container>
    </nav>

    <div class="pt-24 pb-32">
    <!-- News Ticker -->
    <div class="overflow-hidden">
      <Container>
        <div class="flex items-center h-12">
          <span class="shrink-0 bg-[#0a6cff] text-white text-[12px] font-semibold px-4 h-full flex items-center rounded-l-[8px]">Latest releases</span>
          <div class="overflow-hidden flex-1 relative self-stretch border-y border-r border-gray-300 dark:border-gray-600 flex items-center rounded-r-[8px]">
            <div class="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent" />
            <div class="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent" />
            <div class="news-ticker gap-16 whitespace-nowrap">
              <span v-for="(title, i) in tickerTitles" :key="i" class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#ff5533] shrink-0"></span><a href="#" class="text-gray-900 dark:text-white font-bold underline hover:text-[#0a6cff] transition-colors">{{ title }}</a></span>
              <span v-for="(title, i) in tickerTitles" :key="'dup-'+i" class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#ff5533] shrink-0"></span><a href="#" class="text-gray-900 dark:text-white font-bold underline hover:text-[#0a6cff] transition-colors">{{ title }}</a></span>
            </div>
          </div>
        </div>
      </Container>
    </div>
    <!-- Hero -->
    <Container class="mt-6">
      <section
        class="relative h-[55vh] sm:h-[60vh] lg:h-[70vh] bg-cover bg-center flex items-center justify-center rounded-2xl"
        :style="{ backgroundImage: `url(${heroImage})` }"
      >
      <div class="absolute inset-0 bg-black/30" />
      <div class="relative z-10 text-white px-4 w-full h-full flex items-end pb-12 sm:pb-16 lg:pb-20">
        <div class="ml-8 sm:ml-12 lg:ml-16 max-w-md">
          <p class="text-lg sm:text-xl lg:text-2xl font-bold">Welcome to the</p>
          <div class="inline-block mt-2 relative">
            <div class="bg-white text-[#0a6cff] border-2 border-white rounded-lg px-6 py-3">
              <h1 class="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight">GetYourTicket</h1>
            </div>
            <span class="absolute -top-3 right-0 bg-[#ff5533] text-white text-sm font-bold px-3 py-1 rounded-md">Media Center</span>
          </div>
          <p class="mt-4 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">Stay up to date on current company announcements, press releases, industry data and reports.</p>
        </div>
      </div>

      <!-- Overlapping card -->
      <div class="absolute -bottom-40 right-10 w-[480px] max-w-[90vw] z-20">
        <PressCard :slides="slides" />
      </div>
    </section>
    </Container>

    </div>
  </div>
</template>

<style scoped>
.news-ticker {
  display: inline-flex;
  animation: ticker-scroll 80s linear infinite;
}

@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
