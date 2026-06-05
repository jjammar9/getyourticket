<script setup>
import Container from "../components/ui/Container.vue";
import NewsletterSection from "../components/sections/NewsletterSection.vue";
import { handleImageError } from "../constants/placeholder.js";
import { ArrowRight, Play } from "lucide-vue-next";

const heroArticle = {
  title: "Why grandma guides could be an antidote to modern loneliness",
  image: "https://cdn.bfldr.com/UTM69Z3S/at/mt6jk8vn6h8jjnp8n8tbs2r/BCC-2025-EXPLORER-TRAVEL-INSPIRATION-GRANDMACORE-HEADER_DESKTOP.jpg?auto=webp&format=webp&quality=60&width=1440",
  excerpt: "I've barely set foot in the spacious vaulted room where the pasta-making workshop I've booked is being held when a small, dark-haired woman with twinkling eyes and an infectious smile barrels toward me...",
  author: "Laura Millar",
  date: "May 13, 2026",
};

const articles = [
  {
    title: "I work at GetYourGuide, but I hate guided anything",
    image: "https://cdn.bfldr.com/UTM69Z3S/at/4cxwf5jnkq3vnjfftb378jcb/t453317_From_Cala_Gonone_-_Gulf_of_Orosei_Dinghy_Trip_-_nr3-HEADER.jpg?disable=upscale&auto=webp&quality=60&format=pjpg&crop=270%3A150%2Csmart&width=270&height=150",
    excerpt: "I'll start by saying sorry to my bosses, but the time has come for my biggest confession: I hate organized fun.",
    author: "Adriana Rocks",
    date: "May 15, 2026",
  },
  {
    title: "9 best US national parks to visit in summer for outdoor fun",
    image: "https://cdn.bfldr.com/UTM69Z3S/at/95fn3jb9kcrj3n6r8jb7tcqj/BCC-2025-EXPLORER-US-NATIONAL-PARKS-TO-VISIT-IN-SUMMER-HEADER_DESKTOP.jpg?disable=upscale&auto=webp&quality=60&format=pjpg&crop=270%3A150%2Csmart&width=270&height=150",
    excerpt: "Summer is the season for getting outdoors, and the best time to explore the US's national parks.",
    author: "Asya Wilson",
    date: "May 15, 2026",
  },
  {
    title: "The world's most epic road trip destinations: Travelers' tips",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt7afe80431459b9cd/65df59116e7edba980b4fd0e/BCC-2023-EXPLORER-PASSION-ROADTRIPS-HEADER_DESKTOP_(1).jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=270&height=150",
    excerpt: "When you want to break away from the crowds and explore, there's nothing quite like the freedom of a road trip.",
    author: "GetYourGuide Creator Community",
    date: "May 15, 2026",
  },
  {
    title: "A 24-hour itinerary for London: See the highlights in a day",
    image: "https://cdn.bfldr.com/UTM69Z3S/at/nzkfbkkpncr3f75shcb2w4v/BCC-2025-EXPLORER-LONDON-24-HOURS-HEADER_DESKTOP.jpg?disable=upscale&auto=webp&quality=60&format=pjpg&crop=270%3A150%2Csmart&width=270&height=150",
    excerpt: "In one day in London, you can cover a surprising amount without sprinting from sight to sight.",
    author: "Yessica Klein",
    date: "May 11, 2026",
  },
  {
    title: "Tips to beat the crowds in Paris: A local guide",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=425,height=240,dpr=2/video_thumbnail_img/5c2a4d7aa00f4b9f95d7043371b952db3a0e24f34747b172ca71864f2928a609.jpg",
    excerpt: "Paris is one of the most popular destinations in Europe, so here are my best tips as a local to beat the crowds.",
    author: "Valeria Lores",
    date: "May 12, 2026",
  },
  {
    title: "Watch an insider's guide to the best food in Barcelona",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=425,height=240,dpr=2/video_thumbnail_img/700a9e626aa3468b987bddb999ff7e4156df9d63ef2a1557ff9e28da205161b9.jpg",
    excerpt: "Barcelona excels when it comes to delicious food, and in this video, I'll help you figure out exactly where to begin.",
    author: "Nathalia Generoso",
    date: "May 13, 2026",
  },
  {
    title: "Top 10 European coastal cities and beach getaways",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt437b0dd20320e4ca/67c85ca721a60ebcdfa485ad/BCC-2025-EXPLORER-EUROPE-COASTAL-DESTINATIONS-HEADER_DESKTOP.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=425&height=240",
    excerpt: "Leave Europe's crowded beaches behind with our guide to the continent's most amazing coastal destinations.",
    author: "Yessica Klein",
    date: "May 7, 2026",
  },
  {
    title: "Watch the ultimate one day itinerary in Ho Chi Minh City",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=425,height=240,dpr=2/video_thumbnail_img/3e5b4c15cf8ab66b9a020510a8b628210b586fb5eef6d0e4e4445b7956198e03.jpg",
    excerpt: "As someone who's been exploring Ho Chi Minh City for years, this is my ideal way to spend 24 hours in the city.",
    author: "Paulina",
    date: "May 15, 2026",
  },
];

