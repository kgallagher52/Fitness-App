<template>

     <div id="upload">
        <div  class="container" v-if="currentUser.profileImg">
            <img :src="currentUser.profileImg" id="profile-image" alt="Cinque Terre">
            <input type="file" class="uploadImages" @change="onFileChange"></input>


        </div>

        <div v-else>
            <input id="file" type="file" @change="onFileChange">
        </div>

  </div>
</template>


<script>
    import home from './home.vue';
    import Global from '../global.js';
   
    var postImage = function(image, currentUser, success, failure) {
        var userId  = currentUser.id;
        var encodedString = 'image=' + encodeURIComponent(image) + '&currentUser=' + encodeURIComponent(userId);
        fetch(Global.path +'/users', {
            body: encodedString,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            }).then(function (response) {
                console.log("Promise Complete");
                var status = response.status;

                if (status == 201) {
                    success();

                } else {
                    failure();
            }   
        });    
    };
    

    export default {
        props:[
            'currentUser', 'pageTitle'
            ],
        data() {
            return {
                newItem: {
                    photo:''
                },
                selectedFile: {},
                item:"",
                
            }
            
        },
        components: {
            'app-home-vue': home
        },
        methods: {
            
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.newItem.photo = e.target.result;
                          postImage(vm.newItem.photo, this.currentUser, function () {
                            console.log("Success");

           
                    }, function () {
                        console.log("callback function")
                
                    });
                };
                
                reader.readAsDataURL(file);
          
                window.location.href = Global.path2 + '/home';

                },

            removeImage: function (e) {
                this.newItem.photo = '';
            },
            
            removeEditImage: function (e) {
                this.currentItem.photo = '';
            },
        


        created: function () {
        
            },
        }
    }

</script>


<style scoped>

.uploadImages {
    font-size: 11px;
    float: left;
    clear: left;

}

#profile-image {
    float: left;
    margin-bottom: 12px;
    width: 304px; 
    height:236px;
    overflow: hidden;
    box-shadow: 0px 0px 1px 0px;        


}


*, *::before, *::after {
    box-sizing: border-box;
}


#file {
    width: 300px;
    height: 300px;
    background-image: url("/assets/images/profileTemp.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 20% 30%;
    cursor: pointer;
}


</style>



