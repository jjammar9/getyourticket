<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Container from "../components/ui/Container.vue";

const activeSection = ref("logo-pack");
const activeTab = ref("factsheets");
const headingVisible = ref(false);

let scrollHandler = null;

onMounted(() => {
  scrollHandler = () => {
    headingVisible.value = window.scrollY > window.innerHeight * 0.5;
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });
});

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
});

const sections = [
  { id: "logo-pack", label: "Logo Pack" },
  { id: "photo-sets", label: "Photo Sets" },
  { id: "videos", label: "Videos" },
  { id: "factsheets-reports", label: "Factsheets & Reports" },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    title: "1.5-Hour Speedboat Tour Marina Atlantis Burj Al Arab - Dubai",
  },
  {
    src: "https://images.unsplash.com/photo-1569949381669-ecf31ae8f613?w=600&q=80",
    title: "Exclusive Capri Boat Tour and Optional Blue Grotto - Sorrento",
  },
  {
    src: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
    title: "The Ultimate Game of Thrones Tour - Dubrovnik",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    title: "Sail to the limits on a champion racing yacht",
  },
  {
    src: "https://images.unsplash.com/photo-1573497491765-dccce02f0df9?w=600&q=80",
    title: "Co-founders",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    title: "CFO",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    title: "GetYourGuide App",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    title: "Speedboat Tour Marina Atlantis",
  },
];

const lightboxOpen = ref(false);
const lightboxSrc = ref("");

function openLightbox(src) {
  lightboxSrc.value = src;
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
}

