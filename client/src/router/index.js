import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DestinationView from "../views/DestinationView.vue";
import ExperienceView from "../views/ExperienceView.vue";
import SearchView from "../views/SearchView.vue";
import CategoryView from "../views/CategoryView.vue";
import ThingsToDoView from "../views/ThingsToDoView.vue";
import ExperiencesView from "../views/ExperiencesView.vue";
import AttractionsView from "../views/AttractionsView.vue";
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
    component: SearchView,
  },
  {
    path: "/category/:slug",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/things-to-do",
    name: "things-to-do",
    component: ThingsToDoView,
  },
  {
    path: "/experiences",
    name: "experiences",
    component: ExperiencesView,
  },
  {
    path: "/attractions",
    name: "attractions",
    component: AttractionsView,
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