const contributors = [
  {
    name: "Laura Millar",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt9cccd7819332bbe6/6762c650a76631e8daa0bb49/laura-millar-CROPPED.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=200&height=200",
    about: "Laura Millar is a travel- and food-obsessed writer based in London, never happier than when browsing a foreign supermarket or unearthing the local equivalent of pasta, noodles, and dumplings.",
    passions: ["Luxury", "Budget", "Solo travel", "Romance", "Sport & wellness"],
  },
  {
    name: "Lachlan Probyn",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltb2f99cb6046ab737/672237c776b67969c87e26bc/Lachlan_Probyn.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=200&height=200",
    about: "Lachlan lives in Paris and is the Head of Content and Community at misterb&b, an LGBTQ+ accommodation platform. He enjoys coffee and cocktails and loves to visit Rome every year to eat his own weight in pasta.",
    passions: ["Luxury", "LGBTQ+", "Solo travel", "Romance", "Sport & wellness"],
  },
  {
    name: "Emily Browne",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltf6b5c903e6445ada/67629d9cf53d98aee137a102/Emily_Browne_headshot.jpeg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=200&height=200",
    about: "Emily Browne is a London-born, Berlin-based writer with a passion for adventure, delicious food, and stepping outside the ordinary. Traveling to her is more than just a holiday — it's a way to gain a deeper appreciation of our planet.",
    passions: ["Budget", "LGBTQ+", "Solo travel", "Romance", "Adventure"],
  },
  {
    name: "Lily Pollock",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt8cff1e52211e48f6/697b74bc403e8f9ba9b657c4/Lily_Pollock_Headshot.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=200&height=200",
    about: "Lily Pollock is a Berlin-based writer and editor, with a taste for slow travel and outdoor adventures. Originally from London, she loves exploring cities around the world — but is happiest when hiking in the wilderness.",
    passions: [],
  },
];

const videos = [
  {
    title: "Tips to beat the crowds in Paris: A local guide",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=600,height=338,dpr=2/video_thumbnail_img/5c2a4d7aa00f4b9f95d7043371b952db3a0e24f34747b172ca71864f2928a609.jpg",
    excerpt: "Paris is one of the most popular destinations in Europe, so here are my best tips as a local to beat the crowds on your next visit.",
    author: "Valeria Lores",
    date: "May 12, 2026",
  },
  {
    title: "Watch an insider's guide to the best food in Barcelona",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=600,height=338,dpr=2/video_thumbnail_img/700a9e626aa3468b987bddb999ff7e4156df9d63ef2a1557ff9e28da205161b9.jpg",
    excerpt: "Barcelona excels when it comes to delicious food, and in this video, I'll help you figure out exactly where to begin.",
    author: "Nathalia Generoso",
    date: "May 13, 2026",
  },
  {
    title: "Watch the ultimate one day itinerary in Ho Chi Minh City",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=600,height=338,dpr=2/video_thumbnail_img/3e5b4c15cf8ab66b9a020510a8b628210b586fb5eef6d0e4e4445b7956198e03.jpg",
    excerpt: "As someone who's been exploring Ho Chi Minh City for years, this is my ideal way to spend 24 hours in the city.",
    author: "Paulina",
    date: "May 15, 2026",
  },
];

