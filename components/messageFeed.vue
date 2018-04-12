<template>
  <div id="messageFeed">
        <div class="top-border"></div>
        <img v-if="currentUser.profileImg" :src="currentUser.profileImg" id="post-image" alt="Cinque Terre">

        <input id="feedInput"  @mouseout="posting" placeholder='New thoughts....'>
        <div class="bottom-border"></div>
        <button v-if="message"   @click="postMessage" class="btn">POST</button>

          
  </div>
</template>


<script>
    var postingFunction = function() {
        var feedValue = document.querySelector('#feedInput').value;
        console.log(feedValue);
        console.log("new thoughts")

    
    };

    export default {
        
        props:[
            'currentUser', 'pageTitle'
        ],
        
        data() {
            return {
                message: false,

            }
            
        },

        methods: {
            posting() {
                this.message = true
                postingFunction()
            },
            postMessage() {
                this.message = false
            }
     
        },

   mounted() {
       console.log("Before Created", "data passed from home", this.currentUser.name);
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
        margin-top: 12px;
        cursor: pointer;
        background-color: #000;
        color: #fff;
        border: none;

    }

    .btn:hover {
        background-color: #686868;
        border: black 1px solid;
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

    .top-border, .bottom-border {
        height: 27px;        
        width: 100%;
        background-color: rgba(102, 94, 94, 0.1);
    }

    #post-image {
        border-radius: 50%;
        width: 40px;
        margin-left: 24px;
    }


</style>



