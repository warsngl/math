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
  router-view
</template>

<style>
#app {
  @apply bg-purple-700 min-w-[100vw] min-h-[100vh] p-[20px];
}
.btn {
  @apply rounded w-24 my-2 py-1 font-bold;
}
.answer {
  @apply text-2xl pl-2 bg-transparent outline-none border-b border-black;
}
.bg-green-init {
  @apply bg-green-200;
}
.bg-pink-init {
  @apply bg-pink-200;
}
.round {
  @apply mt-2;
}
.example {
  @apply min-w-[3rem] px-2 text-center mt-2 rounded font-bold;
}
.select {
  @apply ml-2 bg-transparent;
}
.select option {
  @apply bg-transparent;
}
.navbar {
  @apply flex justify-around;
}
.router-link-exact-active {
  text-decoration: underline;
}
</style>
