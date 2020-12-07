<template>
  <h3>Register as a Coach:</h3>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="first-name">First Name:</label>
      <input type="text" id="first-name" v-model="firstName" />
    </div>
    <div class="form-control">
      <label for="last-name">Last Name:</label>
      <input type="text" id="last-name" v-model="lastName" />
    </div>
    <div class="form-control">
      <label for="description">Description:</label>
      <textarea id="description" v-model="description" rows="3"></textarea>
    </div>
    <div class="form-control">
      <p>Tags:</p>
      <div id="tags-container">
        <label for="front-end">Front-End</label>
        <input
          type="checkbox"
          id="front-end"
          value="front-end"
          v-model="tags"
        />
        <label for="back-end">Back-End</label>
        <input type="checkbox" id="back-end" value="back-end" v-model="tags" />
        <label for="scrum">Scrum</label>
        <input type="checkbox" id="scrum" value="scrum" v-model="tags" />
      </div>
    </div>
    <div class="form-control">
      <label for="rate">Rate:</label>
      <input type="number" id="rate" v-model="rate" />
    </div>
    <button type="submit">Register!</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      tags: [],
      rate: null,
    };
  },
  methods: {
    submitForm() {
      this.$store
        .dispatch("addCoach", {
          value: {
            id: new Date().toISOString(),
            firstName: this.firstName,
            lastName: this.lastName,
            description: this.description,
            tags: this.tags,
            rate: this.rate,
          },
        })
        .then(() => {
          this.$router.push("/coaches");
        });
    },
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
</style>
