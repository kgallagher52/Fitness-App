import landingPage  from './components/landingpage.vue';
import home         from './components/home.vue';
import homeerror    from './components/errors/homeError.vue';
import settings     from './components/settings.vue';
import homeMain     from './components/homeMain.vue';
import testing      from './components/testing.vue';



export default [

    { path:'/', component: landingPage},
    { path:'/home', component: homeMain},
    { path:'/homeerror', component: homeerror},
    { path:'/settings', component: settings},
    { path:'/testing', component: testing},



];