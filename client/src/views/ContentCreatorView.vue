<script setup>
import Container from "../components/ui/Container.vue";
import { onMounted } from "vue";
onMounted(() => { document.title = "Become a Content Creator - GetYourTicket"; });
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-3xl mx-auto">
          <h1 class="text-[36px] md:text-[44px] font-bold tracking-[-0.5px]">Become a Content Creator</h1>
          <p class="text-blue-200 text-[16px] mt-3 max-w-2xl leading-relaxed">Turn your passion for travel into revenue. Partner with GetYourGuide to create inspiring content that reaches millions of travelers worldwide.</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-3xl mx-auto -mt-8 relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 md:p-10">
          <div class="space-y-8 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">

            <section>
              <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-4">Why Collaborate With Us?</h2>
              <p>GetYourGuide partners with content creators who are passionate about travel and experienced in producing engaging content. Whether you're a blogger, vlogger, photographer, or social media influencer, we provide opportunities to monetize your audience while sharing amazing travel experiences.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Monetize Your Content</h2>
              <p>Earn competitive commissions by promoting GetYourGuide's extensive catalog of tours, activities, and attractions. Every time your audience books through your unique links or discount codes, you earn a share of the revenue. The more you promote, the more you earn.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Access to Exclusive Experiences</h2>
              <p>As a GetYourGuide content creator, you may qualify for complimentary or discounted tours and activities. This allows you to create authentic, first-hand content that resonates with your audience and drives engagement.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Creative Freedom</h2>
              <p>We believe in authentic content. You retain full creative control over how you showcase GetYourGuide experiences. Whether you prefer blog posts, Instagram stories, YouTube videos, or TikTok clips, we support your unique style and vision.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Dedicated Partner Management</h2>
              <p>Our team works closely with content creators to provide personalized support, campaign ideas, and performance insights. We help you optimize your content strategy to maximize engagement and earnings.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-3">Real-Time Analytics</h2>
              <p>Track your performance with our real-time analytics dashboard. See exactly how your content is performing, which destinations resonate most with your audience, and optimize your strategy accordingly.</p>
            </section>

            <section>
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-4">Join the Program</h2>
              <p>Ready to start creating and earning? Apply to our content creator program today. We welcome creators of all sizes who are passionate about travel and committed to producing high-quality, engaging content.</p>
              <div class="mt-6">
                <a href="/support" class="inline-block bg-[#0a6cff] text-white font-semibold text-[15px] px-8 py-3 rounded-full hover:bg-[#0057d8] transition-colors">Apply as a creator</a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
