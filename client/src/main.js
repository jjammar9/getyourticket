import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./style.css";

import { vScrollFade } from "./composables/useScrollAnimation.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive("scroll-fade", vScrollFade);

app.mount("#app");
