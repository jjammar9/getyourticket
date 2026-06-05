<script setup>
import Container from "../components/ui/Container.vue";

const posts = [
  {
    title: "Top 10 Hidden Gems in Europe You Need to Visit",
    excerpt: "Discover off-the-beaten-path destinations that will make your next European trip unforgettable.",
    date: "May 28, 2026",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "How to Travel on a Budget Without Missing Out",
    excerpt: "Smart tips and tricks to stretch your travel budget while still having incredible experiences.",
    date: "May 20, 2026",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "The Ultimate Guide to Solo Travel",
    excerpt: "Everything you need to know about exploring the world on your own terms.",
    date: "May 12, 2026",
    category: "Solo Travel",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Best Food Tours Around the World",
    excerpt: "Taste your way through the world's most delicious destinations with our curated food tour picks.",
    date: "May 5, 2026",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Family-Friendly Destinations for Your Next Vacation",
    excerpt: "Planning a family trip? These destinations offer fun for all ages.",
    date: "April 28, 2026",
    category: "Family Travel",
    image: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Adventure Travel: Thrilling Experiences to Add to Your Bucket List",
    excerpt: "From bungee jumping to safari drives, here are the most exhilarating experiences waiting for you.",
    date: "April 18, 2026",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "A Local's Guide to Exploring Tokyo",
    excerpt: "Get insider tips on the best neighborhoods, food spots, and cultural experiences in Tokyo.",
    date: "April 10, 2026",
    category: "City Guides",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Sustainable Travel: How to Be a Responsible Tourist",
    excerpt: "Learn how to minimize your environmental impact while still having amazing travel experiences.",
    date: "April 2, 2026",
    category: "Sustainable Travel",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=60",
  },
];
</script>

<template>
  <div>
    <!-- Media Nav -->
    <nav class="w-full bg-white dark:bg-gray-900">
      <Container>
        <div class="flex items-center justify-between h-24">
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

          <div class="flex items-center gap-8">
            <router-link to="/about" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">About Us</router-link>
            <a href="/news" class="text-[14px] font-medium text-[#0a6cff] transition-colors">News</a>
            <a href="/media" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">Media</a>
            <a href="/download-center" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">Download Center</a>
          </div>

          <a href="#" class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full transition-colors">Contact</a>
        </div>
      </Container>
    </nav>

  <div class="pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">News</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">News</h1>
          <p class="mt-3 text-[15px] text-blue-200">Latest news and updates from GetYourTicket.</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-5xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article
              v-for="(post, index) in posts"
              :key="index"
              class="group cursor-pointer"
            >
              <div class="overflow-hidden rounded-xl">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span class="mt-3 inline-block text-[12px] font-semibold text-[#0a6cff] uppercase tracking-wider">{{ post.category }}</span>
              <h3 class="mt-1 text-[18px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)] leading-snug group-hover:text-[#0a6cff] transition-colors">
                {{ post.title }}
              </h3>
              <p class="mt-2 text-[14px] text-gray-500 dark:text-gray-400 font-[family-name:var(--font-body)] leading-relaxed">
                {{ post.excerpt }}
              </p>
              <p class="mt-3 text-[12px] text-gray-400 dark:text-gray-500 font-[family-name:var(--font-body)]">{{ post.date }}</p>
            </article>
          </div>
        </div>
      </div>
    </Container>
    </div>
  </div>
</template>
