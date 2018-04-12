<template>
    <div>
        <nav class="navbar navbar-dark">
            <router-link style="text-decoration:none; color:inherit; width:50%;" to="/home"><h1 style="font-size:1.8rem;">All-N-All-Fitness</h1></router-link>
            <slot class=""></slot><h3 style="width: 8%;" class="navbar-header">{{ pageTitle }}</h3>
        </nav>
        <div class="container">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Home</router-link>
                </li>

                <li class="nav-item">
                    <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Clients</router-link>
                </li>

                <li class="nav-item">
                    <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Workouts</router-link>
                </li>

                  <li class="nav-item">
                    <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Messages</router-link>
                </li>

                <li class="nav-item">
                    <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Calendar</router-link>
                </li>


                <li class="nav-item" style="position:absolute; right: 8%;">
                    <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">Hi, {{ currentUser.name }}</a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <router-link style="text-decoration:none; color:inherit;" to="/settings"><li class="dropdown-item">Settings</li></router-link>
                            <li class="dropdown-item" v-on:click="signOut">Sign Out</li>

                    </div>                       
                </li>
            </ul>
            </div>
            
        <div>


        </div>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-4-l col-4-m col-4-s col-4-x">
                        <home-upload v-bind:currentUser="currentUser, pageTitle"></home-upload>

                    </div>
                    <div id="messageFeed" class="col-7-l col-4-m col-4-s col-4-x">
                        <message-feed v-bind:currentUser="currentUser, pageTitle"></message-feed>
                    </div>
                </div>

            </div>
        </body>
    </div>
</template>

<script>
import Global   from '../global.js';
import upload   from '../components/homeUpload';
import feed     from '../components/messageFeed';

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
        dropdownContainer: false,
        pageTitle: 'Home'

    }
  },
    components: {
        'home-upload': upload, 
        'message-feed': feed

    },
    methods: {
        nameChange() {
            alert('working');
        },

        signOut: function () {
            console.log("Logged Out");
            signOut(this.currentUser,);
        },

    },

    beforeCreate() {
        console.log("home.vue, lifecycle hook beforecreate");

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
        
    },

}

</script>

<style scoped>

    body {
        background-color: #f4f3ee;
        height: 100vh;
        padding-top: 36px;
    }

    #messageFeed {
        background-color: #fff;
        height: 150px;
        padding: 0;
        box-shadow: 0px 0px 1px 0px;        
        }


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

    /* .btn {
        width: 0;
        height: 0;
    } */


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





    .wrapper {
        margin: 0 auto;
        padding: 34px;

    }

</style>