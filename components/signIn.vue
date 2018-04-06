<template>
  <div>
    <button class="btn-M" type="button" id="sign-in-btn-M" v-on:click="modalS.show = true">SIGN IN</button>
    <div class="modal-backdrop-M" id="modal" v-show="modalS.show">
      <div class="modal-mask-M">
        <div class="modal-wrapper-M">
          <div class="modal-container-M" style="height:auto; overflow: auto; width:max-content;">
            <div class="modal-header-M">
              <slot name="header">
                <h1>Sign In</h1>
              </slot>
            </div>

            <div class="modal-body-M">
              <slot name="body">
                  <form style="display: inline-flex; padding-top:5%; flex-direction: row;">>
                      <div class="Form-Container-M">Email</br><input v-model="user.emails" style="width: 300px;" id="emailS" placeholder="Email" class="Form-Control-M" type="text"></input></div>
                      <div class="Form-Container-M">Password </br><input v-model="user.pws" style="width: 300px;" id="pwS" class="Form-Control-M" placeholder="Password"type="password"></input></div>
                  </form>
              </slot>
            </div>

            <span style="color:red; padding-left: 28px; float:left; font-size:14px;" v-if="errors.exist">{{ errors.err }}</span>
            
            <div class="modal-footer-M">
              <slot name="footer">
                  <button class="btn-M submit-M" v-on:click="signIn" style="margin: 0;" >
                     SIGN IN
                  </button>
                  
                  <button class="btn-M submit-M" v-on:click="modalS.show = false" style=" margin: 0px 18px 0px 0px;">
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
import home   from './home';
import Global from '../global.js';


var signingIn = function(user, success, failure) {
 var encodedString = 'email=' + encodeURIComponent(user.emails) + '&pw=' + encodeURIComponent(user.pws);

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

  export default {
    name: 'modal',
    data() {
      return {
        id: false,
        modalS: {
          show: false
          
        },
        errors: {
          exist: false,
          err: '',
        },
        
        user: {
          email: '',
          pw: ''
        }
        
      }
    },

    methods: {
        signIn() {
         var userEmail = this.user.email;
         var userpw    = this.user.pw;
         var signInthis = this;
         signingIn(this.user, function(user) {
          
                // success
                console.log("Success", user);
                window.location.href = Global.path2 + '/home';
  
            }, function () {
                // failure
                console.log('fail');
                signInthis.errors.exist = true;
                signInthis.user.emails = '';
                signInthis.user.pws = '';
                signInthis.errors.err = "Email/Password invalid.";
              
            });
            
            console.log('Sign In function fired');
         

         },

        }
  };
  
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
  width: 40%;
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
  display: block;
  padding: 16px;
  color: gray;
}

.Form-Container-M p {
  margin: 0;
  padding-top: 14px;
}

</style>