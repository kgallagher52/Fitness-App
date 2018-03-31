import landingPage  from './components/landingpage.vue';
import home         from './components/home.vue';
import homeerror    from './components/errors/homeError.vue';

export default [

    { path:'/', component: landingPage},
    { path:'/home', component: home},
    { path:'/homeerror', component: homeerror},

];