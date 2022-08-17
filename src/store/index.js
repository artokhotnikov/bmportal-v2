import Vue from 'vue'
import Vuex from 'vuex'
import Profile from './profile';

Vue.use(Vuex)

const modules = {
  Profile,
};

const store = new Vuex.Store({
  modules,
});
export default store;
