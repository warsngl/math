<template lang="pug">
span Действие
  select.select(v-model="action")
    option(value="+") +
    option(value="*") *
span Min
  input.answer.w-16(type="number" v-model="min")
span Max
  input.answer.w-16(type="number" v-model="max")
button.btn.bg-white.mt-4(@click='saveSettings()') Сохранить
div.round(v-for="round in answers")
  div.example(v-for="example in round" :class="example.success?'bg-green-400':'bg-pink-400'") {{ example.question }} {{ example.answer }} ({{example.time.toFixed(2)+"сек" || "-"}})
button.btn.bg-pink-600(@click='clearAnswers') Очистить
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

<style></style>
