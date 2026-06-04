<script setup>
import Container from "../components/ui/Container.vue";
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/legal-notice" class="hover:text-white transition-colors">Legal Notice</router-link>
            <span class="text-blue-400/50">›</span>
            <router-link to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</router-link>
            <span class="text-blue-400/50">›</span>
            <router-link to="/general-terms-and-conditions" class="hover:text-white transition-colors">General Terms and Conditions</router-link>
            <span class="text-blue-400/50">›</span>
            <router-link to="/security" class="hover:text-white transition-colors">Security</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Information according to the Digital Services Act</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Information according to the Digital Services Act</h1>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-3xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-8 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">

            <p>The Digital Services Act ("DSA") is an EU regulation that establishes obligations for online intermediaries and platforms operating in the EU. As a marketplace platform operating in the EU, GetYourGuide is subject to requirements for verifying and displaying information about content moderation on our platform.</p>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">I. EU Monthly Active Recipients</h2>
              <p>The number of monthly active recipients of the GetYourGuide service in the European Union according to Article 24 (2) DSA, on average during the period from Dec 2025 to May 2026 was 32,191,992. GetYourGuide will update this information on a regular basis in accordance with Article 24 (2) DSA.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">II. Transparency Reporting on Content Moderation</h2>
              <p>This report is prepared and published in compliance with GetYourGuide's obligations under Articles 15, 24 and 42 of the EU's Digital Services Act (DSA). It provides insights into the content moderation activities that we engaged in during the reporting period of 2024, including the volume and nature of content removed from our platform on our own initiative. The report can be seen below:</p>

              <div class="flex flex-wrap gap-4 mt-6">
                <a
                  href="#"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-[#0b2343] text-white rounded-full text-[14px] font-semibold hover:bg-[#163d7a] transition-colors"
                >
                  GYG DSA Report 2024
                </a>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-[#0b2343] text-white rounded-full text-[14px] font-semibold hover:bg-[#163d7a] transition-colors"
                >
                  GYG DSA Report 2025
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
