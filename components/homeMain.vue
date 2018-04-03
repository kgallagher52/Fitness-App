<template>
  <div>
      <app-home-vue></app-home-vue>
    <body style="width:100%;">
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



