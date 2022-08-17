import Vue from 'vue'
import VueRouter from 'vue-router'
import VLogin from "@/views/VLogin";
import VStore from "@/views/VStore";
import store from './../store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: VLogin,
    name: 'main',
  },
  {
    path: '/store',
    component: VStore,
    meta: {auth: true},
    name: 'store',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isToken = store.getters.token;
  const requireAuth = to.meta.auth;
  if (!requireAuth && isToken) {
    next({name: 'store'});
    return
  }

  if (requireAuth && !isToken) {
    next({name: 'main'});
  } else {
    next();
  }

});
export default router
