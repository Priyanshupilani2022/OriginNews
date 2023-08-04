<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- Updated navbar-brand with bigger size and custom font -->
        <router-link to="/" class="navbar-brand navbar-title">
          Origin News
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" exact>
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" class="nav-link">
                About
              </router-link>
            </li>
          </ul>
          <div class="d-flex">
            <!-- Show different buttons based on authentication status -->
            <template v-if="user">
              <!-- Logout button -->
              <button class="btn btn-danger me-2" @click="logout">Logout</button>
            </template>
            <template v-else>
              <!-- Login button -->
              <router-link to="/login" class="btn btn-outline-light me-2">
                Login
              </router-link>
              <!-- Register button -->
              <router-link to="/register" class="btn btn-success">
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Your router-view and other content here -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { logoutUser } from "@/AuthService";

export default {
  computed: {
    ...mapState(["user"]), // Get the 'user' state from Vuex store
  },
  methods: {
    // Call the logout function from AuthService and clear the user state in Vuex store
    async logout() {
      try {
        await logoutUser();
        this.$store.commit("setUser", null);
        this.$router.push({ name: "home" }); // Redirect to the home page after logout
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style>
/* Your custom styles here (if needed) */

/* CSS for the navbar customization */
.navbar {
  font-family: "Roboto", sans-serif;
}

.navbar-title {
  font-size: 36px; /* Updated font size for "Origin News" */
  font-weight: bold; /* Added bold font weight */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Shadow effect */
}

/* Optional: Customize the color and appearance of the buttons */
.btn-outline-light {
  color: #fff;
  border-color: #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #333;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

/* Dark theme styles for the entire page */
body {
  background-color: #333;
  color: #fff;
}

.container {
  background-color: #444;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.nav-link {
  color: #fff;
}

.nav-link:hover {
  color: #aaf;
}

.navbar-toggler-icon {
  filter: invert(1); /* Invert the navbar-toggler-icon color for dark background */
}

</style>
