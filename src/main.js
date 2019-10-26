import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Islands from './components/Islands/Islands.vue'
import Home from './components/Home/Home.vue'
import Search from './components/Search/Search.vue'

import store from './store/store'

Vue.use(Router);
Vue.use(require('vue-moment'));

const router = new Router({
  routes: [
    {
      path: '/',
      name:'home',
      component: Home,
    },
    {
      path: '/search',
      name:'search',
      component: Search,
    },
    {
      path: '/islands',
      name:'islands',
      component: Islands,
    },
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
