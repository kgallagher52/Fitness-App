<template>
  <div id="messageFeed">
    <div class="top-border"></div>

    <input id="feedInput" v-model="newMessage" v-on:keyup.enter="messageFunction" placeholder='New thoughts....'>
    <div class="bottom-border"><h6 v-on:click="messageFunction"  v-if="newMessage.length > 5" class="btn animated zoomIn">POST</h6></div>
    <div class="new-post-container" v-if="messages[0]">
        <div  v-for="message in messages">
            <div id="feed" v-for="singleMessage in message">
                <div class="new-post"> 
                    <ul class="mainPost">
                        <img v-if="singleMessage.image" :src="singleMessage.image" id="post-image" alt="Cinque Terre">
                        <li class="name">{{ singleMessage.name }}</li>
                        <li class="date">{{ singleMessage.date }}</li></br>
                        <li class="messsage" v-if="editingPost.postId != singleMessage._id">{{ singleMessage.message }}</li> 
                        <li class="messsage" v-if="editingPost.postId == singleMessage._id"><input class="updateInputs" v-model="updatePost" placeholder="New Message..." v-on:blur="editingPost.postId = ''; updatePost = '';" v-on:keyup.enter="editPost(singleMessage)"></li>
                        <li class="messsage" v-if="editingPost.commentId == singleMessage._id"><input class="updateInputs" v-model="currentComment" placeholder="New comment..." v-on:blur="editingPost.commentId = ''; currentComment = '';" v-on:keyup.enter="postComments(singleMessage)"></li>
                        <li class="editPost postBtns" v-if="singleMessage.id == currentUser.id" v-on:click="editPostInput(singleMessage)">edit</li>
                        <li class="deletePost postBtns" v-if="singleMessage.id == currentUser.id" v-on:click="deletePost(singleMessage._id)">delete</li>
                        <li class="commentPost postBtns" v-if="singleMessage.id != currentUser.id" v-on:click="commentsFunction(singleMessage)">Comment</li>
                    </ul>
                    
                    <div class="comments-container" v-for="allComments in comments">
                        <ul class="comments"  style="margin-bottom:10%;" v-if="singleMessage._id == comment.postId" v-for="comment in allComments">
                            <img v-if="comment.image" :src="comment.image"  alt="Cinque Terre">
                            <li class="comment-name">
                                {{ comment.name }}
                                <span class="comment-comment">{{ comment.comment }}</span></br>
                                <span class="editPost postBtns"  v-if="comment.userId == currentUser.id" v-on:click="toggleUpdate(comment)">edit</span>
                                <span class="deletePost postBtns"  v-if="comment.userId == currentUser.id" v-on:click="deleteComment(comment._id)">delete</span>
                                <span class="messsage" v-if="updatingComment == comment._id"><input class="updateInputs" v-model="updateComment" placeholder="Update comment..."  v-on:blur="updatingComment = ''; updateComment = '';" v-on:keyup.enter="editComment(comment)"></span>

                            </li>

                        </ul>
                    </div>
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
            messages:[],
            comments:[],
            newMessage: '',
            User:[],
            socket: null,
            typeing: false,
            timeout: null,
            postOwner: false,
            editingPost: {
                postId: '',
                commentId: ''
            },
            updatePost: '',
            currentComment: '',
            updatingComment: '',
            updateComment: '',
        }
        
    },

    methods: {

        // Implment later
        update() {
            this.socket.send(JSON.stringify ({
                action: "updatePage", 
                comment: "updating",
                sendingUser: this.currentUser.id,
        
            }));

        },

        connectSocket() {
   
        // Local
        console.log("socket hit")

            // var socket      = this.socket = new WebSocket('ws://localhost:5050');
            var HOST        = location.origin.replace(/^http/, 'ws')
            var socket  = socket = new WebSocket(HOST);
        
            var user = this.currentUser;
            socket.onopen = function (event) {

            }
            //  socket is fetch in websocket land
    
            var tempThis = this;
            socket.onmessage = function (event) {
                var incomingData = JSON.parse(event.data);
                console.log(incomingData);
                if (incomingData.action === "updatePage") {
                        tempThis.getMssages();
                
                }
            }
        },
            
        messageFunction() {
            var name    = this.currentUser.name;
            var id      = this.currentUser.id;
            var message = this.newMessage;
            var image   = this.currentUser.profileImg;

            var THIS = this;
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
                            THIS.newMessage = '';
                            THIS.update();
                        } else {
                            console.log("messages Fail");
                        }

                        
                    });    
            },


    postComments(data) {
        var name    = this.currentUser.name;
        var postId  = data._id;
        var userId  = this.currentUser.id;
        var comment = this.currentComment;
        var image   = this.currentUser.profileImg;

        var THIS = this;
        var encodedString = 'name=' + encodeURIComponent(name) + '&postId=' + encodeURIComponent(postId) + '&userId=' + encodeURIComponent(userId) + '&comment=' + encodeURIComponent(comment) + '&image=' + encodeURIComponent(image);
        fetch(Global.path + '/comments', {
                    body: encodedString,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    console.log("Comments Promise Complete");
                    var status = response.status;
                    if (status == 201) {
                        console.log("messages Success");
                        THIS.newComment = '';
                        THIS.update();

                    } else {
                        console.log("messages Fail");
                    }
                    
                });    
            },

        getMssages() {
            var empty = [];
            var empty2 = [];
            this.messages = []
            var tempThis = this.messages;
            // tempThis.push(empty)
            var THIS = this;
            // THIS.comments.push(empty2);

            fetch(Global.path + '/messages',{
                credentials: 'include',

            }).then(function (response){
                var status = response.status;
                return response.json();
            }).then(function (messages) {
                if(messages) {
                    console.log("successs on messages")
                    THIS.editingPost.postId = '';
                    THIS.editingPost.commentId = '';
                    THIS.updateComment = '';
                    THIS.currentComment = '';
                    messages.reverse();
                    tempThis.push(messages);

                } else {
                    console.log("Fail")
                }
                THIS.getComments();
                
            });
        },


        getComments() {
            var tempThis = this.comments;            
            var THIS = this;
            fetch(Global.path + '/comments',{
                credentials: 'include',

            }).then(function (response){
                var status = response.status;
                return response.json();
            }).then(function (comments) {
                if(comments) {
                    console.log("successs on comments")
                    THIS.editingPost.postId = '';
                    THIS.editingPost.commentId = '';
                    THIS.updatingComment = '';
                    tempThis.splice(comments, 1)
                    comments.reverse();
                    tempThis.push(comments);

                } else {
                    console.log("Fail")
                }
        
            
            });
        },
        
        editPostInput(post) {
            console.log("working")
            this.editingPost.postId = post._id;
            
        },


        commentsFunction(post) {
            console.log("working")
            this.editingPost.commentId = post._id;
            
        },

        toggleUpdate(comment) {
            this.updatingComment = comment._id;

        },

