<template>
  <div>
    <form @submit.prevent="authenticate">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button @click="switchAuthMode" type="button">{{
        switchCaption
      }}</base-button>
    </form>
    <div v-if="isLoading">Loading, should be very quick</div>
    <div v-else-if="!isLoading && error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
    redirectLink() {
      console.log("this.$route.params: ", this.$route.params);
      if (this.$route.query.redirect === "register") {
        return "/register";
      } else {
        return "/coaches";
      }
    },
  },
  methods: {
    authenticate() {
      this.isLoading = true;
      try {
        this.$store
          .dispatch("auth", {
            email: this.email,
            password: this.password,
            mode: this.mode,
          })
          .then(this.navigateToCoaches);
      } catch (error) {
        console.log("error: ", error);
        this.error =
          error.message || "Failed to authenticate, better luck next time!";
      }

      // this.error = "Hello Test";
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    navigateToCoaches() {
      this.$router.replace(this.redirectLink);
    },
  },
  created() {
    console.log("this.route.query: ", this.$route.query);
  },
};
</script>

<style scoped>
form {
  margin-top: 16px;
}

#tags-container input {
  width: inherit;
  margin-right: 16px;
}

.form-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

input {
  width: 200px;
}

.invalid input {
  border-color: red;
}

.invalid label {
  color: red;
}
</style>
