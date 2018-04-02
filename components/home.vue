<template>
    <div>
    <nav>
        <h1>All-N-All-Fitness</h1>
        <div>
            <img src="/assets/icons/person.svg">
            <h1>Welcome</h1>
            <h1>{{ currentUser.name }}</h1>
            <ul>
                <img v-on:mousedown="drowdown" style="width:12px; padding-left:3px; cursor:pointer;" src="/assets/icons/dropdown-icon.svg">
                <li class="settingsBtn" v-if="dropdownContainer">Settings</li>
                <li class="signOutBtn" v-if="dropdownContainer">Sign Out</li>
            </ul>
        </div>
        

    </nav>
   
    </div>
</template>


<script>
import Global from '../global.js';


var collectUser = function(user, success, failure){
    return fetch(Global.path + '/session',{
        credentials: 'include',

    }).then(function (response){
        var status = response.status;
        if(status != 200) {
            window.location.href = Global.path2 + '/';
        }
        return response.json();
    }).then(function (user) {
        if(user) {
            success(user);
        } else {
            failure();
        }
    
        
    });
};



export default {
// Shorthand for function es6 data() instead of data function()
  data() {
    return {
        currentUser: {},
        dropdownContainer: false,
      
    }
  },
    components: {
  

    },
    methods: {
        drowdown() {
            this.dropdownContainer = true;
        }
    },

    created: function () {
        var thisUser = this;
        collectUser(this.currentUser, function(user){
                // success
                console.log("Success");
                thisUser.currentUser = user;

           
            }, function () {
                // failure
                console.log(thisUser)

            });
       
            console.log('created function fired'); 
        
    },
}

</script>


<style scoped>

nav {
    color: #fff;
    display: flex;
    background-color: #1d4776;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

nav div {
    display: flex;
    width: 24%;

}

nav img {
    width: 20px;
    height: 66px;
}

nav h1 {
        padding-left: 5%;
}

nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
}

nav li {
    top: 4%;
    position: absolute;
    padding: 20px;
    z-index: 2; 
    cursor: pointer;
    
    

}

nav li:hover {
    color: #000;
}

.settingsBtn {
    right: 7%;
    
}

.signOutBtn {
    right: 1%;
  
}

img.responsive {
    width:100%;
    height:auto;
  }

*, *::before, *::after {
    box-sizing: border-box;
}

body {
    background-color: #E8E7E4;
    margin: 0;
}

.wrapper {
    margin: 0 auto;
    padding: 34px;

}

</style>