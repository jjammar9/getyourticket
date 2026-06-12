import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBookingStore = defineStore("booking", () => {
  let parsed = [];
  try {
    const saved = localStorage.getItem("cart_bookings");
    if (saved) parsed = JSON.parse(saved);
  } catch { parsed = []; }
  const bookings = ref(parsed);
  const toast = ref(null);
  let toastTimer = null;

  function persist() {
    localStorage.setItem("cart_bookings", JSON.stringify(bookings.value));
  }

  function addBooking(experience) {
    const existing = bookings.value.findIndex((b) => b && b.id === experience.id);
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

  const cartCount = computed(() => bookings.value.length);

  return { bookings, toast, addBooking, dismissToast, clearCart, cartCount };
});
