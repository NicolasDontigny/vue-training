<template>
  <div>
    <h3>Register as a Coach:</h3>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !firstName.isValid }">
        <label for="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          v-model="firstName.value"
          @blur="clearValidity('firstName')"
        />
      </div>
      <div class="form-control" :class="{ invalid: !lastName.isValid }">
        <label for="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          v-model="lastName.value"
          @blur="clearValidity('lastName')"
        />
      </div>
      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="description.value"
          rows="3"
          @blur="clearValidity('description')"
        ></textarea>
      </div>
      <div class="form-control" :class="{ invalid: !tags.isValid }">
        <p>Tags:</p>
        <div id="tags-container">
          <label for="front-end">Front-End</label>
          <input
            type="checkbox"
            id="front-end"
            value="front-end"
            v-model="tags.value"
          />
          <label for="back-end">Back-End</label>
          <input
            type="checkbox"
            id="back-end"
            value="back-end"
            v-model="tags.value"
          />
          <label for="scrum">Scrum</label>
          <input
            type="checkbox"
            id="scrum"
            value="scrum"
            v-model="tags.value"
          />
        </div>
      </div>
      <div class="form-control" :class="{ invalid: !rate.isValid }">
        <label for="rate">Rate:</label>
        <input type="number" id="rate" v-model.number="rate.value" />
      </div>
      <button type="submit">Register!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      tags: {
        value: [],
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(property) {
      const prop = this.$data[property];
      if (!prop) return;
      prop.isValid = true;
    },
    validateForm() {
      this.firstName.isValid = this.firstName.value !== "";
      this.lastName.isValid = this.lastName.value !== "";
      this.description.isValid = this.description.value !== "";
      this.rate.isValid = this.rate.value !== null;
      this.tags.isValid = this.tags.value.length > 0;

      this.formIsValid =
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.description.isValid &&
        this.rate.isValid &&
        this.tags.isValid;
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      this.$store
        .dispatch("addCoach", {
          value: {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            description: this.description.value,
            tags: this.tags.value,
            rate: this.rate.value,
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

.invalid input {
  border-color: red;
}

.invalid label {
  color: red;
}
</style>
