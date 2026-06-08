import { defineStore } from "pinia";
import { ref } from "vue";

export const useBookingStore = defineStore("booking", () => {
  const saved = localStorage.getItem("cart_bookings");
  const bookings = ref(saved ? JSON.parse(saved) : []);
  const toast = ref(null);
  let toastTimer = null;

  function persist() {
    localStorage.setItem("cart_bookings", JSON.stringify(bookings.value));
  }

  function addBooking(experience) {
    const existing = bookings.value.findIndex((b) => b.id === experience.id);
    if (existing === -1) {
      bookings.value.push({ ...experience, guests: 1, bookedAt: new Date().toISOString() });
      persist();
    }
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

  function clearCart() {
    bookings.value = [];
    localStorage.removeItem("cart_bookings");
  }

  return { bookings, toast, addBooking, dismissToast, clearCart };
});
