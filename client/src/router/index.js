// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DestinationView from "../views/DestinationView.vue";
import ExperienceView from "../views/ExperienceView.vue";
import SearchResultsView from "../views/SearchResultsView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/destination/:slug",
    name: "destination",
    component: DestinationView,
  },
  {
    path: "/experience/:id",
    name: "experience",
    component: ExperienceView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchResultsView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
