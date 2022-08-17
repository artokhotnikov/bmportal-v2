/*
*   TODO: 3д модель
*    TODO: упаковка
*     TODO: еще бы все причесать
* */

export default {
  state: {
    token: localStorage.getItem('BMToken') ? localStorage.getItem('BMToken') : '',
  },
  getters: {
    token: (state) => state.token,
  },
  mutations: {
    LOGIN_USER(state, token) {
      localStorage.setItem('BMToken', token);
      state.token = token;
    },
  },
  actions: {
    loginUser({commit}, payload) {
      commit('LOGIN_USER', payload.token)
    }
  },
};
