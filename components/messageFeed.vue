<template>
  <div id="messageFeed">
    <div class="top-border"></div>
    <img v-if="currentUser.profileImg" :src="currentUser.profileImg" id="post-image" alt="Cinque Terre">

    <input id="feedInput" v-model="newMessage" v-on:keyup.enter="messageFunction" placeholder='New thoughts....'>
    <div class="bottom-border"><h6 v-on:click="messageFunction" class="btn">POST</h6></div>

    <div class="new-post-container">
        <h6 style="text-align:left;">Message Feed</h6>
        <div  v-for="message in messages">
            <div id="feed">
                <div class="top-border2"></div>
                <img v-if="currentUser.profileImg" :src="currentUser.profileImg" id="post-image-2" alt="Cinque Terre">
                <div class="new-post">{{ currentUser.name }} {{ message }} </div>
                <div class="bottom-border2"></div>
            </div>
        </div>
    </div>

  </div>
</template>


<script>

export default {
        
    props:[
        'currentUser', 'pageTitle'
    ],
        
    data() {
        return {
            message: false,
            messages:[],
            newMessage: '',

        }
        
    },

    methods: {

        connectSocket() {
            console.log("socket hit");
            this.socket = new WebSocket('ws://localhost:5050');
    
            this.socket.onopen = function (event) {
            console.log("socket onload fired...");
            // this.socket.send("My")
            }
            //  socket is fetch in websocket land
            var tempThis = this.messages;
            this.socket.onmessage = function (event) {
                console.log("socket onmessage fired", event);
                tempThis.push(event.data);
            }
        },
        
        messageFunction() {
            var data = this.newMessage;
            this.socket.send(data);
            for (var i = 0; i < this.messages.length; i++) {
                if(this.messages[0] == this.newMessage) {
                    console.log("this message");
                    delete this.messages;
                    break;
                }
            }
            this.newMessage = '';
        },

        posting() {
            this.message = true
        },
        postMessage() {
            this.message = false
        }
    
    },

   created() {
        this.connectSocket();
   },
}

</script>


<style scoped>

    .btn {
        width: 76px;
        font-size: 13px;
        height: 32px;
        float: right;
        font-family: serif;
        margin: 0;
        background-color: none;
        cursor: pointer;
        color: #000;
        border: none;
        font-weight: 700;
    }

    .new-post-container {
        padding: 12px;
        margin-top: 23px;
        background-color: #fff;
        box-shadow: 0px 0px 1px 0px;


    }

    .new-post {
        height: auto;
        min-height: 80px;
        padding: 28px;
    }


    .btn:hover {
        color: #686868;
        transition: 0.3s linear;
    }

    h6 {
        text-align: right;
        font-size: 13px;
        padding-right: 20px;
        padding: 6px;
        font-family: sans-serif;
        cursor: pointer;
    }

    #feedInput {
        width: 85%;
        padding: 4px;
        height: 96px;
        border: none;
        outline: none;

    }

    #feed {
        background-color: #fff;
        height: auto;
        margin: 15px;
        min-height: 110px;
        padding: 0;
        margin-top: 19px;
        box-shadow: 0px 0px 1px 0px;

    }

    .top-border, .bottom-border {
        height: 27px;        
        width: 100%;
        background-color: rgba(102, 94, 94, 0.1);
    }

    .top-border2, .bottom-border2 {
        height: 27px;        
        width: 100%;
        background-color: rgba(102, 94, 94, 0.1);
    }

    #post-image {
        border-radius: 50%;
        width: 40px;
        margin-left: 24px;
    }

    #post-image-2 {
        width: 63px;
        margin: 2%;
        float: left;
        padding: 6px;
    }


</style>



