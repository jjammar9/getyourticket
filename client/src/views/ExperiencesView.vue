<script setup>
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="[{ label: 'Experiences' }]" />
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343]">
        Experiences
      </h1>
    </div>
  </Container>
</template>
