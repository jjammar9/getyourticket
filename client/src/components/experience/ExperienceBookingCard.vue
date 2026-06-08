<script setup>
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const currencyStore = useCurrencyStore();
const localeStore = useLocaleStore();

defineProps({
  experience: {
    type: Object,
    required: true,
  },
  guests: {
    type: Number,
    default: 1,
  },
  selectedDate: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["book", "update:guests", "update:selectedDate"]);
</script>

<template>
  <div
    class="sticky top-8 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm bg-white dark:bg-gray-800"
  >
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-[13px] font-semibold text-gray-500 mb-1">{{ localeStore.t("exp.date") || "Date" }}</label>
          <input
            type="date"
            :value="selectedDate"
            @input="emit('update:selectedDate', $event.target.value)"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2343]"
          />
        </div>
        <div>
          <label class="block text-[13px] font-semibold text-gray-500 mb-1">{{ localeStore.t("exp.guests") || "Guests" }}</label>
          <input
            type="number"
            min="1"
            :value="guests"
            @input="emit('update:guests', Number($event.target.value))"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2343]"
          />
        </div>
      </div>

      <p
        v-if="experience.oldPrice"
        class="text-[16px] text-gray-400 line-through"
      >
        {{ currencyStore.formatPrice(experience.oldPrice) }}
      </p>

      <p class="text-[52px] font-black leading-none text-[#e53935]">
        {{ currencyStore.formatPrice(experience.price) }}
      </p>

      <p class="mt-2 text-gray-500 dark:text-gray-400">{{ localeStore.t("exp.perPerson") }}</p>

      <button
        @click="emit('book', experience)"
        class="w-full mt-8 bg-[#0b2343] hover:bg-[#081a33] text-white font-bold py-4 rounded-2xl transition"
      >
        {{ localeStore.t("exp.bookNow") }}
      </button>

      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        <p>{{ localeStore.t("exp.freeCancel") }}</p>
        <p class="mt-2">{{ localeStore.t("exp.reserveNow") }}</p>
        <p class="mt-2">{{ localeStore.t("exp.instantConfirm") }}</p>
    </div>
  </div>
</template>
