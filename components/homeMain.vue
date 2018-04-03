<template>
  <div>
      <app-home-vue></app-home-vue>
    <body style="width:100%;">
           <picture-input
            ref="pictureInput"
            @change="onChanged"
            @remove="onRemoved"
            :width="500"
            :removable="true"
            removeButtonClass="ui red button"
            :height="500"
            accept="image/jpeg, image/png, image/gif"
            buttonClass="ui button primary"
            :customStrings="{
                upload: '<h1>Upload it!</h1>',
                drag: 'Drag and drop your image here'
            }">
            </picture-input>

            <button @click="attemptUpload" v-bind:class="{ disabled: !image }">Upload</button>
    </body>
  </div>
</template>


<script>

import home from './home.vue';
    export default {
        data() {
            return {

            }
            
        },
        components: {
            'app-home-vue': home
  

        },
        methods: {
            onChanged() {   
                console.log("New picture loaded");
                if (this.$refs.pictureInput.file) {
                    this.image = this.$refs.pictureInput.file;
                } else {
                console.log("Old browser. No support for Filereader API");
                }
            },
            onRemoved() {
                this.image = '';
            },
            attemptUpload() {
                if (this.image){
                FormDataPost('http://localhost:8001/user/picture', this.image)
                    .then(response=>{
                    if (response.data.success){
                        this.image = '';
                        console.log("Image uploaded successfully ✨");
                    }
                    })
                    .catch(err=>{
                    console.error(err);
                    });
                }
            }
     
        },

        created: function () {
        
        
        },
    }

</script>


<style scoped>

</style>



