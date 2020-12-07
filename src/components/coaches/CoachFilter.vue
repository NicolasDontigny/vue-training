<template>
  <h2>Find Your Coach</h2>
  <span class="filter-option" v-for="tag in tags" :key="tag.value">
    <input type="checkbox" :id="tag.value" checked @change="setFilter" />
    <label :for="tag.value">{{ tag.value }}</label>
  </span>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      tags: [
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
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;

      this.tags = this.tags.map((tag) => {
        if (tag.value === inputId) {
          tag.checked = isActive;
        }

        return tag;
      });

      this.$emit("change-filter", this.tags);
    },
  },
};
</script>
