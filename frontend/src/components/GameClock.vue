<template>

    <div class="container center" id="app">
        <div class="center padding-4">
            <div id="timer2" v-html="time"></div>
            <div class="placeholder">
                <div v-bind="timerRun()" v-if="!timerRunning">Start</div>
                <div @click="timerPause" v-if="!timerRunning">Pause</div>
                <div @click="timerReset" v-if="!timerRunning">Restart</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GameClock",
        data: function() {
            return {
                totalTime: (30),
                timerRunning: false,
                timerPaused: false,
                interval: null
            }
        },
                computed: {
                time: function() {
                    return this.seconds;
                },
                minutes: function() {
                    var min = Math.floor(this.totalTime / 60);
                    return min >= 0 ? min : '0' + min;
                },
                seconds: function() {
                    var sec = this.totalTime - (this.minutes * 60);
                    return sec >= 0 ? sec : '0' + sec;
                }
            },
            methods: {
                timerRun() {
                    this.timerRunning = true;
                    this.interval = setInterval(this.countdownTimer, 1000);
                },
                timerPause() {
                    this.timerRunning = false;
                    clearInterval(this.interval);
                },
                timerReset() {
                    this.timerRunning = true;
                    clearInterval(this.interval);
                   // clearInterval( () => { this.interval; });
                    this.totalTime = (30);
                },
                countdownTimer() {
                    if (this.timerRunning == true) {
                        this.totalTime--;
                    }if(this.totalTime == 0){
                        return this.timerReset();

                    }
                }
            }
        }

</script>

<style scoped>

   #timer2{
       font-size: 70px;

   }

   /*.buttons {
       text-align: center;
   }*/

/*   .buttons button {
       background-color: #363636;
       color: #f5f5f5;
       border: none;
       padding:12px;
   }*/

</style>
