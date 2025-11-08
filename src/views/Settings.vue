<template>
  <div class="w-full max-w-md mx-auto bg-purple-800 bg-opacity-90 rounded-xl p-8 shadow-2xl">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <span class="text-white font-semibold">Действие:</span>
        <select v-model="action" class="px-4 py-2 bg-purple-700 border-2 border-purple-500 rounded-lg text-white focus:outline-none focus:border-green-400">
          <option value="+">+ Сложение</option>
          <option value="*">× Умножение</option>
          <option value="/">÷ Деление (остаток)</option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-white font-semibold">Min:</span>
        <input 
          type="number" 
          min="2" 
          v-model="min"
          class="px-4 py-2 w-24 bg-purple-700 border-2 border-purple-500 rounded-lg text-white focus:outline-none focus:border-green-400"
        />
      </div>

      <div class="flex items-center justify-between">
        <span class="text-white font-semibold">Max:</span>
        <input 
          type="number"
          v-model="max"
          class="px-4 py-2 w-24 bg-purple-700 border-2 border-purple-500 rounded-lg text-white focus:outline-none focus:border-green-400"
        />
      </div>

      <button 
        @click="saveSettings"
        class="w-full py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Сохранить
      </button>
    </div>

    <div v-if="answers.length > 0" class="mt-8 pt-6 border-t border-purple-600">
      <h3 class="text-white text-xl font-bold mb-4">История ответов:</h3>
      <div v-for="(round, roundIndex) in answers" :key="roundIndex" class="mb-4">
        <div class="text-purple-300 text-sm mb-2">Раунд {{ roundIndex + 1 }}:</div>
        <div class="grid grid-cols-2 gap-2">
          <div 
            v-for="example in round" 
            :key="example.question"
            :class="example.success ? 'bg-green-500' : 'bg-pink-500'"
            class="px-3 py-2 rounded text-white text-center"
          >
            <div class="font-semibold">{{ example.question }} {{ example.answer }}</div>
            <div class="text-xs opacity-80">{{ example.time ? example.time.toFixed(2) + 'с' : '-' }}</div>
          </div>
        </div>
      </div>

      <button 
        @click="clearAnswers"
        class="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
      >
        Очистить историю
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: null,
      max: null,
      action: null,
      answers: [],
    };
  },
  methods: {
    saveSettings(min, max, action) {
      min ??= this.min;
      max ??= this.max;
      action ??= this.action;
      this.$store.commit("saveSettings", { min, max, action });
    },
    clearAnswers() {
      this.$store.commit("clearAnswers");
      this.answers = [];
    },
  },
  mounted() {
    this.min = this.$store.state.min;
    this.max = this.$store.state.max;
    this.action = this.$store.state.action;
    this.answers = this.$store.state.answers;
  },
};
</script>