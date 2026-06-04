<script setup>
import Container from "../components/ui/Container.vue";
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="relative h-[70vh] sm:h-[75vh] lg:h-[85vh] bg-cover bg-center flex items-center justify-center"
      style="background-image: url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1920&q=80');"
    >
      <div class="absolute inset-0 bg-black/40" />

      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-[-1.5px] leading-tight">
          Make memories
        </h1>
      </div>
    </section>

    <section class="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div class="w-[60%] mx-auto">
          <h3 class="text-[18px] font-semibold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Unforgettable travel experiences</h3>
          <p class="mt-2 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            No matter where your travels take you, GetYourGuide offers the best way to connect with your destination. Make memories all over the globe with our locally-vetted, expertly-curated experiences. From must-see iconic attractions to unexpected under-the-radar gems, we have something for everyone.
          </p>

          <a
            href="https://www.youtube.com/watch?v=QWrpx-lb1zw"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 block relative group overflow-hidden shadow-lg"
          >
            <img
              src="https://img.youtube.com/vi/QWrpx-lb1zw/maxresdefault.jpg"
              alt="GetYourGuide video"
              class="w-full h-auto aspect-video object-cover"
            />
            <div class="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <svg class="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 68 48" fill="none">
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
                <path d="M45 24L27 14v20" fill="white"/>
              </svg>
            </div>
            <span class="absolute bottom-3 right-3 px-4 py-2 text-white text-[15px] font-semibold">
              Watch on Youtube
            </span>
          </a>

          <h3 class="mt-12 text-[20px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Maximize your trip</h3>
          <p class="mt-1 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            We take the stress out of trip planning. Access everything in our app so you can focus on enjoying the moment, not taking care of logistics. Explore what you want to do, then count on our flexible policies and 24/7, multilingual customer support whenever you need.
          </p>

          <h3 class="mt-10 text-[20px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Find the best sights</h3>
          <p class="mt-1 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            Choose from over 150,000 experiences in 12,000 cities, including hard-to-book attractions and easy-to-miss surprises. With insights from like-minded travelers and millions of verified reviews, you'll find the tips and insights you need to have an unforgettable experience.
          </p>

          <blockquote class="mt-10 border-l-4 border-[#0b2343] pl-5">
            <p class="text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium italic">
              "The food was delicious, but learning about the neighborhood from our passionate guide really made this tour unforgettable."
            </p>
            <footer class="mt-2 text-[14px] text-gray-600 dark:text-gray-400 font-[family-name:var(--font-body)]">
              Will | Amsterdam: Authentic Food Tasting Tour of Jordaan
            </footer>
          </blockquote>

          <img
            src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt64519094deef848a/65118640b16d6dd590553098/about_us_market.png?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080"
            alt="GetYourGuide market"
            class="mt-10 w-full h-auto"
          />

          <h3 class="mt-12 text-[20px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Plan ahead or be spontaneous</h3>
          <p class="mt-1 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            We've sold over 200 million tickets to the world's travelers. From last-minute decisions to months-in-advance planning, you can travel how you need. Book in advance when you can, and even if your plans change, enjoy free cancellation up to 24 hours in advance, no questions asked.
          </p>

          <blockquote class="mt-10 border-l-4 border-[#0b2343] pl-5">
            <p class="text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium italic">
              "Reaching the summit just as golden hour began was the highlight for me. I'll remember that sunset over the city skyline forever."
            </p>
            <footer class="mt-2 text-[14px] text-gray-600 dark:text-gray-400 font-[family-name:var(--font-body)]">
              Lauren | London: Climb The Roof of The 02 Arena
            </footer>
          </blockquote>

          <img
            src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltf79a33e1ad2c39a4/6511862ea5f15db72afc62bc/about_us_museum.png?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080"
            alt="GetYourGuide museum"
            class="mt-10 w-full h-auto"
          />

          <h3 class="mt-12 text-[20px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Originals by GetYourGuide</h3>
          <p class="mt-1 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            Experience the world more deeply with Originals by GetYourGuide, a collection of our most immersive and unforgettable experiences yet. Unlock the door to the Sistine Chapel before anyone else is allowed inside, dig into hidden restaurants on a tour led by your favorite Instagram foodie, or step onto the playing field and behind the scenes with sports legends.
          </p>

          <h3 class="mt-12 text-[20px] font-bold text-[#0b2343] dark:text-white font-[family-name:var(--font-display)]">Our journey so far</h3>
          <p class="mt-1 text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 font-[family-name:var(--font-body)] font-medium">
            Opening the world to everyone is at the heart of GetYourGuide. Founded by classmates Johannes, Tao, Martin, and Tobias in 2009, a travel mix-up sparked a revolutionary approach to tourism. When Johannes landed a day early in Beijing, he spent his time wandering the streets, not knowing where to go or what to do. It wasn't until Tao arrived on the scene to act as a local guide that the duo was able to experience their destination fully. Back in Zurich, with a defined vision for the future, our founders decided to change the world of travel. The             result? A platform that gathers the best activities across the globe, all in one place.
          </p>

          <div class="mt-10 text-center">
            <a
              href="/careers"
              target="_blank"
              class="inline-block px-8 py-3 bg-[#0a6cff] text-white text-[15px] font-semibold rounded-full font-[family-name:var(--font-body)] hover:bg-[#0057d8] transition-colors"
            >
              Join our team
            </a>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>
