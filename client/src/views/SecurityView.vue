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
            <span class="text-white font-semibold">Security</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Security</h1>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-3xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-8 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">

            <p>GetYourGuide takes the security of your personal data and payment information very seriously. We implement a range of technical and organizational measures to protect your information against unauthorized access, loss, or misuse.</p>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Secure Payments</h2>
              <p>All payment transactions on the GetYourGuide Platform are processed using industry-standard encryption technologies. We use Secure Socket Layer (SSL) encryption to protect your payment information during transmission. Your credit card details are never stored on our servers — they are securely processed by our payment service providers.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Account Security</h2>
              <p>We recommend the following practices to keep your GetYourGuide account secure:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Use a strong, unique password for your GetYourGuide account</li>
                <li>Never share your login credentials with anyone</li>
                <li>Log out of your account on shared or public devices</li>
                <li>Enable two-factor authentication if available</li>
                <li>Contact us immediately if you suspect unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Data Encryption</h2>
              <p>All data transmitted between your device and the GetYourGuide Platform is encrypted using TLS (Transport Layer Security) technology. This ensures that any information you submit — including personal details and payment data — remains confidential and protected from interception.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Fraud Prevention</h2>
              <p>We employ advanced fraud detection systems to monitor transactions and identify suspicious activity. Our systems analyze booking patterns and payment behavior to detect and prevent fraudulent transactions. If a potentially fraudulent transaction is detected, we may temporarily block the booking and contact you for verification.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Third-Party Security</h2>
              <p>We carefully vet all third-party service providers who handle personal data on our behalf. Our partners are contractually obligated to maintain strict security standards and comply with applicable data protection regulations.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Reporting Security Issues</h2>
              <p>If you discover a security vulnerability or have concerns about the security of the GetYourGuide Platform, please contact our security team at security@getyourguide.com. We take all reports seriously and will respond promptly.</p>
            </section>

          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
