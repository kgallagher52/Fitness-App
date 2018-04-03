import landingPage  from './components/landingpage.vue';
import home         from './components/home.vue';
import homeerror    from './components/errors/homeError.vue';
import settings     from './components/settings.vue';

export default [

    { path:'/', component: landingPage},
    { path:'/home', component: home},
    { path:'/homeerror', component: homeerror},
    { path:'/settings', component: settings},


];