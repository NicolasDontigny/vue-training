<template>
  <div>
    <h4>My Requests</h4>
    <ul>
      <li v-for="request in myRequests" :key="request.id">
        <h3>{{ request.title }}</h3>
        <p>{{ request.message }}</p>
        <p>Coach: {{ request.coachName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["myRequests"]),
  },
  methods: {
    loadRequests() {
      this.$store.dispatch("loadRequests");
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 16px;
  border: 1px solid purple;
  margin: 12px 0;
}
</style>
