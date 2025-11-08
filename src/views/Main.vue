<template>
  <div class="w-full max-w-md mx-auto bg-purple-800 bg-opacity-90 rounded-xl p-8 shadow-2xl">
    <p class="text-3xl font-bold text-white text-center mb-6 border-b border-purple-600 pb-4">{{ question }}</p>
    
    <div class="flex gap-4 mb-6">
      <input 
        v-model="answer" 
        @keydown.enter="submit" 
        ref="answerInput"
        type="number"
        class="answer-input flex-1 px-4 py-3 text-2xl bg-purple-700 border-2 border-purple-500 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400"
        placeholder="?"
      />
      <span v-if="action === '/'" class="text-xs text-white self-end mb-2 ml-2">Ост.</span>
    </div>

    <button 
      @click="submit"
      class="btn-primary w-full py-3 mb-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
    >
      Отправить
    </button>

    <p class="text-2xl text-white text-center mb-6">Результат: <span class="font-bold text-green-400">{{ result }}</span></p>

    <button 
      @click="finish"
      class="btn-secondary w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
    >
      Закончить
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: null,
      rightAnswer: null,
      question: null,
      result: 0,
      answers: [],
      time: null
    };
  },
  computed: {
    min() {
      return this.$store.state.min;
    },
    max() {
      return this.$store.state.max;
    },
    action() {
      return this.$store.state.action;
    },
    page() {
      return this.$route.path;
    }
  },
  methods: {
    rnd(min = this.min, max = this.max + 1) {
      return Math.trunc(Math.random() * (max - min)) + min;
    },
    submit() {
      if (this.answer) {
        const success = this.answer == this.rightAnswer;

        success && this.result++;
        this.answers.push({ 
          success, 
          question: this.question, 
          answer: this.answer, 
          time: (performance.now() - this.time) / 1000 
        });

        this.newQuestion();
        this.answer = "";
        this.$refs.answerInput.focus();
      }
    },
    newQuestion() {
      let a = this.rnd();
      let b = this.rnd();
      switch (this.action) {
        case "+":
          this.question = `${a} + ${b} = `;
          this.rightAnswer = +a + b;
          break;
        case "*":
          b = this.rnd(this.min, Math.min(this.min + 10, this.max));
          this.question = `${a} × ${b} = `;
          this.rightAnswer = +a * b;
          break;
        case "/":
          if (a < b) [a, b] = [b, a];
          this.question = `${a} ÷ ${b} = `;
          this.rightAnswer = +a % b;
          break;
      }
      this.time = performance.now();
    },
    async finish() {
      this.$store.commit("finish", { answers: this.answers });
      
      // Отправляем результат
      try {
        const response = await fetch('https://your-api-endpoint.com/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            result: this.result,
            totalAnswers: this.answers.length,
            answers: this.answers,
            settings: {
              action: this.action,
              min: this.min,
              max: this.max
            }
          })
        });
        
        if (response.ok) {
          console.log('Results sent successfully');
        } else {
          console.error('Failed to send results');
        }
      } catch (error) {
        console.error('Error sending results:', error);
      }
      
      // Сбрасываем состояние и переходим к настройкам
      this.result = 0;
      this.answers = [];
      this.$router.push("/settings");
    },
  },
  watch: {
    page() {
      this.newQuestion();
    }
  },
  mounted() {
    this.newQuestion();
  },
};
</script>

<style scoped>
.answer-input::-webkit-inner-spin-button,
.answer-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>