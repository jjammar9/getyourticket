import { defineStore } from "pinia";
import { ref } from "vue";

export const useBookingStore = defineStore("booking", () => {
  const bookings = ref([]);
  const toast = ref(null);
  let toastTimer = null;

  function addBooking(experience) {
    bookings.value.push({ ...experience, bookedAt: new Date().toISOString() });
    showToast(`"${experience.title}" added to cart!`);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.value = message;
    toastTimer = setTimeout(() => {
      toast.value = null;
    }, 3000);
  }

  function dismissToast() {
    clearTimeout(toastTimer);
    toast.value = null;
  }

  return { bookings, toast, addBooking, dismissToast };
});
