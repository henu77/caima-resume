import { createStore } from 'vuex';

const loadState = () => {
  return {
    bailianApiKey: localStorage.getItem('bailianApiKey') || '',
    qianfanApiKey: localStorage.getItem('qianfanApiKey') || '',
    zhipuApiKey: localStorage.getItem('zhipuApiKey') || '',
    userName: localStorage.getItem('userName') || '',
    userPhone: localStorage.getItem('userPhone') || '',
    userEmail: localStorage.getItem('userEmail') || '',
    userAge: localStorage.getItem('userAge') || null
  };
};

const saveState = (state) => {
  localStorage.setItem('bailianApiKey', state.bailianApiKey);
  localStorage.setItem('qianfanApiKey', state.qianfanApiKey);
  localStorage.setItem('zhipuApiKey', state.zhipuApiKey);
  localStorage.setItem('userName', state.userName);
  localStorage.setItem('userPhone', state.userPhone);
  localStorage.setItem('userEmail', state.userEmail);
  localStorage.setItem('userAge', state.userAge);
};

export default createStore({
  state: loadState(),
  mutations: {
    setBailianApiKey(state, key) {
      state.bailianApiKey = key;
      saveState(state);
    },
    setQianfanApiKey(state, key) {
      state.qianfanApiKey = key;
      saveState(state);
    },
    setZhipuApiKey(state, key) {
      state.zhipuApiKey = key;
      saveState(state);
    },
    setUserName(state, name) {
      state.userName = name;
      saveState(state);
    },
    setUserPhone(state, phone) {
      state.userPhone = phone;
      saveState(state);
    },
    setUserEmail(state, email) {
      state.userEmail = email;
      saveState(state);
    },
    setUserAge(state, age) {
      state.userAge = age;
      saveState(state);
    }
  },
  actions: {
    updateBailianApiKey({ commit }, key) {
      commit('setBailianApiKey', key);
    },
    updateQianfanApiKey({ commit }, key) {
      commit('setQianfanApiKey', key);
    },
    updateZhipuApiKey({ commit }, key) {
      commit('setZhipuApiKey', key);
    },
    updateUserName({ commit }, name) {
      commit('setUserName', name);
    },
    updateUserPhone({ commit }, phone) {
      commit('setUserPhone', phone);
    },
    updateUserEmail({ commit }, email) {
      commit('setUserEmail', email);
    },
    updateUserAge({ commit }, age) {
      commit('setUserAge', age);
    }
  },
  getters: {
    bailianApiKey: state => state.bailianApiKey,
    qianfanApiKey: state => state.qianfanApiKey,
    zhipuApiKey: state => state.zhipuApiKey,
    userName: state => state.userName,
    userPhone: state => state.userPhone,
    userEmail: state => state.userEmail,
    userAge: state => state.userAge
  }
});