<template>
  <h4>Contact:</h4>
  <form @submit.prevent="sendRequest">
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <input type="text" id="message" v-model="message" />
    </div>
    <button>Send Request</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      message: "",
    };
  },
  computed: {
    // id() {
    //   return this.$route.params.id;
    // },
  },
  methods: {
    sendRequest() {
      console.log("id: ", this.id);
      const foundCoach = this.$store.getters.coaches.find(
        (coach) => coach.id === this.id
      );

      console.log("foundCoach: ", foundCoach);

      this.$store
        .dispatch({
          type: "addRequest",
          value: {
            id: new Date().toISOString(),
            title: this.title,
            message: this.message,
            coachName: foundCoach
              ? foundCoach.firstName + " " + foundCoach.lastName
              : null,
          },
        })
        .then(() => this.$router.push("/requests"));
    },
  },
};
</script>
