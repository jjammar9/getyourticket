import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DestinationView from "../views/DestinationView.vue";
import ExperienceView from "../views/ExperienceView.vue";
import SearchView from "../views/SearchView.vue";
import CategoryView from "../views/CategoryView.vue";
import ThingsToDoView from "../views/ThingsToDoView.vue";
import ExperiencesView from "../views/ExperiencesView.vue";
import AttractionsView from "../views/AttractionsView.vue";
import AboutView from "../views/AboutView.vue";
import SupportView from "../views/SupportView.vue";
import LegalNoticeView from "../views/LegalNoticeView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import GeneralTermsView from "../views/GeneralTermsView.vue";
import DigitalServicesActView from "../views/DigitalServicesActView.vue";
import SecurityView from "../views/SecurityView.vue";
import SitemapView from "../views/SitemapView.vue";
import WishlistListView from "../views/WishlistListView.vue";
import CountryView from "../views/CountryView.vue";
import CareersView from "../views/CareersView.vue";
import BlogView from "../views/BlogView.vue";
import MediaView from "../views/MediaView.vue";
import DownloadCenterView from "../views/DownloadCenterView.vue";
import ExplorerView from "../views/ExplorerView.vue";
import SupplyPartnerView from "../views/SupplyPartnerView.vue";
import ContentCreatorView from "../views/ContentCreatorView.vue";
import AffiliatePartnerView from "../views/AffiliatePartnerView.vue";
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
    path: "/support",
    name: "support",
    component: SupportView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/legal-notice",
    name: "legal-notice",
    component: LegalNoticeView,
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicyView,
  },
  {
    path: "/general-terms-and-conditions",
    name: "general-terms",
    component: GeneralTermsView,
  },
  {
    path: "/digital-services-act",
    name: "digital-services-act",
    component: DigitalServicesActView,
  },
  {
    path: "/security",
    name: "security",
    component: SecurityView,
  },
  {
    path: "/sitemap",
    name: "sitemap",
    component: SitemapView,
  },
  {
    path: "/country/:slug",
    name: "country",
    component: CountryView,
  },
  {
    path: "/careers",
    name: "careers",
    component: CareersView,
  },
  {
    path: "/news",
    name: "news",
    component: BlogView,
  },
  {
    path: "/media",
    name: "media",
    component: MediaView,
  },
  {
    path: "/download-center",
    name: "download-center",
    component: DownloadCenterView,
  },
  {
    path: "/explorer",
    name: "explorer",
    component: ExplorerView,
  },
  {
    path: "/supply-partner",
    name: "supply-partner",
    component: SupplyPartnerView,
  },
  {
    path: "/content-creator",
    name: "content-creator",
    component: ContentCreatorView,
  },
  {
    path: "/affiliate-partner",
    name: "affiliate-partner",
    component: AffiliatePartnerView,
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () => import("../views/WishlistView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/wishlist/:id",
    name: "wishlist-list",
    component: WishlistListView,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/bookings",
    name: "bookings",
    component: () => import("../views/BookingsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
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
  scrollBehavior() {
    return { top: 0 };
  },
});