function scrollTo(id) {
  activeSection.value = id;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Nav -->
    <nav
      class="bg-gradient-to-r from-gray-100 from-[288px] to-white to-[288px] dark:from-gray-800 dark:to-gray-900"
    >
      <Container>
        <div class="flex items-center h-24">
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

          <div class="flex items-center gap-8 ml-[16.2vw]">
            <router-link to="/about" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">About Us</router-link>
            <a href="/news" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">News</a>
            <a href="/media" class="text-[14px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#0a6cff] transition-colors">Media</a>
            <a href="/download-center" class="text-[14px] font-medium text-[#0a6cff] transition-colors">Download Center</a>
          </div>

          <a href="#" class="ml-auto bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full transition-colors">Contact</a>
        </div>
      </Container>
    </nav>

    <div class="flex flex-1">
      <!-- Left sidebar -->
      <div class="w-72 shrink-0 bg-gray-100 dark:bg-gray-800 relative">
        <div class="sticky top-0 pt-24 px-6 pb-24">
          <h2
            :class="['text-[50px] font-bold text-gray-900 dark:text-white mb-1 leading-[0.9] transition-all duration-700', headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4']"
          >
            Media & Press Kit
          </h2>
          <div class="mt-24">
          <nav class="space-y-1">
            <button
              v-for="s in sections"
              :key="s.id"
              @click="scrollTo(s.id)"
              class="block w-full text-left text-lg font-bold px-4 py-2 rounded-lg transition-colors text-gray-900 dark:text-white"
            >
              {{ s.label }}
            </button>
          </nav>
          <div class="mt-8">
            <a
              href="#"
              class="flex items-center justify-between w-full px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Download press kit
              <span
                class="w-6 h-6 rounded-full border border-white flex items-center justify-center"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2v7M3 6l3 3 3-3"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex-1 max-w-[50%] ml-[10vw] pb-16 bg-white dark:bg-gray-900">
        <Container>
          <!-- Hero -->
           <div class="mt-16 mb-24">
            <h1 class="font-bold text-gray-900 dark:text-white leading-[0.85] pb-12">
              <span class="text-[70px]">GetYourTicket</span><br>
              <span class="text-[70px]">Media Kit</span>
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl">
              Here you will find visuals, video assets and logo files as well as
              our latest data reports for download.
            </p>
          </div>

          <!-- Logo Pack -->
          <section id="logo-pack" class="mb-24 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-12">
              <div
                class="w-96 h-64 bg-orange-600 rounded-xl flex items-center justify-center shrink-0"
              >
                <div class="flex items-center gap-6">
                  <svg width="80" height="80" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="17.5" stroke="white" stroke-width="3" />
                    <path d="M19 7C12 7 7 12 7 19s5 12 12 12c3.5 0 6.5-1.5 8.5-3.5" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <path d="M19 16h8" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <circle cx="27" cy="23" r="2" fill="#ff5a1f" />
                  </svg>
                  <svg width="80" height="80" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="17.5" stroke="white" stroke-width="3" />
                    <path d="M10 10L14 14" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <path d="M28 10L24 14" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <path d="M19 22v5" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <circle cx="19" cy="17" r="2" fill="#ff5a1f" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Logo Pack
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Files in .jpeg, .png, .eps format
                </p>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 border border-blue-600 bg-white text-blue-600 text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Download pack
                </a>
              </div>
            </div>
          </section>

          <!-- Photo Sets -->
          <section id="photo-sets" class="mb-24 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-12">
              <div class="w-96 h-64 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://cdn.prod.website-files.com/637b6b9b9e498750e58dca08/6989f834f23bff1d33257503_Photo%20Sets.png"
                  alt="Photo Sets"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Photo Sets
                </h2>
                <ul class="space-y-3 mb-6">
                  <li class="flex items-center gap-3 text-base font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors">
                    <span class="w-2 h-2 rounded-full bg-[#ff5533] shrink-0"></span>
                    Experiences
                  </li>
                  <li class="flex items-center gap-3 text-base font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors">
                    <span class="w-2 h-2 rounded-full bg-[#ff5533] shrink-0"></span>
                    Mobile App
                  </li>
                  <li class="flex items-center gap-3 text-base font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors">
                    <span class="w-2 h-2 rounded-full bg-[#ff5533] shrink-0"></span>
                    Executive Team
                  </li>
                </ul>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 border border-blue-600 bg-white text-blue-600 text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Download the pack
                </a>
              </div>
            </div>
          </section>

          <!-- Videos -->
          <section id="videos" class="mb-24 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-12">
              <div class="w-96 h-64 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://cdn.prod.website-files.com/637b6b9b9e498750e58dca08/639c6879e38a6d3e05849885_image_downloads_videos.jpg"
                  alt="Videos"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Videos
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Files in .mp4 format</p>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 border border-blue-600 bg-white text-blue-600 text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                >
                  View & Download
                </a>
              </div>
            </div>
          </section>

          <!-- Factsheets & Reports -->
          <section id="factsheets-reports" class="mb-24">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Factsheets & Reports
            </h2>
            <div class="border-b border-gray-200 dark:border-gray-700">
              <div class="flex gap-8">
                <button
                  @click="activeTab = 'factsheets'"
                  class="pb-3 text-sm font-semibold transition-colors"
                  :class="activeTab === 'factsheets' ? 'text-gray-900 dark:text-white border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'"
                >
                  Factsheets
                </button>
                <button
                  @click="activeTab = 'reports'"
                  class="pb-3 text-sm font-semibold transition-colors"
                  :class="activeTab === 'reports' ? 'text-gray-900 dark:text-white border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'"
                >
                  Reports
                </button>
              </div>
            </div>
            <div v-if="activeTab === 'factsheets'" class="py-6 space-y-2">
              <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    GetYourTicket Fact Sheet: 2026
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    Last updated: Jan 30, 2026
                  </p>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M2 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
              <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    GetYourTicket Sustainability Report: 2025
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    Last updated: Dec 15, 2025
                  </p>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M2 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
              <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    GetYourTicket Annual Review: 2025
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    Last updated: Mar 10, 2026
                  </p>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M2 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            <div v-else class="py-6 space-y-2">
              <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    GetYourTicket Market Insights: Q1 2026
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    Published: Apr 15, 2026
                  </p>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M2 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
              <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    Travel Industry Trends Report: 2026
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    Published: Feb 28, 2026
                  </p>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M2 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </section>

          <!-- Press & Media Enquiries -->
          <section class="mb-16">
            <div
              class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 text-center"
            >
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Press & Media Enquiries
              </h2>
              <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6">
                If you have a press or media related enquiry please get in touch
                with us below and a member of our press team will get back to
                you as soon as possible.
              </p>
              <a
                href="mailto:press@getyourticket.com"
                class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors"
              >
                Get in touch
              </a>
            </div>
          </section>

          <!-- Quick Access -->
          <section class="mb-16">
            <div class="grid md:grid-cols-2 gap-6">
              <div
                class="border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      class="text-gray-500 dark:text-gray-400"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-900 dark:text-white font-semibold mb-4">
                      Click here to see GetYourTicket news
                    </p>
                    <a
                      href="/news"
                      class="inline-flex items-center border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      News
                    </a>
                  </div>
                </div>
              </div>
              <div
                class="border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      class="text-gray-500 dark:text-gray-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-900 dark:text-white font-semibold mb-4">
                      Find out more about our executive team
                    </p>
                    <a
                      href="/about"
                      class="inline-flex items-center border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      About us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <img :src="lightboxSrc" class="max-w-[90vw] max-h-[90vh] rounded-2xl" />
      </div>
    </Teleport>
  </div>
</template>
