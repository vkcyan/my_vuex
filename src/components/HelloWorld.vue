<template>
  <div>
    <div>{{ data }}</div>
    <div>{{ pushdata }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    setTimeout(() => {
      this.$mystore.commit("changeData", "133123123123123");
    }, 2000);
  },
  computed: {
    data() {
      console.log(this.$mystore);
      return this.$mystore.state.data;
    },
    pushdata() {
      return this.$mystore.getters.pushdata;
    }
  }
});
</script>

<style scoped>
</style>