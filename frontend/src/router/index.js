import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";
import TopGames from "../views/TopGames.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Reviews from "../views/Reviews.vue";
import NewsPage from "../views/News.vue";

const routes = [
  { path: "/", name: "News", component: NewsPage },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: Reviews,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "News",
    component: NewsPage,
  },
  {
    path: "/top-games",
    name: "TopGames",
    component: TopGames,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
