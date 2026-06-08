<script setup>
import { ref, computed } from "vue";
import { Star, ThumbsUp, Search, ChevronDown, Sparkles } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";
import { useAuthStore } from "../../stores/authStore.js";
import { createReview } from "../../api.js";

const localeStore = useLocaleStore();
const authStore = useAuthStore();

const props = defineProps({
  listingId: Number, rating: Number, reviewsCount: Number,
  reviewItems: { type: Array, default: () => [] },
});

const emit = defineEmits(["reviewed"]);

const reviewText = ref("");
const reviewRating = ref(5);
const submitting = ref(false);
const submitted = ref(false);
const searchQuery = ref("");
const sortBy = ref("Recommended");
const sortOpen = ref(false);

const fallbackReviews = [
  { name: "Sarah M.", text: "Absolutely incredible experience! The guide was knowledgeable and the views were breathtaking.", rating: 5, date: "2025-12-10" },
  { name: "James K.", text: "Well organized and great value for money.", rating: 5, date: "2025-11-22" },
  { name: "Elena R.", text: "A highlight of our trip. The skip-the-line access saved us hours.", rating: 4, date: "2025-10-15" },
  { name: "Michael T.", text: "Good experience overall, but could have used more time at the top.", rating: 4, date: "2025-09-30" },
  { name: "Lisa W.", text: "Absolutely worth every penny! Would do it again in a heartbeat.", rating: 5, date: "2025-09-12" },
];

const sourceReviews = computed(() => props.reviewItems.length > 0 ? props.reviewItems : fallbackReviews);

const filteredReviews = computed(() => {
  let items = [...sourceReviews.value];
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    items = items.filter(r => r.text?.toLowerCase().includes(q) || r.name?.toLowerCase().includes(q));
  }
  if (sortBy.value === "Most recent") items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  else if (sortBy.value === "Oldest") items.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  else if (sortBy.value === "Highest rated") items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (sortBy.value === "Lowest rated") items.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  return items;
});

const barPercent = computed(() => {
  const counts = [0, 0, 0, 0, 0];
  for (const r of sourceReviews.value) {
    const idx = Math.round(r.rating || 5) - 1;
    if (idx >= 0 && idx < 5) counts[idx]++;
  }
  return counts.map(c => sourceReviews.value.length ? Math.round((c / sourceReviews.value.length) * 100) : 0).reverse();
});

const aiSummary = computed(() => {
  const count = sourceReviews.value.length;
  if (!count) return "";
  const avg = sourceReviews.value.reduce((s, r) => s + (r.rating || 0), 0) / count;
  if (avg >= 4.5) return "Travelers consistently praise this experience for its excellent organization, knowledgeable guides, and breathtaking views. Many highlight it as a must-do activity.";
  if (avg >= 4) return "Most travelers have positive things to say about the quality of this experience.";
  return "Travelers have had mixed experiences with this activity.";
});

const sortOptions = ["Recommended", "Most recent", "Oldest", "Highest rated", "Lowest rated"];

async function handleSubmitReview() {
  if (!reviewText.value) return;
  submitting.value = true;
  try {
    await createReview({ listingId: props.listingId, rating: reviewRating.value, text: reviewText.value });
    submitted.value = true;
    emit("reviewed", { name: authStore.user?.name || "You", rating: reviewRating.value, text: reviewText.value, date: new Date().toISOString().split("T")[0] });
    reviewText.value = "";
  } catch (e) { console.error(e); }
  finally { submitting.value = false; }
}
</script>

