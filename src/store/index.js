// filepath: /src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    resume: ''
  },
  mutations: {
    setResume(state, resume) {
      state.resume = resume;
    }
  },
  actions: {
    updateResume({ commit }, resume) {
      commit('setResume', resume);
    }
  },
  getters: {
    resume: state => state.resume
  }
});