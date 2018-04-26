<template>
    <div>

    <!-- <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a> -->
        <nav class="navbar navbar-dark">
            <router-link style="text-decoration:none; color:inherit; width:50%;" to="/home"><h1 style="font-size:1.8rem;"><img style="width:70px;" src="/assets/logo.svg"></h1></router-link>
            <slot class=""></slot><h3 style="width: 8%;" class="navbar-header">{{ pageTitle }}</h3>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-12-l col-12-m col-12-s col-12-x">
                    <ul class="nav nav-tabs">
                        <li class="nav-item" v-on:click="home">
                            <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Home</router-link>
                        </li>

                        <li class="nav-item" v-if="currentUser.admin" v-on:click="clients">
                            <router-link  style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Clients</router-link>
                        </li>

                        <li class="nav-item" v-on:click="workouts">
                            <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Workouts</router-link>
                        </li>

                        <li class="nav-item" v-on:click="messages">
                            <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Messages</router-link>
                        </li>
                        <li class="nav-item" v-on:click="calendar">
                            <router-link style="text-decoration:none; color:inherit;" class="nav-link" to="/home">Calendar</router-link>
                        </li>


                        <li class="nav-item" style="position:absolute; right: 4%;">
                            <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">Hi, {{ currentUser.name }}</a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <router-link style="text-decoration:none; color:inherit;" to="/settings"><li class="dropdown-item">Settings</li></router-link>
                                    <li class="dropdown-item" v-on:click="signOut">Sign Out</li>

                            </div>                       
                        </li>
                    </ul>
                </div>
            </div>
        </div>

                    
        <div>


        </div>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-5-l col-5-m col-12-s col-12-x" v-if="pages.upload" >
                        <upload v-bind:currentUser="currentUser"></upload>
                    </div>

                    <div v-if="pages.feed" id="messageFeed" class="col-7-l col-7-m col-12-s col-12-x">
                        <feed v-bind:currentUser="currentUser"></feed>
                    </div>

                    <div class="col-12-l col-12-m col-12-s col-12-x" v-if="pages.calendar">
                        <calendar :events="fcEvents" v-bind:currentUser="currentUser"></calendar>
                    </div>

                    <div class="" v-if="pages.messages">
                        <messages  v-bind:currentUser="currentUser"></messages>
                    </div>

                    <div class="" v-if="pages.workouts">
                        <workouts v-bind:currentUser="currentUser"></workouts>
                    </div>

                    <div class="col-12-l col-12-m col-12-s col-12-x" v-if="pages.clients">
                        <clients v-bind:currentUser="currentUser"></clients>
                    </div>

                     <div class="" v-if="pages.settings">
                        <settings v-bind:currentUser="currentUser"></settings>
                    </div>
                </div>

            </div>
        </body>
    </div>
</template>

<script>
import Global       from '../global.js';
import upload       from '../components/homeUpload';
import feed         from '../components/messageFeed';
import workouts     from '../components/workoutsPage';
import clients      from '../components/clientsPage';
// import calendar     from 'vue-fullcalendar';
import calendar     from '../components/calendarPage';
import settings     from '../components/settings';
import messages     from '../components/messagesPage';


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
        pageTitle: 'Home',
        fcEvents : 'demoEvents',
    
        pages: {
            home: true,
            clients: false,
            workouts: false,
            feed: true,
            calendar: false,
            upload: true,
            settings: false,
            messages: false,
            
        },
    }
  },
    components: {
        'upload': upload, 
        'feed': feed,
        'workouts': workouts,
        'clients': clients,
        'calendar': calendar,
        'settings': settings,
        'messages': messages

    },
    methods: {
        nameChange() {
            this.pageTitle = 'TESTING';
        },

        signOut: function () {
            console.log("Logged Out");
            signOut(this.currentUser,);
        },

        home() {
            this.pageTitle = 'Home';
            this.pages.home       = true,
            this.pages.clients    = false,
            this.pages.workouts   = false,
            this.pages.messages   = false,
            this.pages.feed       = true,
            this.pages.calendar   = false,
            this.pages.upload     = true,
            this.pages.settings   = false

        },

        clients() {
            this.pageTitle = 'Clients';
            this.pages.home       = false,
            this.pages.clients    = true,
            this.pages.workouts   = false,
            this.pages.feed       = false,
            this.pages.messages   = false,
            this.pages.calendar   = false,
            this.pages.upload     = false,
            this.pages.settings   = false

        },

        workouts() {
            this.pageTitle = 'Workouts';
            this.pages.home       = false,
            this.pages.clients    = false,
            this.pages.workouts   = true,
            this.pages.feed       = false,
            this.pages.messages   = false,
            this.pages.calendar   = false,
            this.pages.upload     = false,
            this.pages.settings   = false

        },

        messages() {
            this.pageTitle = 'Messages';
            this.pages.home       = false,
            this.pages.clients    = false,
            this.pages.workouts   = false,
            this.pages.feed       = false,
            this.pages.messages   = true,
            this.pages.calendar   = false,
            this.pages.upload     = false,
            this.pages.settings   = false
        },

        calendar() {
            this.pageTitle = 'Calendar';
            this.pages.home       = false,
            this.pages.clients    = false,
            this.pages.workouts   = false,
            this.pages.feed       = false,
            this.pages.calendar   = true,
            this.pages.upload     = false,
            this.pages.messages   = false,
            this.pages.settings   = false

        },

        upload() {
            this.pages.home       = false,
            this.pages.clients    = false,
            this.pages.workouts   = false,
            this.pages.feed       = false,
            this.pages.calendar   = false,
            this.pages.upload     = true,
            this.pages.settings   = false,
            this.pages.messages   = false


        },

        settings() {
            this.pages.home       = false,
            this.pages.clients    = false,
            this.pages.workouts   = false,
            this.pages.feed       = false,
            this.pages.calendar   = false,
            this.pages.upload     = false,
            this.pages.messages   = false,
            this.pages.settings   = true

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
        
    },

}

</script>

<style scoped>

    body {
        background-color: #f4f3ee;
        height: 100vh;
        padding-top: 36px;
        overflow: scroll;
    }

    #messageFeed {
        background-color: #fff;
        height: 104px;
        padding: 0;
        box-shadow: 0px 0px 1px 0px;        
        }

    .navbar-header {
        font-size: 19px;
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
        cursor: pointer;
        
    }

    .signOutBtn {
        right: 1%;
        cursor: pointer;
    
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