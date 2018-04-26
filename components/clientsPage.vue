<template>
  <div class="row">
    <div  v-for="client in clients" class="client-container">
            <img v-if="client.image" :src="client.image" id="post-image" alt="Cinque Terre">
            <img v-if="!client.image" src="../assets/logo.png" id="post-image" alt="Cinque Terre">
            <span>{{ client.name }}</span>
            <span class="remove" v-on:click="deleteUser(client.name, client.id)">remove client</span>
    </div>

  </div>
</template>


<script>
import Global from '../global';

    export default {
        props:[
        'currentUser'
        ],
        data() {
            return {
                clients:[]

            }
            
        },
        components: {
  

        },
        methods: {

        getClients() {
            this.clients = [];
            var THIS = this;
            fetch(Global.path + '/users',{
                credentials: 'include',

            }).then(function (response){
                var status = response.status;
                return response.json();
            }).then(function (users) {
                if(users) {
                    for (let index = 0; index < users.length; index++) {
                        const element = users[index];
                        console.log("successs on Clients")
                       var client =  {
                            name: element.name,
                            id: element._id,
                            image: element.profileImg
                        }
                        THIS.clients.push(client);

                    }

                } else {
                    console.log("Fail")
                }
        
            
            });
        },

        deleteUser(name, id) {
            console.log(id);
            var result = confirm("Are you sure you want to delete" + name  + "?");
            if (result) {

                var THIS = this;
                fetch(Global.path +'/user/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include'
                
                }).then(function (response) {
                    console.log("Promise Complete");
                    
                    var status = response.status;
                    THIS.getClients();

            });    

        }
    },
            
},
     

        mounted: function () {
            this.getClients();
        
        },
    }

</script>


<style scoped>
    #post-image {
        width: 108px;
        float: left;
        padding-right: 12px;
    }

    .client-container {
        background-color: #fff;
        padding: 11px;
        width: auto;
        margin: 12px;
    }

    .remove {
        float: left;
        font-size: 9px;
        clear: left;
        cursor: pointer;
        
    }


    .remove:hover {
        color: black;
        font-weight: 500;
    }
</style>



