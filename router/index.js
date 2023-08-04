import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/login-form.vue"; // Changed to "Login" with PascalCase
import Register from "../views/register.vue"; // Added path for Register
import NewsDashboard from "../views/NewsDashboard.vue";
import { auth } from "@/AuthService"; // Corrected import path

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/news-dashboard",
    name: "NewsDashboard",
    component: NewsDashboard,
    meta: {
      requiresAuth: true, // Add this meta field to indicate that this route requires authentication
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Navigation guard to check if the user is authenticated before accessing a protected route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (auth.currentUser) {
      // User is authenticated, allow access to the route
      next();
    } else {
      // User is not authenticated, redirect to the login page
      next({ name: "Login" });
    }
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router;
