<script setup>
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";

const localeStore = useLocaleStore();

const emit = defineEmits(["close", "apply"]);

const now = new Date();
const currentMonth = ref(now.getMonth());
const currentYear = ref(now.getFullYear());
const selectedDate = ref(null);

const todayStr = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
});

const tomorrowStr = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  const d = new Date(currentYear.value, currentMonth.value, 1);
  let day = d.getDay();
  return day === 0 ? 6 : day - 1;
});

const calendarDays = computed(() => {
  const days = [];
  const total = daysInMonth.value;
  const startOffset = firstDayOfMonth.value;
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }
  for (let i = 1; i <= total; i++) {
    days.push(i);
  }
  return days;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function isToday(day) {
  if (!day) return false;
  const d = new Date();
  return d.getDate() === day && d.getMonth() === currentMonth.value && d.getFullYear() === currentYear.value;
}

function isSelected(day) {
  if (!day || !selectedDate.value) return false;
  return selectedDate.value === `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function selectDate(dateStr) {
  selectedDate.value = dateStr;
}

function selectToday() {
  selectedDate.value = todayStr.value;
}

function selectTomorrow() {
  selectedDate.value = tomorrowStr.value;
}

function clearDate() {
  selectedDate.value = null;
}

function applyDate() {
  emit("apply", selectedDate.value);
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100]">
      <div class="fixed inset-0 bg-black/50" @click="emit('close')"></div>
      <div class="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div class="relative bg-white w-full max-w-[420px] rounded-[16px] shadow-2xl overflow-hidden pointer-events-auto" @click.stop>
          <div class="px-6 pt-6 pb-4 flex gap-3">
            <button @click="selectToday" class="flex-1 text-[14px] font-semibold py-2.5 rounded-full border transition-colors cursor-pointer" :class="selectedDate === todayStr ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'">{{ localeStore.t("date.today") }}</button>
            <button @click="selectTomorrow" class="flex-1 text-[14px] font-semibold py-2.5 rounded-full border transition-colors cursor-pointer" :class="selectedDate === tomorrowStr ? 'bg-[#0b2343] text-white border-[#0b2343]' : 'border-gray-300 text-gray-700 hover:border-gray-400'">{{ localeStore.t("date.tomorrow") }}</button>
          </div>
          <div class="px-6 pb-2">
            <div class="flex items-center justify-between mb-4">
              <button @click="prevMonth" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"><ChevronLeft class="w-4 h-4 text-gray-600" /></button>
              <span class="text-[15px] font-bold text-[#0b2343]">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
              <button @click="nextMonth" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"><ChevronRight class="w-4 h-4 text-gray-600" /></button>
            </div>
            <div class="grid grid-cols-7 gap-1 mb-1">
              <div v-for="d in dayNames" :key="d" class="text-center text-[12px] text-gray-400 font-medium py-1">{{ d }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1">
              <template v-for="(day, idx) in calendarDays" :key="idx">
                <div v-if="day === null" class="h-9"></div>
                <button v-else @click="selectDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)" class="h-9 text-[13px] rounded-full transition-colors cursor-pointer" :class="[isSelected(day) ? 'bg-[#0b2343] text-white font-bold' : isToday(day) ? 'bg-gray-100 text-[#0b2343] font-bold' : 'text-gray-700 hover:bg-gray-100']">{{ day }}</button>
              </template>
            </div>
          </div>
          <div class="border-t border-gray-200 px-6 py-4 mt-3">
            <div class="flex items-center justify-end gap-4">
              <button @click="clearDate" class="text-[14px] text-gray-500 underline hover:text-gray-700 transition-colors cursor-pointer">{{ localeStore.t("date.clear") }}</button>
              <button @click="applyDate" class="bg-[#0a6cff] text-white font-semibold text-[14px] px-6 py-2.5 rounded-full hover:bg-[#0057d8] transition-colors cursor-pointer">{{ localeStore.t("date.showResults") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
