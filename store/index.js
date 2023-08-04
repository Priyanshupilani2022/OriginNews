import Vue from "vue";
import Vuex from "vuex";
import { auth, loginWithEmailAndPassword, logoutUser } from "@/AuthService"; // Update import to use logoutUser

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null, // Store the user object or null if not authenticated
  },
  getters: {
    // Getter to check if the user is authenticated
    isAuthenticated: (state) => {
      return state.user !== null;
    },
  },
  mutations: {
    // Mutation to set the user state when the user logs in or out
    setUser(state, user) {
      state.user = user;
    },
    // Mutation to clear the user state when the user logs out
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    // Action to check if the user is authenticated on app load
    async checkAuthState({ commit }) {
      try {
        // Get the current user from Firebase auth state
        auth.onAuthStateChanged((user) => {
          commit("setUser", user); // Set the user in the store
        });
      } catch (error) {
        console.error("Error checking auth state:", error);
      }
    },
    // Action to log in the user
    async loginUser({ commit }, { email, password }) {
      try {
        const user = await loginWithEmailAndPassword(email, password);
        commit("setUser", user); // Set the user in the store
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
    // Action to log out the user
    async logoutUser({ commit }) {
      try {
        await logoutUser(); // Use the correct function name
        commit("clearUser"); // Clear the user from the store
      } catch (error) {
        console.error("Error logging out:", error);
        throw error;
      }
    },
  },
});
