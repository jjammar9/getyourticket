import { ref } from "vue";

const searchQuery = ref("");

export function useNavSearch() {
  function setSearchQuery(q) {
    searchQuery.value = q;
  }

  return { searchQuery, setSearchQuery };
}
