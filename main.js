import Vue         from 'vue';
import app         from './app.vue';
import VueResource from 'vue-resource';
import VueRouter   from 'vue-router';
import Routes      from './routes.js';
import fullCalendar from 'vue-fullcalendar';


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(fullCalendar);



// For Local add mode: 'history' under routes

// Routing
const router = new VueRouter ({
  
    routes: Routes,
    mode: 'history'
});


new Vue({
  el: '#app',
  render: h => h(app),
  router: router,
});
