<script setup>
import { ref } from "vue";
import Container from "../components/ui/Container.vue";
import PressCard from "../components/ui/PressCard.vue";
import heroImage from "../assets/aquarium-hero.webp";

const categoryOpen = ref(false);
const selectedCategory = ref("Category");

const categories = ["Category", "Press Release", "Reports", "Industry News"];

const visibleCount = ref(6);

function showMore() {
  visibleCount.value += 6;
  if (visibleCount.value > newsCards.length) visibleCount.value = newsCards.length;
}

function showLess() {
  visibleCount.value = 6;
  setTimeout(() => {
    document.querySelector(".news-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}

const newsCards = [
  { image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Jan 20, 2026", text: "GetYourGuide releases Q4 2025 travel insights showing record growth in experiential tourism across Europe and Asia" },
  { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Dec 12, 2025", text: "New study reveals solo travel bookings surged 45% year-over-year driven by millennial and Gen Z adventurers" },
  { image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Nov 5, 2025", text: "Sustainable tourism report highlights 80% of travelers prefer eco-friendly experiences when booking through GetYourGuide" },
  { image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Oct 18, 2025", text: "AI-powered travel recommendations drive 35% increase in customer satisfaction scores across platform" },
  { image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Sep 30, 2025", text: "GetYourGuide partners with 200 new museums and cultural institutions worldwide expanding art and history offerings" },
  { image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Sep 8, 2025", text: "Winter travel forecast predicts Top 10 trending destinations with unique local experiences leading demand" },
  { image: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Aug 15, 2025", text: "GetYourGuide launches immersive audio guides feature for self-guided walking tours in 50 cities worldwide" },
  { image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Jul 28, 2025", text: "Summer travel report reveals beach destinations and culinary experiences dominate 2025 booking trends" },
  { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Jul 10, 2025", text: "Travel industry coalition formed to promote responsible tourism practices across popular European destinations" },
  { image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Jun 22, 2025", text: "GetYourGuide acquires boutique experience curator LocalGems to expand authentic neighborhood tour offerings" },
  { image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Jun 5, 2025", text: "Annual transparency report shows 99% of tours meet quality standards with customer ratings averaging 4.7 stars" },
  { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "May 18, 2025", text: "New visa waiver programs across Southeast Asia drive 60% increase in multi-country tour bookings" },
  { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "May 1, 2025", text: "GetYourGuide unveils Originals collection featuring exclusive experiences curated by local artisans and chefs" },
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Apr 14, 2025", text: "Spring travel index: city break bookings up 35% with Paris, London and Tokyo leading destination rankings" },
  { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Mar 28, 2025", text: "Global tourism recovery accelerates with international arrivals reaching 95% of pre-pandemic levels" },
  { image: "https://images.unsplash.com/photo-1440581073192-3d4f0c642f18?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Mar 10, 2025", text: "GetYourGuide partners with major airlines to offer seamless travel experience bookings directly during flight purchase" },
  { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Feb 22, 2025", text: "Winter sports report: ski and snowboard experience bookings surge 50% as Alpine destinations see record visitors" },
  { image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Feb 5, 2025", text: "Travel tech investment reaches new heights with record $2.8 billion raised by experience platforms globally" },
  { image: "https://images.unsplash.com/photo-1518173946687-a32f81aeed6b?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Jan 18, 2025", text: "GetYourGuide launches sustainability initiative pledging carbon-neutral operations across all tours by 2030" },
  { image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Jan 2, 2025", text: "Year in review 2024: GetYourGuide served 50 million travelers with experiences in over 150 countries worldwide" },
  { image: "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Dec 15, 2024", text: "Study finds experiential travel spending grew 3x faster than overall tourism spending in past five years" },
  { image: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Nov 28, 2024", text: "GetYourGuide named to Fast Company's Most Innovative Travel Companies list for third consecutive year" },
  { image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Nov 10, 2024", text: "Consumer survey reveals 78% of travelers prefer booking experiences online with mobile bookings leading growth" },
  { image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Oct 22, 2024", text: "New AI-powered translation tools help travelers book local experiences in over 40 languages across platform" },
  { image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Oct 5, 2024", text: "GetYourGuide expands into Latin America with 500 new experiences across Mexico, Brazil and Argentina" },
  { image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Sep 18, 2024", text: "Q3 earnings report shows record revenue of $890 million driven by strong summer travel season performance" },
  { image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Sep 1, 2024", text: "Travel industry experts predict experience economy will surpass traditional goods spending within five years" },
  { image: "https://images.unsplash.com/photo-1526778548025-fa2f459b5e4e?auto=format&fit=crop&w=600&q=60", badge: "Press Release", date: "Aug 15, 2024", text: "GetYourGuide launches flexible cancellation policy allowing free changes up to 24 hours before any experience" },
  { image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=60", badge: "Reports", date: "Jul 28, 2024", text: "Summer forecast predicts 12 hottest destinations with unique local food tours and cultural workshops leading demand" },
  { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60", badge: "Industry News", date: "Jul 10, 2024", text: "Mobile-first travel booking reaches tipping point with 72% of all experience reservations made via smartphone" },
];

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
    <nav class="w-full bg-white dark:bg-gray-900">
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
            <a href="/news" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">News</a>
            <a href="/media" class="text-[14px] font-medium text-[#0a6cff] transition-colors">Media</a>
            <a href="/download-center" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">Download Center</a>
          </div>

          <!-- Contact button -->
          <a href="#" class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full transition-colors">Contact</a>
        </div>
      </Container>
    </nav>

    <div class="pb-32">
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

    <!-- Latest News section -->
    <Container class="mt-60">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-display)]">Latest News by GetYourGuide</h2>
        <div class="flex items-center gap-6 w-full sm:w-auto">
          <div class="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden w-full sm:w-auto">
            <input type="text" placeholder="Search article" class="flex-1 px-7 py-4 outline-none text-[15px] text-black dark:text-gray-200 placeholder:text-black dark:placeholder:text-gray-400 min-w-[200px]" />
            <button class="px-4 h-full flex items-center justify-center text-black dark:text-gray-200 transition shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
            </button>
          </div>
          <div class="relative">
            <button @click="categoryOpen = !categoryOpen" class="flex items-center gap-3 px-6 py-3.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 text-[15px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" :class="categoryOpen ? 'ring-2 ring-black/10' : ''">
              <span>{{ selectedCategory }}</span>
              <svg class="w-4 h-4 text-black dark:text-gray-200 transition-transform" :class="categoryOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="categoryOpen" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div v-for="(cat, i) in categories" :key="i" @click="selectCategory(cat)" class="px-5 py-3 text-[14px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" :class="selectedCategory === cat ? 'font-semibold text-[#0a6cff]' : ''">{{ cat }}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    <!-- News Cards Grid -->
    <Container class="mt-12" id="news-cards">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(card, i) in newsCards.slice(0, visibleCount)" :key="i" class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="relative overflow-hidden">
            <div class="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 z-10"></div>
            <div class="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-125" :style="{ backgroundImage: `url(${card.image})` }"></div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3">
              <span class="bg-black text-white text-[13px] font-semibold px-4 py-1.5 rounded-[5px]">{{ card.badge }}</span>
              <span class="text-[13px] text-gray-500 dark:text-gray-400 font-[family-name:var(--font-body)]">{{ card.date }}</span>
            </div>
            <p class="mt-4 text-[16px] font-bold text-gray-900 dark:text-white font-[family-name:var(--font-display)] leading-snug line-clamp-3">{{ card.text }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <button v-if="visibleCount < newsCards.length" @click="showMore" class="flex items-center gap-3 px-8 py-3.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 text-[15px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span>Show more</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <button v-else @click="showLess" class="flex items-center gap-3 px-8 py-3.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 text-[15px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span>Less</span>
          <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </Container>

    <!-- Quick Access -->
    <div class="mt-10">
      <Container>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-display)]">Quick Access</h2>
        <div class="mt-8 space-y-5">
          <div class="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-8 py-6 flex items-center justify-between bg-white dark:bg-gray-800">
            <div class="flex items-center gap-4">
              <svg class="w-7 h-7 text-[#ff5533]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span class="text-lg font-medium text-gray-900 dark:text-white">Click here to see GetYourTicket news</span>
            </div>
            <router-link to="/news" class="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 text-[15px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0 inline-block text-center">News</router-link>
          </div>
          <div class="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-8 py-6 flex items-center justify-between bg-white dark:bg-gray-800">
            <div class="flex items-center gap-4">
              <svg class="w-7 h-7 text-[#ff5533]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span class="text-lg font-medium text-gray-900 dark:text-white">Find out more about our executive team</span>
            </div>
            <router-link to="/about" class="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 text-[15px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0 inline-block text-center">About us</router-link>
          </div>
        </div>
      </Container>
    </div>

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
