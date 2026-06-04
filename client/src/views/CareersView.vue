<script setup>
import Container from "../components/ui/Container.vue";

const jobs = [
  { title: "Senior Software Engineer", department: "Engineering", location: "Berlin, Germany" },
  { title: "Frontend Developer (Vue.js)", department: "Engineering", location: "Zurich, Switzerland" },
  { title: "Backend Engineer (Go)", department: "Engineering", location: "Remote - EMEA" },
  { title: "Data Scientist", department: "Data", location: "Berlin, Germany" },
  { title: "Machine Learning Engineer", department: "Data", location: "Berlin, Germany" },
  { title: "Product Manager", department: "Product", location: "Berlin, Germany" },
  { title: "UX Designer", department: "Design", location: "London, UK" },
  { title: "UI Designer", department: "Design", location: "Berlin, Germany" },
  { title: "Legal Counsel", department: "Legal", location: "Zurich, Switzerland" },
  { title: "Privacy & Compliance Manager", department: "Legal", location: "Berlin, Germany" },
  { title: "Travel Operations Manager", department: "Operations", location: "Barcelona, Spain" },
  { title: "Supplier Relations Specialist", department: "Operations", location: "Paris, France" },
  { title: "Marketing Manager (SEO)", department: "Marketing", location: "Berlin, Germany" },
  { title: "Social Media Strategist", department: "Marketing", location: "London, UK" },
  { title: "Customer Support Team Lead", department: "Support", location: "Lisbon, Portugal" },
  { title: "Customer Support Specialist (English/German)", department: "Support", location: "Lisbon, Portugal" },
  { title: "Business Development Manager", department: "Business Development", location: "Milan, Italy" },
  { title: "Account Manager - Travel Partners", department: "Partnerships", location: "Amsterdam, Netherlands" },
  { title: "Finance Analyst", department: "Finance", location: "Zurich, Switzerland" },
  { title: "HR Business Partner", department: "People & Culture", location: "Berlin, Germany" },
  { title: "Content Writer (Travel)", department: "Content", location: "Remote - EMEA" },
  { title: "QA Engineer", department: "Engineering", location: "Warsaw, Poland" },
  { title: "DevOps / Site Reliability Engineer", department: "Engineering", location: "Berlin, Germany" },
];
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <router-link to="/about" class="hover:text-white transition-colors">About</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Careers</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Join our team</h1>
          <p class="mt-3 text-[15px] text-blue-200">Help us connect millions of travelers with unforgettable experiences around the world.</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-3xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-3">
            <div
              v-for="(job, index) in jobs"
              :key="index"
              class="flex items-center justify-between px-6 py-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div>
                <h3 class="text-[16px] font-semibold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">{{ job.title }}</h3>
                <p class="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-[family-name:var(--font-body)]">
                  {{ job.department }} &middot; {{ job.location }}
                </p>
              </div>
              <span class="text-[#0a6cff] text-[14px] font-semibold font-[family-name:var(--font-body)] whitespace-nowrap">
                Apply now &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
