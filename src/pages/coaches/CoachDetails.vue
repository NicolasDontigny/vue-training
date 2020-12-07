<template>
  <div class="container">
    <h2>{{ coach.firstName }} {{ coach.lastName }}</h2>
    <p>{{ coach.description }}</p>
    <p>{{ coach.rate }}$ / hour</p>
    <router-view></router-view>
    <!-- <router-link :to="`/coaches/${coach.id}/contact`">Contact</router-link> -->
  </div>
</template>

<script>
export default {
  computed: {
    coach() {
      const id = this.$route.params.id;
      console.log("id: ", id);
      const coaches = this.$store.getters.coaches;
      console.log("coaches: ", coaches);

      return coaches.find((coach) => `${coach.id}` === id);
    },
  },
};
</script>