const destinations = [
  { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  { name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80" },
  { name: "Barcelona", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80" },
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80" },
  { name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
  { name: "Sydney", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
];
</script>

<template>
  <main>
    <!-- Page header -->
    <section class="bg-white">
      <Container>
        <div class="pt-48 pb-10">
          <h1 class="text-[48px] md:text-[64px] font-bold text-[#0b2343] leading-tight tracking-[-1.5px]">
            The Explorer
          </h1>
          <p class="mt-3 text-[20px] text-gray-500 font-medium max-w-2xl">
            Destination guides, insider tips, and vacation inspiration.
          </p>
        </div>
      </Container>
    </section>

    <!-- Hero featured article -->
    <section class="bg-white">
      <Container>
        <div class="pt-8 pb-8">
          <div class="relative rounded-[18px] overflow-hidden bg-white hover:shadow-md transition-all group">
            <div class="md:flex">
              <div class="md:w-3/5 overflow-hidden">
                <img
                  :src="heroArticle.image"
                  :alt="heroArticle.title"
                  @error="handleImageError"
                  class="w-full h-[300px] md:h-full object-cover group-hover:scale-[1.02] transition duration-500"
                />
              </div>
              <div class="md:w-2/5 p-8 md:p-10 flex flex-col justify-center">
                <span class="text-[13px] font-semibold text-[#0071eb] uppercase tracking-wide mb-2">Featured</span>
                <h1 class="text-[26px] md:text-[32px] font-bold text-[#0b2343] leading-tight tracking-[-0.5px]">
                  {{ heroArticle.title }}
                </h1>
                <p class="mt-4 text-[15px] text-gray-500 leading-relaxed">
                  {{ heroArticle.excerpt }}
                </p>
                <span class="mt-6 text-[13px] text-gray-400 font-medium">{{ heroArticle.author }} • {{ heroArticle.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Learn more about your destination -->
    <section class="bg-white py-16">
      <Container>
        <div class="mb-10">
          <h2 class="text-[32px] font-bold tracking-[-0.5px] leading-tight text-[#0b2343]">Learn more about your destination</h2>
          <p class="mt-3 text-[18px] font-medium text-gray-500">Explore guides, tips and inspiration for your next trip</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
            v-for="dest in destinations.slice(0, 3)"
            :key="dest.name"
            :href="`/explorer/${dest.name.toLowerCase()}/`"
            class="block group relative rounded-[18px] overflow-hidden"
          >
            <div class="aspect-[16/9]">
              <img
                :src="dest.image"
                :alt="dest.name"
                @error="handleImageError"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span class="text-white/40 text-[48px] font-bold leading-none block">{{ destinations.indexOf(dest) + 1 }}</span>
              <h3 class="text-white text-[22px] font-bold mt-1">{{ dest.name }}</h3>
            </div>
          </a>
        </div>
      </Container>
    </section>

    <!-- Video highlights -->
    <section class="bg-white py-16 border-t border-[#e8edf5]">
      <Container>
        <div class="mb-10">
          <h2 class="text-[32px] font-bold tracking-[-0.5px] leading-tight text-[#0b2343]">Video highlights</h2>
          <p class="mt-3 text-[18px] font-medium text-gray-500">Watch and get inspired for your next adventure</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="video in videos"
            :key="video.title"
            class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div class="relative overflow-hidden">
              <img
                :src="video.image"
                :alt="video.title"
                @error="handleImageError"
                class="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition duration-500"
              />
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                  <Play class="w-6 h-6 text-[#0b2343] ml-0.5" />
                </div>
              </div>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-[15px] font-bold text-[#0b2343] leading-snug line-clamp-2">{{ video.title }}</h3>
              <p class="mt-2 text-[13px] text-gray-500 leading-relaxed line-clamp-2 flex-1">{{ video.excerpt }}</p>
              <span class="mt-3 text-[12px] text-gray-400 font-medium">{{ video.author }} • {{ video.date }}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Featured contributors -->
    <section class="bg-white py-16">
      <Container>
        <div class="mb-10">
          <h2 class="text-[32px] font-bold tracking-[-0.5px] leading-tight text-[#0b2343]">Featured contributors</h2>
          <p class="mt-3 text-[18px] font-medium text-gray-500">Meet our community of travel writers and creators</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="c in contributors"
            :key="c.name"
            class="bg-white rounded-[18px] border border-[#d9dee8] p-6 hover:shadow-md transition-all"
          >
            <div class="flex items-center gap-3 mb-4">
              <img
                :src="c.image"
                :alt="c.name"
                @error="handleImageError"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div class="flex items-center gap-1">
                  <h3 class="text-[15px] font-bold text-[#0b2343]">{{ c.name }}</h3>
                  <svg class="w-4 h-4 text-[#0071eb]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4 5.5l-5 5-3-3 1-1 2 2 4-4 1 1z"/>
                  </svg>
                </div>
                <span class="text-[12px] text-[#0071eb] font-medium">Verified</span>
              </div>
            </div>
            <div v-if="c.passions.length" class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="p in c.passions"
                :key="p"
                class="text-[11px] font-medium text-gray-500 bg-[#f2f5f9] px-2.5 py-1 rounded-full"
              >
                {{ p }}
              </span>
            </div>
            <p class="text-[13px] text-gray-500 leading-relaxed line-clamp-4">{{ c.about }}</p>
            <a
              href="#"
              class="inline-block mt-4 text-[13px] font-bold text-[#0071eb] hover:text-[#0050a0] transition-colors"
            >
              View profile →
            </a>
          </div>
        </div>
      </Container>
    </section>

    <!-- Article grid -->
    <section class="bg-white pb-8">
      <Container>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div
            v-for="(article, i) in articles"
            :key="i"
            class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div class="overflow-hidden">
              <img
                :src="article.image"
                :alt="article.title"
                @error="handleImageError"
                class="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition duration-500"
              />
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-[15px] font-bold text-[#0b2343] leading-snug line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="mt-2 text-[13px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
                {{ article.excerpt }}
              </p>
              <span class="mt-3 text-[12px] text-gray-400 font-medium">{{ article.author }} • {{ article.date }}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Top destinations -->
    <section class="bg-white py-16">
      <Container>
        <div class="flex items-end justify-between mb-10">
          <div>
            <h2 class="text-[32px] font-bold tracking-[-0.5px] leading-tight text-[#0b2343]">
              Top destinations around the world
            </h2>
            <p class="mt-3 text-[18px] font-medium text-gray-500">Discover content and guides for every destination in this page</p>
          </div>
          <a
            href="/explorer/travel-inspiration/"
            class="text-[15px] font-bold text-[#0071eb] hover:text-[#0050a0] whitespace-nowrap ml-6 transition-colors"
          >
            Explore all destinations <ArrowRight class="inline w-4 h-4 ml-1" />
          </a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <a
            v-for="dest in destinations"
            :key="dest.name"
            :href="`/explorer/${dest.name.toLowerCase()}/`"
            class="block group"
          >
            <div class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden hover:shadow-md transition-all">
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  :src="dest.image"
                  :alt="dest.name"
                  @error="handleImageError"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div class="p-4">
                <h3 class="text-[15px] font-bold text-[#0b2343]">{{ dest.name }}</h3>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </section>

    <div class="mb-16">
      <NewsletterSection />
    </div>
  </main>
</template>
