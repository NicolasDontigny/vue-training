<template>
  <button :type="buttonType">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"],
  computed: {
    buttonType() {
      return this.type || "submit";
    },
  },
};
</script>

<style scoped>
button {
  background-color: orange;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  margin: 0 5px;
  cursor: pointer;
}
</style>
