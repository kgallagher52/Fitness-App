<template>
  <div>
    <section id="section-home-nav">
            <nav class="home-nav">
                <router-link to="/" class="navbar-brand">Katie Rotondo</router-link>
                <app-register-modal style="float:right;"></app-register-modal>
                <app-sign-in-modal style="float:right;"></app-sign-in-modal>

            </nav>
    </section>
        <section id="section-2">
            <div class="wrapper">
                <img src="/assets/images/katiebeach.jpg">
                <div>
                    <h1>Mission Statement</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio aspernatur hic tempora accusamus veritatis dicta maiores inventore repellendus quo architecto minus adipisci quos, eius sequi unde fuga facilis natus culpa.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio aspernatur hic tempora accusamus veritatis dicta maiores inventore repellendus quo architecto minus adipisci quos, eius sequi unde fuga facilis natus culpa.</p>

                </div>
            </div>
        </section>

        <section id="section-3">
                <div class="wrapper">
                    <div id="social-media-nav">
                        <a href="https://www.facebook.com/katie.rotondo" class="social-icons"><img src="/assets/icons/socialicons/facebook-circle.svg" alt="facebook-icon"></a>
                        <a href="https://www.instagram.com/katierotondo/?hl=en" class="social-icons"><img src="/assets/icons/socialicons/instagram-circle.svg" alt="instagram-icon"></a>
                        <a href="https://www.youtube.com/channel/UClKmvQR9qj9jVEozVWKCCfg" class="social-icons"><img src="/assets/icons/socialicons/youtube-with-circle.svg" alt="youtube-icon"></a>
                        <h1>Social Media</h1>

                    </div>
                    <div class="images responsive">
                        <img src="/assets/images/hero2.JPG">
                        <img src="/assets/images/katie.jpg">
                        <img src="/assets/images/katie4.jpg">
                        <img src="/assets/images/katie6.jpg">


                    </div>

                </div>
        </section>
    </div>
</template>


<script>
import signIn from './signIn.vue';
import register from './register.vue';
import Global   from '../global.js'

var checkSignedIn = function(user){
    return fetch(Global.path + '/session',{
        credentials: 'include',

    }).then(function (response){
        console.log(response.status)
        var status = response.status;
        if(status == 401) {
            console.log("No cookie");
        } else {
            if(status == 200) {
                console.log("Cookie Present");

                window.location.href = Global.path2 + '/home';

            } else {
                console.log("No cookie");
            }
        }
    });
};

export default {
// Shorthand for function es6 data() instead of data function()
  data() {
    return {
      
    }
  },
    components: {
        'app-sign-in-modal': signIn,
        'app-register-modal': register
    },
    created: function () {
        checkSignedIn();
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


/* Section 1 */
#section-home-nav {
    width: 100%;
    height: 400px;
    background-image: url("/assets/images/hero.JPG");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 20% 30%;

}

.home-nav {
    position: relative;
    width: 100%;
    height: auto;
    padding: 24px;
    background-color: rgba(19, 64, 116, 0.7)
    
}

.home-nav .navbar-brand {
    font-weight: 600;
    font-size: 2.0rem;
    text-decoration: none;
    color: #E8E7E4;
}

.btn {
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
.btn:hover {
    background-color: #686868;
    border: black 1px solid;
    transition: 0.3s linear;
}

/* Section 2 Mission Statement*/



#section-2 .wrapper {
    background-color: #9EADC8;

}

#section-2 img {
    width: 246px;
    height: 246px;
    box-shadow: #000 0px 0px 4px;
    display: flex;
  
}

#section-2 div h1 {
    color: #fff;
    font-size: 2.0rem;
    margin: 0;
    padding-left:14px;   
    display: flex;
 
}

#section-2 div p {
    display: flex;
    padding-left:14px; 

}

/* Section 3  Social Media*/

#section-3 .wrapper {
    background-color: #134074;  
    display: inherit; 
}


#social-media-nav .social-icons {
    width: 40px;
    height: 40px;
    float: right;
    padding-right: 4px;
}

#section-3 .social-icons img:hover {
    border-radius: 50% 50%;
    background-color: #686868;
    transition: linear 0.1s;
    
 
 }

.images {
    padding: 41px;

}

#section-3 .images img {
    width: 270px;
    height: 270px;
    margin: 4px;
    box-shadow: #fff 0px 0px 4px 1px;

}

#section-3 div h1 {
    color: #fff;
    font-size: 2.0rem;
    margin: 0;
    padding-left:49px;   
 
}

</style>