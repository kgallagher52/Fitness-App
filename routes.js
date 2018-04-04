import landingPage  from './components/landingpage.vue';
import home         from './components/home.vue';
import homeerror    from './components/errors/homeError.vue';
import settings     from './components/settings.vue';
import homeUpload   from './components/homeUpload.vue';
import testing      from './components/testing.vue';




export default [

    { path:'/', component: landingPage},
    { path:'/home', component: home},
    { path:'/homeerror', component: homeerror},
    { path:'/homeUpload', component: homeUpload},
    { path:'/settings', component: settings},
    { path:'/testing', component: testing},



];