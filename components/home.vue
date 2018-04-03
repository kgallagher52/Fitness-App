<template>
    <div>
    <nav>
        <router-link style="text-decoration:none; color:inherit; width:100%;" to="/home"><h1 style="font-size:1.8rem;">All-N-All-Fitness</h1></router-link>
        <div>
            <img src="/assets/icons/person.svg">
            <h1>Welcome</h1>
            <h1>{{ currentUser.name }}</h1>
            <ul style="padding-top: 4px;">
                <img id="left" v-on:mousedown="open"  style="width:9px; padding-left:3px; cursor:pointer;" src="/assets/icons/triangle-right.svg">
                <img id="down" v-on:mousedown="close"  style="width:14px; padding-left:3px; cursor:pointer;" src="/assets/icons/triangle-down.svg">
                <router-link style="text-decoration:none; color:inherit;" to="/settings"><li class="settingsBtn"  v-if="dropdownContainer">Settings</li></router-link>
                <li class="signOutBtn" v-on:click="signOut" v-if="dropdownContainer">Sign Out</li>
            </ul>
        </div>
        

    </nav>
   
    </div>
</template>

<script>
import Global   from '../global.js';

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

var signOut = function() {
    fetch(Global.path + '/session', {
        credentials: 'include',
        method: 'DELETE',
    });
    window.location.href = Global.path2 + '/';

};




export default {
// Shorthand for function es6 data() instead of data function()

  data() {
    return {
        currentUser: {},
        dropdown: true,
        dropdown2: false,
        dropdownContainer: false

    }
  },
    components: {

    },
    methods: {
        open() {
            var left = document.getElementById("left");
            var down = document.getElementById("down");
            this.dropdownContainer = true;
            left.style.display = "none";
            down.style.display = "block";

        },
        close() {
            var down = document.getElementById("down");
            var left = document.getElementById("left");
            this.dropdownContainer = false;
            down.style.display = "none";
            left.style.display = "block";

        },
        
        signOut: function () {
            console.log("Logged Out");
            signOut(this.currentUser,);
        },
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
    height: 92px;
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

.btn {
    width: 0;
    height: 0;
}


nav li:hover {
    color: #000;

}

nav li {
    top: 6%;
    position: absolute;
    padding: 20px;
    z-index: 2;
    cursor: pointer; 

}

#down {
    display: none;
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