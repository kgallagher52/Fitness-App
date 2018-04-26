<template>
  <div>
    <!-- <calendar 
        class="test-fc"
        :events="fcEvents" 
        locale="en"
        first-day='1'
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick">

    
    </calendar> -->

    <!-- <div v-for="vent in this.Events"> -->

            <!-- <div style="display:inline-flex;"><h4 >Event:</h4></div><br> -->
            <!-- <div style="display:inline-flex;">Name: {{ vent.name }}</div><br> -->
            <!-- <div style="display:inline-flex;"> Event: {{ vent.event }}</div><br> -->
            <!-- <div style="display:inline-flex;">Date: {{ vent.day }}</div> -->
   
    <!-- </div> -->

    <div class="modal-backdrop-M" id="modal-M" v-if="show">
      <div class="modal-mask-M">
        <div class="modal-wrapper-M">
          <div class="modal-container-M" style="height:auto; overflow: auto;">

            <div class="modal-header-M">
              <slot name="header">
                <h1>New Event </h1>
                <h6 style="font-size:12px; padding-left:8px;"> {{ currentDay }}</h6>
              </slot>
            </div>

            <div class="modal-body-M">
              <slot name="body">
                <form style="">
                    <div class="Form-Container-M">New Event<input v-model="newEvent"  id="event" placeholder="New Event..." class="Form-Control-M" type="text"></div>
                </form>
              </slot>
            </div>

            <div class="modal-footer-M">

              <slot name="footer">

                  <button class="btn-M submit-M" v-on:click="createEvent" v-on:keyup.enter="createEvent" style="margin: 0;" >
                      create event
                  </button>
                  
                  <button class="btn-M submit-M" v-on:click="show = false" style=" margin: 0px 18px 0px 0px;">
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
  // import Calendar from 'vue-fullcalendar';


let demoEvents = [
    {
      title    : 'Sunny 725-727',
      start    : '2017-02-25',
      end      : '2017-02-27',
      cssClass : 'family'
    },
    {
      title : 'Lunfel 726-727',
      start : '2017-02-26',
      end : '2017-02-27',
      cssClass : ['home', 'work']
    },
  ];


    export default {
        props:[
        'currentUser',
 
        ],
        data() {
            return {
                // fcEvents : demoEvents,
                // show: false,
                // newEvent: '',
                // currentDay: null,
                // currentTile: {
                //     X: '',
                //     Y: ''
                // },
                // Events: []

            }
        },
        components: {
            // 'calendar': Calendar,
        },
        methods: {
            
        // changeMonth (start, end, current) {
        //     console.log('changeMonth', start, end, current)
        //     },
        // eventClick (event, jsEvent, pos) {
        //     console.log('eventClick', event, jsEvent, pos)
        //     },
        // dayClick (day, jsEvent, currentUser) {
        //     this.show = true;
        //     this.currentDay = day;
        //     this.currentTile.X = jsEvent.clientX;
        //     this.currentTile.Y = jsEvent.clientY;

        //     console.log('dayClick', day, jsEvent, this.currentUser)
            
        //     },
        // moreClick (day, events, jsEvent) {
        //     console.log('moreCLick', day, events, jsEvent)
        //     } , 
      
    

        // createEvent(day, currentUser) {
        //     console.log("create", this.currentTile.X, this.newEvent);           
        //     var newEvent = {
        //         name: this.currentUser.name,
        //         event: this.newEvent,
        //         X: this.currentTile.X,
        //         Y: this.currentTile.Y,
        //         day: this.currentDay,
        //     }

        //     // console.log(newEvent);
        //     this.Events.push(newEvent);
        //     this.newEvent = '';
        //     this.currentTile.X = '';
        //     this.currentTile.Y = '';
        //     this.show = false;
          
            
        // },
    },
        created: function () {
        
        },
    }

</script>


<style scoped>


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
}

.Form-Container-M p {
  margin: 0;
  padding-top: 14px;
}

</style>



