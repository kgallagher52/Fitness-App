<template>
  <div id="upload">
    <div v-if="!newItem.photo">
        <input id="file" type="file" @change="onFileChange">
    </div>

    <div v-else>
        <img style="width: 262px;" class="uploadedimg" :src="newItem.photo" />
        <button class="removeimage" @click="removeImage">Remove image</button>
    </div>

    <div>
        {{ newItem.photo }}
    </div>
        
  </div>
</template>


<script>
    import home from './home.vue';
    import Global from '../global.js';
    var postImage = function(image, currentUser, success, failure) {
        console.log("Original photo object", image);
        let userId  = currentUser.id;


        // var encodedString = 'image=' + encodeURIComponent(photo) + '&currentUser=' + encodeURIComponent(userId);
        // fetch(Global.path +'/images', {
        //     body: encodedString,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        //     }).then(function (response) {
        //         console.log("Promise Complete");
        //         var status = response.status;

        //         if (status == 201) {
        //             success();

        //         } else {
        //             failure();
        //     }   
        // });    
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
                };
                reader.readAsDataURL(file);
                postImage(this.newItem, this.currentUser, function () {
                    console.log("Success");
           
                    }, function () {
                        // failure
                        console.log("Fail")
                
                    });

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



