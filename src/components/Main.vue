<template lang="pug">
.flex.items-center.mb-2
  p.text-2xl.font-bold.border-b.border-transparent {{ question }}
  input.answer.w-10(v-model="answer" @keydown.enter="submit")
button.btn.bg-white.mb-6(@click='submit') Ответить
p.text-2xl Счет: {{ result }}
button.btn.bg-pink-600(@click='finish') Закончить
</template>

<script>
export default {
  data() {
    return {
      answer: null,
      rightAnswer: null,
      question: null,
      result: -1,
      answers: [],
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
  },
  methods: {
    rnd(min = this.min, max = this.max) {
      return Math.trunc(Math.random() * (max - min)) + min;
    },
    submit() {
      const success = this.answer == this.rightAnswer;
      success && this.result++;
      this.answers.push({ success, question: this.question, answer: this.answer });
      let a = this.rnd();
      let b = this.rnd();
      switch (this.action) {
        case "+":
          this.question = a + " + " + b + " = ";
          this.rightAnswer = +a + b;
          break;
        case "*":
          this.question = a + " * " + b + "= ";
          this.rightAnswer = +a * b;
          break;
      }
      this.answer = "";
    },
    finish() {
      this.$store.commit("finish", { answers: this.answers });
      this.$router.push("/settings")
    },
  },
  mounted() {
    this.submit();
  },
};
</script>

<style></style>
