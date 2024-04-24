<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  mounted() {
    this.$store.commit("initialAnswers");
  },
  components: { TheNavbar },
};
</script>

<template lang="pug">
TheNavbar.mb-8
.flex.flex-col.items-center
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component" :key="$route.fullPath")
</template>

<style>

</style>
