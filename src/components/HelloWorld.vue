<template>
  <div>{{ data }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {},
  computed: {
    data() {
      return this.$mystore.state.data;
    }
  }
});
</script>

<style scoped>
</style>