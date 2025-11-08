<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  mounted() {
    this.$store.commit("initialAnswers");
  },
  components: { TheNavbar },
};
</script>

<template>
  <div class="min-h-screen relative overflow-hidden bg-purple-900">
    <!-- Фон с цифрами 8x8 -->
    <div class="absolute inset-0 opacity-5 grid grid-cols-8 grid-rows-8 z-0">
      <div v-for="i in 64" :key="i" class="flex items-center justify-center text-8xl font-bold text-white select-none">
        {{ Math.floor(Math.random() * 10) }}
      </div>
    </div>
    
    <!-- Основной контент -->
    <div class="relative z-10">
      <TheNavbar class="mb-8" />
      <div class="flex flex-col items-center">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>