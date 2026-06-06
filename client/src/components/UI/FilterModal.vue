<script setup>
import { ref, computed } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  visible: Boolean,
  cities: { type: Array, default: () => [] },
  places: { type: Array, default: () => [] },
});

const emit = defineEmits(["close", "apply"]);

const startTimes = ["Morning, before 12 PM", "Afternoon, after 12 PM", "Evening, after 5 PM"];

const interests = [
  "Boat cruises", "Bus tours", "Canoes & kayaks", "Dining cruises",
  "Dolphins & whales", "For kids", "Hiking", "Jeeps & 4WD",
];

const categories = [
  "Adventures", "Entry tickets", "City cards", "Guided tours",
  "Other experiences", "Day trips", "Water activities", "Hop-on hop-off tours",
];

const languages = ["English", "Chinese", "French", "German", "Italian", "Japanese", "Korean", "Portuguese"];

const durations = [
  "0-3 hours", "3-5 hours", "5-7 hours", "Full day (7+ hours)",
  "2 days", "3 days", "4 days", "5+ days",
];

const features = [
  "Wheelchair accessible", "Small group", "Private tour",
  "Hotel pickup possible", "Skip the line", "Originals by GetYourGuide",
];

const starRatings = ["3.0+", "3.5+", "4.0+", "4.5+"];

const selectedStartTime = ref([]);
const selectedPlaces = ref([]);
const selectedInterests = ref([]);
const selectedCategories = ref([]);
const priceMin = ref(null);
const priceMax = ref(null);
const currency = ref("EUR");
const selectedLanguages = ref([]);
const selectedDuration = ref([]);
const selectedFeatures = ref([]);
const selectedDeparts = ref([]);
const selectedStarRating = ref("");

function toggle(arr, value) {
  const idx = arr.value.indexOf(value);
  if (idx === -1) arr.value.push(value);
  else arr.value.splice(idx, 1);
}

function toggleRadio(val) {
  selectedStarRating.value = selectedStarRating.value === val ? "" : val;
}

function resetAll() {
  selectedStartTime.value = [];
  selectedPlaces.value = [];
  selectedInterests.value = [];
  selectedCategories.value = [];
  priceMin.value = null;
  priceMax.value = null;
  currency.value = "EUR";
  selectedLanguages.value = [];
  selectedDuration.value = [];
  selectedFeatures.value = [];
  selectedDeparts.value = [];
  selectedStarRating.value = "";
}

function applyFilters() {
  emit("apply", {
    startTime: selectedStartTime.value,
    places: selectedPlaces.value,
    interests: selectedInterests.value,
    categories: selectedCategories.value,
    priceMin: priceMin.value,
    priceMax: priceMax.value,
    currency: currency.value,
    languages: selectedLanguages.value,
    duration: selectedDuration.value,
    features: selectedFeatures.value,
    departs: selectedDeparts.value,
    starRating: selectedStarRating.value,
  });
  emit("close");
}

</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[100]">
      <div class="fixed inset-0 bg-black/50" @click="emit('close')"></div>
      <div class="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div
          class="relative bg-white w-full max-w-[900px] max-h-[90vh] flex flex-col rounded-[16px] shadow-2xl overflow-hidden pointer-events-auto"
          @click.stop
      >
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 class="text-[20px] font-bold text-[#0b2343]">Filters</h2>
          <button
            @click="emit('close')"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Start time</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="t in startTimes"
                  :key="t"
                  @click="toggle(selectedStartTime, t)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedStartTime.includes(t) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ t }}</button>
              </div>
            </div>

            <div v-if="places.length > 0">
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Places</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="p in places"
                  :key="p"
                  @click="toggle(selectedPlaces, p)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedPlaces.includes(p) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ p }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Interests</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in interests"
                  :key="item"
                  @click="toggle(selectedInterests, item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedInterests.includes(item) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Categories</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in categories"
                  :key="item"
                  @click="toggle(selectedCategories, item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedCategories.includes(item) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Price</h3>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-gray-500 text-[13px]">Min. price</span>
                <div class="relative flex-1">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">&euro;</span>
                  <input
                    v-model.number="priceMin"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full border border-gray-300 rounded-full px-7 py-2 text-[13px] outline-none focus:border-[#0b2343]"
                  />
                </div>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-gray-500 text-[13px]">Max. price</span>
                <div class="relative flex-1">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">&euro;</span>
                  <input
                    v-model.number="priceMax"
                    type="number"
                    min="0"
                    placeholder="999"
                    class="w-full border border-gray-300 rounded-full px-7 py-2 text-[13px] outline-none focus:border-[#0b2343]"
                  />
                </div>
              </div>
              <p class="text-gray-400 text-[12px] mt-1">Displayed in</p>
              <select
                v-model="currency"
                class="mt-1 border border-gray-300 rounded-full px-3.5 py-2 text-[13px] outline-none focus:border-[#0b2343] bg-white w-full"
              >
                <option value="EUR">&euro; EUR</option>
                <option value="USD">$ USD</option>
                <option value="GBP">&pound; GBP</option>
                <option value="CAD">C$ CAD</option>
                <option value="AUD">A$ AUD</option>
              </select>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Languages</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in languages"
                  :key="item"
                  @click="toggle(selectedLanguages, item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedLanguages.includes(item) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Duration</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in durations"
                  :key="item"
                  @click="toggle(selectedDuration, item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedDuration.includes(item) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Features</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in features"
                  :key="item"
                  @click="toggle(selectedFeatures, item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedFeatures.includes(item) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>

            <div v-if="places.length > 0">
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Departs from</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="p in places"
                  :key="p"
                  @click="toggle(selectedDeparts, p)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedDeparts.includes(p) ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ p }}</button>
              </div>
            </div>

            <div>
              <h3 class="text-[15px] font-bold text-[#0b2343] mb-3">Star rating</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in starRatings"
                  :key="item"
                  @click="toggleRadio(item)"
                  class="text-[13px] px-3.5 py-2 rounded-full border transition-colors cursor-pointer"
                  :class="selectedStarRating === item ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'"
                >{{ item }}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 px-6 py-4 shrink-0">
          <div class="flex items-center justify-end gap-4">
            <button
              @click="resetAll"
              class="text-[14px] text-gray-500 underline hover:text-gray-700 transition-colors cursor-pointer"
            >Reset all</button>
            <button
              @click="applyFilters"
              class="bg-[#0a6cff] text-white font-semibold text-[14px] px-6 py-2.5 rounded-full hover:bg-[#0057d8] transition-colors cursor-pointer"
            >Show results</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </Teleport>
</template>
