import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "@/AuthService"; // Import the 'auth' object

Vue.config.productionTip = false;

// Vue App Initialization
new Vue({
  router, // Set the router instance if using Vue Router
  store, // Set the Vuex store if using Vuex
  render: (h) => h(App),
  created() {
    // Listen for Firebase authentication state changes
    auth.onAuthStateChanged((user) => {
      if (user) {
        // If the user is logged in, dispatch an action to set the user in the Vuex store
        this.$store.dispatch("setUser", user);
      } else {
        // If the user is logged out, dispatch an action to clear the user from the Vuex store
        this.$store.dispatch("clearUser");
      }
    });
  },
}).$mount("#app");
