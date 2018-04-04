<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import splash from './components/landingpage.vue';
import homeerror from './components/errors/homeError';

export default {
 
// Shorthand for function es6 data() instead of data function()
  data() {
    return {
      
    }
  },

    components: {
        'app-landing-page': splash,
        'home-Error': homeerror
    },
}
</script>

<style>
    body {
        margin: 0;
    }
</style>