<template>
  <div>
    <h2 class="text-[18px] font-black text-[#0b2343] dark:text-white mb-5">{{ localeStore.t("expReviews.title") }}</h2>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- LEFT: Rating summary -->
      <div class="md:col-span-5 lg:col-span-4">
        <div class="flex items-start gap-2 mb-2">
          <span class="text-[48px] font-black text-[#0b2343] dark:text-white leading-none">{{ rating }}</span>
          <Star :size="24" class="text-yellow-500 fill-yellow-500" />
        </div>
        <p class="text-[16px] font-bold text-[#0b2343] dark:text-white mb-0.5">Exceptional</p>
        <p class="text-[12px] text-[#59657b] dark:text-gray-400 mb-4">Based on {{ reviewsCount || sourceReviews.length }} reviews</p>

        <!-- Star distribution bars -->
        <div class="space-y-1 mb-4">
          <div v-for="(pct, idx) in barPercent" :key="idx" class="flex items-center gap-2 text-[12px]">
            <span class="text-[#59657b] w-4 font-medium text-right shrink-0">{{ 5 - idx }}</span>
            <Star :size="11" class="text-yellow-500 fill-yellow-500 shrink-0" />
            <div class="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-500 rounded-full transition-all" :style="{ width: pct + '%' }"></div>
            </div>
            <span class="text-[#8a94a6] w-8 text-right shrink-0">{{ pct }}%</span>
          </div>
        </div>

        <!-- Ratings by topic -->
        <div>
          <p class="text-[11px] font-bold text-[#0b2343] dark:text-white mb-2">Ratings by topic</p>
          <div class="grid grid-cols-1 gap-1">
            <div v-for="item in [
              { label: 'Value for money', rating: 4.8 },
              { label: 'Service', rating: 4.9 },
              { label: 'Organization', rating: 4.9 },
              { label: 'Safety', rating: 4.9 },
            ]" :key="item.label" class="flex items-center justify-between text-[12px]">
              <span class="text-[#59657b] dark:text-gray-400">{{ item.label }}</span>
              <div class="flex items-center gap-1">
                <span class="font-bold text-[#0b2343] dark:text-white">{{ item.rating }}</span>
                <Star :size="10" class="text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Reviews list -->
      <div class="md:col-span-7 lg:col-span-8">
        <!-- AI summary -->
        <div class="border border-[#e8ebf0] dark:border-gray-700 rounded-xl p-4 mb-4">
          <div class="flex items-center gap-2 mb-2">
            <Sparkles :size="16" class="text-[#59657b]" />
            <h3 class="text-[13px] font-bold text-[#0b2343] dark:text-white">What travelers loved</h3>
          </div>
          <p class="text-[13px] text-[#4f5b72] dark:text-gray-300 leading-relaxed">{{ aiSummary }}</p>
        </div>

        <!-- Search + Sort -->
        <div class="flex items-center gap-2 mb-4">
          <div class="relative flex-1">
            <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a94a6]" />
            <input v-model="searchQuery" type="text" placeholder="Search reviews" class="w-full pl-9 pr-3 py-2 border border-[#d9dee8] dark:border-gray-600 rounded-lg text-[13px] text-[#0b2343] dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b2343]/10 focus:border-[#0b2343] transition" />
          </div>
          <div class="relative">
            <button @click="sortOpen = !sortOpen" class="flex items-center gap-1.5 px-3 py-2 border border-[#d9dee8] dark:border-gray-600 rounded-lg text-[12px] font-medium text-[#0b2343] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition whitespace-nowrap">
              {{ sortBy }} <ChevronDown :size="13" />
            </button>
            <div v-if="sortOpen" class="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 border border-[#e8ebf0] dark:border-gray-700 rounded-lg shadow-lg z-20">
              <button v-for="opt in sortOptions" :key="opt" @click="sortBy = opt; sortOpen = false" class="block w-full text-left px-3 py-2 text-[12px] text-[#0b2343] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition" :class="sortBy === opt ? 'font-bold' : ''">{{ opt }}</button>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="space-y-0 divide-y divide-[#e8ebf0] dark:divide-gray-700">
          <div v-for="(review, i) in filteredReviews" :key="i" class="py-4 first:pt-0 last:pb-0">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#0b2343] dark:bg-gray-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">{{ (review.name || "A").charAt(0).toUpperCase() }}</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-bold text-[12px] text-[#0b2343] dark:text-white">{{ review.name }}</span>
                  <div class="flex gap-0.5 ml-auto">
                    <Star v-for="j in (review.rating || 5)" :key="j" :size="11" class="text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <p v-if="review.date" class="text-[10px] text-[#8a94a6] mb-1.5">{{ review.date }}</p>
                <p class="text-[13px] text-[#4f5b72] dark:text-gray-300 leading-relaxed">{{ review.text }}</p>
                <button class="mt-2 flex items-center gap-1 text-[11px] text-[#59657b] hover:text-[#0b2343] dark:hover:text-white transition font-medium">
                  <ThumbsUp :size="12" /> Was this helpful?
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Leave a review section -->
        <div v-if="submitted" class="mt-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
          <p class="text-[14px] font-bold text-green-700 dark:text-green-300">{{ localeStore.t("expReviews.thanks") }}</p>
        </div>
        <div v-else-if="authStore.isLoggedIn" class="mt-5 border border-[#e8ebf0] dark:border-gray-700 rounded-xl p-4">
          <h3 class="text-[13px] font-bold text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("expReviews.write") }}</h3>
          <div class="flex gap-1 mb-2">
            <button v-for="i in 5" :key="i" @click="reviewRating = i" type="button"><Star :size="18" :class="i <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200 dark:text-gray-600'" /></button>
          </div>
          <textarea v-model="reviewText" :placeholder="localeStore.t('expReviews.textPlaceholder')" class="w-full px-3 py-2 border border-[#d9dee8] dark:border-gray-600 rounded-lg text-[13px] text-[#0b2343] dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b2343]/10 focus:border-[#0b2343] resize-none transition" rows="2"></textarea>
          <button @click="handleSubmitReview" :disabled="submitting || !reviewText" class="mt-2 bg-[#0b2343] hover:bg-[#122d52] text-white text-[12px] font-bold px-4 py-1.5 rounded-lg transition disabled:opacity-50">{{ submitting ? "..." : "Submit review" }}</button>
        </div>
        <div v-else class="mt-5 text-center bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-5">
          <p class="text-[12px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("expReviews.login") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
