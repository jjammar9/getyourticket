import { computed } from "vue";
import { experiencesData } from "../data/experiencesData.js";
import { countries } from "../data/countryData.js";

const allSuggestions = [];

const seen = new Set();
for (const exp of experiencesData) {
  const location = exp.location?.trim();
  if (location && !seen.has(location)) {
    seen.add(location);
    allSuggestions.push({ text: location, type: "location" });
  }
  const title = exp.title?.trim();
  if (title && !seen.has(title)) {
    seen.add(title);
    allSuggestions.push({ text: title, type: "activity" });
  }
  const category = exp.category?.trim();
  if (category && !seen.has(category)) {
    seen.add(category);
    allSuggestions.push({ text: category, type: "category" });
  }
}

for (const [slug, country] of Object.entries(countries)) {
  const name = country.name?.trim();
  if (name && !seen.has(name)) {
    seen.add(name);
    allSuggestions.push({ text: name, type: "country", slug });
  }
}

export function useSearchSuggestions(searchTerm) {
  const suggestions = computed(() => {
    const q = searchTerm.value?.toLowerCase().trim() ?? "";
    if (!q || q.length < 1) return [];
    return allSuggestions
      .filter((s) => s.text.toLowerCase().includes(q))
      .slice(0, 8);
  });

  return { suggestions };
}
