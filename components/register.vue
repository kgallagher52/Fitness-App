<template>
  <div>
    <button class="btn-M" type="button" id="sign-in-btn-M" v-on:click="modalR.show = true">REGISTER</button>
    <div class="modal-backdrop-M" id="modal-M" v-show="modalR.show">
      <div class="modal-mask-M">
        <div class="modal-wrapper-M">
          <div class="modal-container-M" style="height:auto; overflow: auto;">

            <div class="modal-header-M">
              <slot name="header">
                <h1>Register</h1>
              </slot>
            </div>

            <div class="modal-body-M">
              <slot name="body">
                <form style="">
                    <div class="Form-Container-M">Name<input v-model="newUser.name" id="name"  placeholder="Name" class="Form-Control-M" type="text"></div>
                    <div class="Form-Container-M">Email<input v-model="newUser.email" id="email" placeholder="Email" class="Form-Control-M" type="text"></div>
                    <div class="Form-Container-M">Password<input v-model="newUser.pw" id="pw" class="Form-Control-M" placeholder="Password" type="password"></div>
                    <div class="Form-Container-M">Confirm password <input v-model="newUser.cpw" v-on:keyup.enter="register" class="Form-Control-M" id="cpw" type="password"  placeholder="Confirm Password"></div>
                    <span v-if="userIsInvalid" style="color:#fff; padding-left: 7px; float:left; font-size:14px;">{{ errors.err2 }}</span></br> 
                </form>
              </slot>
            </div>
            <span style="color:red; float:left; padding-left: 7px; font-size:14px;"  v-if="errors.exist">{{ errors.err }}</span>
                    <span v-if="passwordIsInvalid" style="color:red; padding-left: 7px; float:left; font-size:14px;">{{ errors.errpw }}</span> 

            <div class="modal-footer-M">

              <slot name="footer">

                  <button class="btn-M submit-M" v-on:click="register" style="margin: 0;" >
                      SUBMIT
                  </button>
                  
                  <button class="btn-M submit-M" v-on:click="modalR.show = false" style=" margin: 0px 18px 0px 0px;">
                      CANCEL
                  </button>
              </slot>
            </div>
            
            </div>
            
          </div>
          
        </div>

      </div>
                          
    </div>
    
</template>

<script>
// Get fetch that grabs all data from
import Global   from '../global.js'

var signingIn = function(tempUser,tempPw, success, failure) {
 var encodedString = 'email=' + encodeURIComponent(tempUser) + '&pw=' + encodeURIComponent(tempPw);
    fetch(Global.path + '/session', {
                body: encodedString,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include',
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


var createUser = function(newUser, success, failure) {
    var encodedString = 'name=' + encodeURIComponent(newUser.name) + '&email=' + encodeURIComponent(newUser.email) + '&pw=' + encodeURIComponent(newUser.pw);
    fetch(Global.path +'/users', {
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
        
  export default {
    name: 'modal',
    data() {
      return {
        modalR: {
          show: false
        },
        
        newUser: {
          name: '',
          email: '',
          pw: '',
          cpw:''

        },
      errors: {
          exist: false,
          err: "User already exists",
          errpw: "Passwords don't Match", 
          err2: "Please fill out all fields.",
        },
      error: {
        badUser: false,
        err: "Email or Password is invalid", 
           
        },

      }
    },

    methods: {

      register() {
               
        this.newUser.name,
        this.newUser.email,
        this.newUser.pw,
        this.newUser.cpw  
        var tempUser = this.newUser.email;
        var tempPw   = this.newUser.pw;
        createUser(this.newUser, function (newUser) {
              // success
              console.log("Success");
                signingIn(tempUser,tempPw, function(user) {
                  window.location.href = Global.path2 + '/home';
                });
    
            
              
            }, function () {
                // failure
                console.log('fail');
        });
        
          this.newUser.email = '';
          this.newUser.name = '';
          this.newUser.pw = '';
          this.newUser.cpw = '';
          this.errors.exist = true;
          this.errors.errpw = '';
          this.errors.err2 = '';
        },
        // Start new function
    
    },
      

      computed: {
          userIsInvalid: function () {
              return this.newUser.name.length == 0 || this.newUser.email.length == 0 || this.newUser.pw.length == 0;
          }, 
          passwordIsInvalid: function () {
              return  this.newUser.pw != this.newUser.cpw;
          } 
              
        },
  }
  
</script>

<style scoped>

  h1 {
    font-size: 1.5rem;

  }

 .btn-M {
    margin: 6px;
    width: 76px;
    height: 32px;
    float: right;
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: none;
    font-size: 12px;
    font-weight: 500;
    font-style: caps;
}

.submit-M {
  background-color: #164172;
}

.btn-M:hover {
    background-color: #686868;
    border: black 1px solid;
    transition: 0.3s linear;
}
 .modal-mask-M {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper-M {
  display: table-cell;
  vertical-align: middle;
  
}

.modal-container-M {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgba(0,0,0,0.9);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header-M {
  color: #fff;
}

.modal-body-M {
  margin: 20px 0;
}

.modal-footer-M {
  margin-right: 30px;
}


.modal-enter-M {
  opacity: 0;
}

.modal-leave-active-M {
  opacity: 0;
}

.modal-enter-M .modal-container-M,
.modal-leave-active-M .modal-container-M {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


.modal-footer-M button {
  width: 115px;
}

.Form-Control-M {
  height: 35px;
  border: inherit;
  width: 100%;
  border-radius: 5px;
}

.Form-Container-M {
  display: inline-block;
  padding: 8px;
  color: gray;
  width: 45%;
}

.Form-Container-M p {
  margin: 0;
  padding-top: 14px;
}


</style>