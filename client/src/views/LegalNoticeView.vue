<script setup>
import Container from "../components/ui/Container.vue";
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <span class="text-white font-semibold">Legal Notice</span>
            <span class="text-blue-400/50">›</span>
            <router-link to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</router-link>
            <span class="text-blue-400/50">›</span>
            <a href="#" class="hover:text-white transition-colors">General Terms and Conditions</a>
            <span class="text-blue-400/50">›</span>
            <a href="#" class="hover:text-white transition-colors">Security</a>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Legal Notice</h1>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-3xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-8 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">
            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Website Host</h2>
              <p>GetYourGuide Deutschland GmbH<br>Hauptstraße 11<br>10437 Berlin, Germany</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Management</h2>
              <p>Tao Tao, Johannes Reck, Nils Chrestin</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Contact Information</h2>
              <p class="mb-2">
                <a href="https://www.getyourguide.de/contact" class="text-[#0a6cff] hover:underline">https://www.getyourguide.de/contact</a>
              </p>
              <p>
                Registered at the Local Court (Amtsgericht) Charlottenburg, HRB 132059 B<br>
                VAT ID: DE276456081<br>
                Contact email pursuant to § 5 DDG: legal@getyourticket.com.
              </p>
              <p class="mt-3">
                Single points of contact under Art. 11 and Art. 12 DSA (Regulation (EU) 2022/2065)<br>
                Authorities (Art. 11 DSA) and recipients of the service (Art. 12 DSA) can reach us at:<br>
                Email: legal@getyourticket.com.<br>
                Languages for communication with authorities: German and English.
              </p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Company Registration</h2>
              <p>Amtsgericht Charlottenburg, HRB 132059 B</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">VAT Reg No</h2>
              <p>DE276456081</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Online Dispute Resolution</h2>
              <p>
                The European Commission provides a platform for Online Dispute Resolution (ODR).<br>
                It can be found at:
                <a href="http://ec.europa.eu/consumers/odr/" class="text-[#0a6cff] hover:underline">http://ec.europa.eu/consumers/odr/</a>
              </p>
              <p class="mt-2">GetYourGuide is neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">DDTrO</h2>
              <p>
                GetYourGuide Report on Child Labor Due Diligence in Supply Chain for Business Year 2023
              </p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Accessibility</h2>
              <p>
                GetYourGuide is committed to making the GYG Platform accessible to all users; information about our accessibility standards, and how to request assistance is set out in our
                <a href="https://www.getyourguide.com/c/accessibility-statement" class="text-[#0a6cff] hover:underline"> Accessibility Statement</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
