<template>
<div style="background-color:#134074; width:100%; position:absolute; height:1000px; max-height:1000px;">
    <div style="width: 100%; height:100%; top: 20%; position: absolute; left: 24%;">
        <div style="backgroung-color:#fff; z-index:2; width:auto;">
            <p style="font-size: 4rem; color:#fff; ">Sorry you are not signed In</p>
            <app-register-modal style="float:left; margin-left: 20%;"></app-register-modal>
            <app-sign-in-modal style="float:left;"></app-sign-in-modal>
        </div>
    </div>
    </div>
</template>


<script>
import signIn from '../signIn.vue';
import register from '../register.vue';



export default {
// Shorthand for function es6 data() instead of data function()
  data() {
    return {
      
    }
  },
    components: {
        'app-sign-in-modal': signIn,
        'app-register-modal': register
    },

}

</script>


<style scoped>

*, *::before, *::after {
    box-sizing: border-box;
}


body {
    background-color: #000;
    margin: 0;
}

.btn {
    margin: 6px;
    width: 76px;
    height: 32px;
    float: right;
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: none;
    font-size: 12px;
    font-weight: 500;
    font-style: caps;
}

.btn:hover {
    background-color: #686868;
    border: black 1px solid;
    transition: 0.3s linear;
}


</style>