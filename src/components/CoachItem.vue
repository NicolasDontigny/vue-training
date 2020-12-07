<template>
  <li>
    <h3>{{ coach.firstName }} {{ coach.lastName }}</h3>
    <!-- <p class="description">{{ coach.description }}</p> -->
    <base-badge v-for="tag in coach.tags" :key="tag">
      <template #default>{{ tag }}</template>
    </base-badge>
    <p class="rate">{{ coach.rate }}$ / hour</p>
    <div>
      <router-link :to="contactUrl">
        <base-button>Contact</base-button>
      </router-link>
      <router-link :to="detailsUrl">
        <base-button>View Details</base-button>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: ["coach", "activeFilters"],
  computed: {
    contactUrl() {
      return this.$route.path + `/${this.coach.id}/contact`;
    },
    detailsUrl() {
      return this.$route.path + `/${this.coach.id}`;
    },
  },
};
</script>

<style scoped>
li {
  padding: 12px;
  border: 1px solid grey;
  border-radius: 4px;
}

.description {
  font-style: italic;
}

a {
  text-decoration: none;
  color: black;
}
</style>
