<template>
    <div>
        {{ currentUser.name }}
   
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
        currentUser: {
            
        }
      
    }
  },
    components: {
  

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
    display: flex;
    flex-wrap: nowrap;
}

</style>