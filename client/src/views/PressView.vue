<script setup>
import Container from "../components/ui/Container.vue";

const releases = [
  {
    title: "GetYourGuide Announces Record-Breaking $500 Million Funding Round",
    date: "June 2, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Launches 'Originals' Collection of Exclusive Experiences",
    date: "May 15, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Partners with Leading Airlines for Seamless Travel Booking",
    date: "April 28, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Reaches 200 Million Tickets Sold Milestone",
    date: "April 10, 2026",
    type: "Press Release",
  },
  {
    title: "New AI-Powered Recommendation Engine Enhances Trip Planning",
    date: "March 22, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Expands to 50 New Cities Across Asia Pacific",
    date: "March 5, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Named Top Travel Tech Company by Fast Company",
    date: "February 18, 2026",
    type: "Award",
  },
  {
    title: "Sustainability Initiative: GetYourGuide Commits to Carbon-Neutral Tours by 2030",
    date: "February 1, 2026",
    type: "Press Release",
  },
  {
    title: "GetYourGuide Appoints New Chief Technology Officer",
    date: "January 15, 2026",
    type: "Press Release",
  },
  {
    title: "Winter Travel Report: Top Destinations and Trends for 2026",
    date: "January 5, 2026",
    type: "Report",
  },
  {
    title: "GetYourGuide Acquires Local Tour Operator Platform TripGalaxy",
    date: "December 12, 2025",
    type: "Press Release",
  },
  {
    title: "Holiday Campaign: GetYourGuide Partners with UNICEF for Giving Tuesday",
    date: "November 28, 2025",
    type: "Press Release",
  },
];

const mediaContact = {
  name: "Sarah Mitchell",
  title: "Head of Communications",
  email: "press@getyourticket.com",
  phone: "+49 30 1234 5678",
};
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Press</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Press</h1>
          <p class="mt-3 text-[15px] text-blue-200">Latest news, announcements, and media resources from GetYourGuide.</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-4xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-1">
            <div
              v-for="(item, index) in releases"
              :key="index"
              class="flex items-center justify-between px-5 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer -mx-2"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3">
                  <span class="text-[11px] font-semibold text-[#0a6cff] uppercase tracking-wider whitespace-nowrap">{{ item.type }}</span>
                  <h3 class="text-[15px] font-semibold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)] truncate">
                    {{ item.title }}
                  </h3>
                </div>
              </div>
              <span class="text-[13px] text-gray-400 dark:text-gray-500 font-[family-name:var(--font-body)] whitespace-nowrap ml-4">{{ item.date }}</span>
            </div>
          </div>

          <div class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-[16px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Media Contact</h3>
            <p class="mt-2 text-[14px] text-gray-600 dark:text-gray-400 font-[family-name:var(--font-body)]">
              {{ mediaContact.name }}<br>
              {{ mediaContact.title }}<br>
              <a :href="'mailto:' + mediaContact.email" class="text-[#0a6cff] hover:underline">{{ mediaContact.email }}</a><br>
              {{ mediaContact.phone }}
            </p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
