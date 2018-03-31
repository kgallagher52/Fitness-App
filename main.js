import Vue         from 'vue';
import app         from './app.vue';
import VueResource from 'vue-resource';
import VueRouter   from 'vue-router';
import Routes      from './routes.js';

Vue.use(VueResource);
Vue.use(VueRouter);

// Routing
const router = new VueRouter ({
    routes: Routes,
});


new Vue({
  el: '#app',
  render: h => h(app),
  router: router,
});
