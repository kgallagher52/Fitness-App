<template>
  <div id="messageFeed">
    <div class="top-border"></div>

    <input id="feedInput" v-model="newMessage" v-on:keyup.enter="messageFunction" placeholder='New thoughts....'>
    <div class="bottom-border"><h6 v-on:click="messageFunction"  v-if="newMessage.length > 5" class="btn animated zoomIn">POST</h6></div>
    <div class="new-post-container" v-if="messages[0]">
        <h6 class="post-wall-title" style="text-align:left;">Message Feed</h6>
        <div  v-for="message in messages">
            <div id="feed" v-for="singleMessage in message">
                <!-- <div class="top-border2"></div> -->
                <div class="new-post"> 
                    <ul style="padding:0;">
                        <img v-if="singleMessage.image" :src="singleMessage.image" id="post-image" alt="Cinque Terre">
                    
                        <li class="name">{{ singleMessage.name }}</li>
                        <li class="date">{{ singleMessage.date }}</li></br>
                        <li class="messsage" v-if="editingPost.postId != singleMessage._id">{{ singleMessage.message }}</li> 
                        <li class="messsage" v-if="editingPost.postId == singleMessage._id"  ><input v-model="updatePost" placeholder="New Message"  v-on:keyup.enter="editPost(singleMessage)"></li> 
                        <li class="editPost postBtns" v-if="singleMessage.id == currentUser.id" v-on:click="editPostInput(singleMessage)">edit</li>
                        <li class="deletePost postBtns" v-if="singleMessage.id == currentUser.id" v-on:click="deletePost(singleMessage._id)">delete</li>

                    </ul>
                    
                </div>
            </div>
        </div>
    </div>

  </div>
</template>


<script>
import Global from '../global';


export default {
        
    props:[
        'currentUser', 'pageTitle'
    ],
        
    data() {
        return {
            message: false,
            messages:[],
            newMessage: '',
            User:[],
            socket: null,
            typeing: false,
            timeout: null,
            postOwner: false,
            editingPost: {
                postId: '',
            }
        }
        
    },

    methods: {

        // Implment later

        connectSocket() {
   
        // Local

            var socket      = this.socket = new WebSocket('ws://localhost:5050');
            // var HOST        = location.origin.replace(/^http/, 'ws')
            // var httpSocket  = socket = new WebSocket(HOST);
        
            var user = this.currentUser;
            socket.onopen = function (event) {

            }
            //  socket is fetch in websocket land
    
            var tempThis = this.messages;
            socket.onmessage = function (event) {
                console.log("socket onmessage fired", event.data);
            function compare(a,b) {
                if (a.data < b.data) {
                    return -1;
                }
                if (a.data > b.data) {
                    return 1;
                }   
                return 0;
            }

            tempThis.push(event.data);
            var check = tempThis.sort(compare);      
            console.log(check);         

            }
            
        
        },
            
        messageFunction() {
            var name    = this.currentUser.name;
            var id      = this.currentUser.id;
            var message = this.newMessage;
            var image   = this.currentUser.profileImg;

            var newThis = this;
            var encodedString = 'name=' + encodeURIComponent(name) + '&id=' + encodeURIComponent(id) + '&message=' + encodeURIComponent(message) + '&image=' + encodeURIComponent(image);
            fetch(Global.path + '/messages', {
                        body: encodedString,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        console.log("Message Promise Complete");
                        var status = response.status;
                        if (status == 201) {
                            console.log("messages Success");
                            newThis.newMessage = '';
                            newThis.getMssages();

                        } else {
                            console.log("messages Fail");
                        }
                        
                    });    
            },

        getMssages() {
            var tempThis = this.messages;
            var THIS = this;
            fetch(Global.path + '/messages',{
                credentials: 'include',

            }).then(function (response){
                var status = response.status;
                return response.json();
            }).then(function (messages) {
                if(messages) {
                    console.log("successs on messages")
                    THIS.editingPost.postId = '';
                    tempThis.splice(messages, 1)
                    messages.reverse();
                    tempThis.push(messages);
                  

                } else {
                    console.log("Fail")
                }
            });


        },
        editPostInput(post) {
            console.log("working")
            this.editingPost.postId = post._id;
            
            // this.editPost(post);
        },

        editPost(post) {
            var tempThis = this;
            var encodedString = 'message=' + encodeURIComponent(this.updatePost) + '&postId=' + encodeURIComponent(post._id);
            fetch(Global.path +'/messages', {
                body: encodedString,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                }).then(function (response) {
                    console.log("Promise Complete");
                    var status = response.status;

                
                }).then(function () {
                    tempThis.getMssages();

                });
        },

        deletePost(postId) {
            var result = confirm("Are you sure you want to delete this post?");
            if (result) {

                var tempThis = this;
                fetch(Global.path +'/messages/'+ postId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include'
                
                }).then(function (response) {
                    console.log("Promise Complete");
                    
                    var status = response.status;
                    tempThis.getMssages();

            });    

        }
        },
        
        posting() {
            this.message = true
        },
        postMessage() {
            this.message = false
        }
    
    },
   created() {
        this.getMssages();
        this.connectSocket();

        
   },


}

</script>


<style scoped>
    ul {
        list-style-type: none;
    }
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

    .postBtns {
        float: right;
        padding: 0 3px;
        font-size: 10px;
        cursor: pointer;

    }

    .postBtns:hover {
        color: black;
        font-weight: 500;
    }

    .new-post-container {
        padding: 12px;
        margin-top: 23px;
        background-color: #fff;
        box-shadow: 0px 0px 1px 0px;
        max-height: 400px;
        overflow: scroll;


    }
  

    .new-post {
        height: auto;
        min-height: 80px;
        padding: 9px;
    }


    .btn:hover {
        color: #686868;
        transition: 0.3s linear;
    }

    .post-wall-title {
        border-bottom: black solid 0.5px;
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
        width: 100%;
        padding: 12px;
        height: 50px;
        border: none;
        outline: none;

    }



    #feed {
        background-color: #fff;
        height: auto;
        margin: 15px 0px;
        min-height: 104px;
        padding: 0;
        width: 100%;
        margin-top: 19px;
        box-shadow: 0px 0px 1px 0px;

    }

    .name {
        color: hsl(211,56%,29%);
        font-size: 12px;
        font-weight: 600;
    }

    .date {
        font-size: 8px;
        font-weight: 600;
        color: gray;

    }

    .messsage {
        font-size: 14px;
        font-family: 'Lato', sans-serif;
        margin-left: 5%;
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
        float: left;
        margin-right: 12px;
    }

    #post-image-2 {
        width: 63px;
        margin: 2%;
        float: left;
        padding: 6px;
    }


</style>



