<template>
  <div class="container">
    <h1>Register to One Origin</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="fullName"
            required
            placeholder="Full Name"
          />
        </div>
        <div class="form-group">
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
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            @change="checkPasswordMatch"
            required
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="reenterPassword"
            v-model="reenterPassword"
            @change="checkPasswordMatch"
            required
            placeholder="Reenter Password"
          />
          <div v-if="password !== reenterPassword" class="text-danger">
            Passwords don't match
          </div>
        </div>
        <br />
        <button @click="register" class="btn-lg btn-primary">Register</button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "@/AuthService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "register",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      reenterPassword: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.reenterPassword) {
        console.error("Passwords don't match");
        return;
      }

      createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log("User registered:", user);
          this.$store.commit("setUser", user);
          this.$router.push({ name: "NewsDashboard" });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Registration error:", errorMessage);
        });
    },

    checkPasswordMatch() {
      if (this.password !== this.reenterPassword) {
        console.error("Passwords don't match");
      }
    },
  },
};
</script>

<style scoped>
/* Your custom styles here (if needed) */
</style>