// PUTS ____________

        editPost(post) {
            console.log("Checking");
            var encodedString = 'message=' + encodeURIComponent(this.updatePost) + '&postId=' + encodeURIComponent(post._id);
            var THIS = this;
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
                    THIS.updatePost = '';
                    THIS.update();

                });
        },

        editComment(comment) {
            
            console.log("Checking");
            var encodedString = 'comment=' + encodeURIComponent(this.updateComment) + '&commentId=' + encodeURIComponent(comment._id) + '&postImage=' + encodeURIComponent(this.currentUser.profileImg) + '&userId=' + encodeURIComponent(comment.userId) + '&name=' + encodeURIComponent(this.currentUser.name);
            var THIS = this;
            fetch(Global.path +'/comments', {
                body: encodedString,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                }).then(function (response) {
                    console.log("Promise Complete");
                    var status = response.status;
                    THIS.update();
                
                }).then(function () {
                

                });
        },
// DELETES__________________________________
        deletePost(postId) {
            var result = confirm("Are you sure you want to delete this post?");
            if (result) {

                var THIS = this;
                fetch(Global.path +'/messages/'+ postId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include'
                
                }).then(function (response) {
                    console.log("Promise Complete");
                    
                    var status = response.status;
                    THIS.update();

            });    

        }
    },

        deleteComment(commentId) {
            var result = confirm("Are you sure you want to delete this comment?");
            if (result) {

                var THIS = this;
                fetch(Global.path +'/comments/'+ commentId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include'
                
                }).then(function (response) {
                    console.log("Promise Complete");
                    THIS.update();


            });    

        }

    },
    
    
    },
   created() {
        this.connectSocket();
        this.getMssages();

        
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
        clear:left;
        padding: 0 3px;
        font-size: 10px;
        cursor: pointer;

    }

    .postBtns:hover {
        color: black;
        font-weight: 500;
    }

    .new-post-container {
        padding: 1px;
        margin-top: 23px;
        max-height: 400px;
        overflow: scroll;


    }
  
    .new-post .mainPost {
        background-color: rgb(255,255,255);
        padding: 17px;
        height: fit-content;
    }

    .new-post {
        height: auto;
        min-height: 80px;
        max-height: 200px;
        overflow: scroll;
    }


    .btn:hover {
        color: #686868;
        transition: 0.3s linear;
    }

    .post-wall-title {
        border-bottom: black solid 0.5px;
    }

    .comments-container {
        width: 100%;
        padding: 8px;

    }


    .comments {
        padding:0; 
        padding-top: 12px; 
        margin-bottom: 41px;
    }

    .comment-name .postBtns {
        float: right;
        font-size: 7px;
        padding: 0 3px;
        cursor: pointer;
    }

    .comments-container .comments img{
        width: 29px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;

    }

    .comment-name {
        color: hsl(211,56%,29%);
        font-size: 12px;
        width: fit-content;
        max-width: 90%;        
        margin-bottom: 14px;
        background-color: rgb(255,255,255);
        height: auto;
        text-align: left;
        padding: 8px;
        border-radius: 10%;
        float: left;
        font-weight: 900;
        box-shadow: 0px 0px 4px 1px lightgrey;

    }

    .comment-comment {
        font-size: 9px;
        font-family: 'Lato', sans-serif;
        font-weight: 600;
        color: #000;
    }

    .updateInputs {
        overflow: visible;
        border: rgb(255,255,255);
        background-color: rgb(255,255,255);
        float: left;
        clear: left;
        outline: none;
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
        height: auto;
        margin: 15px 0px;
        min-height: 104px;
        padding: 0;
        width: 100%;
        margin-top: 19px;
        background-color: whitesmoke;
        box-shadow: 0px 0px 1px 0px black;
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



