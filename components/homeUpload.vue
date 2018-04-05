<template>
  <div id="upload">
    <div id="profileImage" class="profile-image" v-if="currentUser.profileImg">
        <img class="uploadedimg responsive" :src="currentUser.profileImg" />
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
        props:['currentUser'],
        data() {
            return {
                newItem: {
                    photo:''
                },
                selectedFile: {},
                item:""
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

#upload {
    background-color: #fff;
}

.profile-image {
    width: 200px;
}

#profileImage {
    border: 1px solid;
    padding: 12px;
    box-shadow: 5px 10px #888888;
    
    margin: 36px;
    padding: 0;
}

img.responsive {
    width:100%;
    height:auto;
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



