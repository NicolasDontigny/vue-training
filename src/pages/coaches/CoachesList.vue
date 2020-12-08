<template>
  <div>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <div class="controls">
        <button>Refresh</button>
        <button v-if="isCoach">Welcome!</button>
        <router-link to="/register" v-else-if="!isCoach && isLoggedIn"
          >Register as Coach</router-link
        >
        <router-link
          to="/auth?redirect=register"
          v-else-if="!isCoach && !isLoggedIn"
          >Login to Register as a Coach</router-link
        >
      </div>
      <ul v-if="!isLoading">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach"
          :coach="coach"
          :activeFilters="activeFilters"
        ></coach-item>
      </ul>
      <div v-else>LOADING</div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: [
        {
          value: "front-end",
          checked: true,
        },
        {
          value: "back-end",
          checked: true,
        },
        {
          value: "scrum",
          checked: true,
        },
      ],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["coaches", "isCoach"]),
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    filtersChecked() {
      return this.activeFilters
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);
    },
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        return (
          coach.tags.filter((tag) => this.filtersChecked.includes(tag)).length >
          0
        );
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadCoaches() {
      this.isLoading = true;

      setTimeout(() => {
        this.$store
          .dispatch("loadCoaches")
          .then(() => (this.isLoading = false));
      }, 1000);
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.controls {
  padding: 16px 0;
}

a {
  text-decoration: none;
  color: black;
}

.controls button,
.controls a {
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background-color: orange;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  color: black;
}
</style>
