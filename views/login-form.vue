<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <h1>Login to One Origin</h1>
        <br />
        <br />
        <form @submit.prevent="login" v-if="!isLoggedIn">
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="Enter password"
            />
            <div
              v-if="password.length > 0 && password.length < 6"
              class="text-danger"
            >
              Password length should be greater than 6
            </div>
            <div v-if="loginError" class="text-danger">
              {{ loginError }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div v-else>
          <p>You are already logged in.</p>
          <router-link to="/news-dashboard" class="btn btn-primary">
            Go to Dashboard
          </router-link>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { loginWithEmailAndPassword } from "@/AuthService";

export default {
  computed: {
    ...mapState(["user"]),
    isLoggedIn() {
      return this.user !== null;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      loginError: "",
      isLoggingIn: false, // New flag to prevent duplicate login attempts
    };
  },
  methods: {
    login() {
      if (this.isLoggingIn) {
        return; // If login process is already in progress, do nothing
      }

      this.isLoggingIn = true; // Set the flag to true to prevent duplicate login attempts
      this.loginError = "";

      loginWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log("User logged in:", user);
          this.$store.commit("setUser", user);
          this.$router.push({ name: "NewsDashboard" });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.error("Login error:", errorCode);
          if (errorCode === "auth/wrong-password") {
            this.loginError = "Incorrect password. Please try again.";
          } else if (errorCode === "auth/user-not-found") {
            this.loginError = "User not found.";
          } else {
            this.loginError = "Error logging in. Please try again later.";
          }
        })
        .finally(() => {
          this.isLoggingIn = false; // Reset the flag after the login process is complete
        });
    },
  },
};
</script>

<style scoped>
/* Your custom styles here (if needed) */
</style>
