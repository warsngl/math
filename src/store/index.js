import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      min: 1,
      max: 10,
      action: '+',
      answers: [],
    };
  },
  mutations: {
    saveSettings(state, { min, max, action }) {
      state.min = min;
      state.max = max;
      state.action = action;
    },
    finish(state, { answers }) {
      state.answers.push(answers);
      localStorage.setItem('math-answers', JSON.stringify(state.answers));
    },
    initialAnswers(state) {
      const storageAnswers = JSON.parse(localStorage.getItem('math-answers'));
      storageAnswers && (state.answers = storageAnswers);
    },
    clearAnswers(state) {
      localStorage.removeItem('math-answers');
      state.answers.length = 0;
    },
  },
});
export default store;
