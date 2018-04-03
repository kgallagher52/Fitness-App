<template>
  <div>
      <app-home-vue></app-home-vue>
    <body style="width:100%;">
        <input type="file" @change="onFileSelected">
        <button @click="onUpload">Upload</button>
    </body>
  </div>
</template>


<script>
import Global from '../global.js';
var postImage = function(currentFile,fileName, success, failure) {
    var encodedString = 'currentFile=' + encodeURIComponent(currentFile) + '&fileName=' + encodeURIComponent(fileName);
    fetch(Global.path +'/images', {
                body: encodedString,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                console.log("Promise Complete");
                var status = response.status;
                // If User Did not exist
                // Else User exist
                if (status == 201) {
                    success();

    

                } else {
                    failure();
                }
                
            });    
        };

import home from './home.vue';
    export default {
        data() {
            return {
                selectedFile: {},
            }
            
        },
        components: {
            'app-home-vue': home
  

        },
        methods: {

            onFileSelected(event) {
                var imageData   = this.selectedFile = event.target.files[0]
                var currentFile = this.selectedFile;
                var fileName    = this.selectedFile.name;
                postImage(currentFile,fileName, function(imageData) {
                    // success
                    console.log("Response",imageData)
                    console.log("Success");
                });
              
                }, function () {
                    // failure
                    console.log('fail');
 
        },

        created: function () {
            
        
        },
    }
    }

</script>


<style scoped>

</style>



