<template>
  <div>
    <calendar 
        class="test-fc"
        :events="fcEvents" 
        locale="en"
        first-day='1'
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick">
    </calendar>
  </div>
</template>


<script>
  import Calendar from 'vue-fullcalendar';


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
    {
      title : 'Lunfel 2/27-2/28',
      start : '2017-02-27',
      end : '2017-02-28'
    },
    {
        title : 'Lunfel 2/27-2/28',
        start : '2017-02-27',
        end : '2017-02-28'
    },
    {
        title : 'Lunfel 2/27-2/28',
        start : '2017-02-27',
        end : '2017-02-28'
    },
    {
        title : 'Lunfel 2/26-3/05',
        start : '2017-02-26',
        end : '2017-03-05'
    },
    {
        title : 'Lunfel 1/27-1/28',
        start : '2017-01-27',
        end : '2017-01-28'
    },
    {
        title : 'Lunfel 1/27-2/2',
        start : '2017-01-27',
        end : '2017-02-02'
    },
    {
        title : 'Lunfel 3/27-3/28',
        start : '2017-03-27',
        end : '2017-03-28'
    },
  ];


    export default {
        props:[
        'currentUser',
 
        ],
        data() {
            return {
            fcEvents : demoEvents
            }
        },
        components: {
            'calendar': Calendar,
        },
        methods: {
            
        changeMonth (start, end, current) {
            console.log('changeMonth', start, end, current)
            },
        eventClick (event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos)
            },
        dayClick (day, jsEvent, currentUser) {
            console.log('dayClick', day, jsEvent, this.currentUser)
            },
        moreClick (day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent)
            } , 
      
        },

        created: function () {
        
        },
    }

</script>


<style scoped>

</style>



