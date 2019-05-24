<template>

    <div class="container center" v-show="showClock()" id="app">
        <div class="center padding-4">
            <div id="timer2" v-html="time"></div>
            <div class="placeholder">
                <div v-bind="clockLogic"></div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GameClock",
        data: function() {
            return {
                totalTime:this.$store.state.totalMatchTime,
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
                },
                clockLogic: function(){
                    let run=this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].isPlayer;
                    if (run && this.$store.state.animatingCharacters ==false){
                        this.timerRun();
                    }else {
                        this.timerReset();
                    }
                }
            },
            methods: {
                showClock:function(){

                    if(this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].isPlayer &&
                        this.$store.state.animatingCharacters ==false){
                        return true;
                    }
                    return false;
                },
                timerRun() {
                    this.timerRunning = true;
                    this.interval = setInterval(this.countdownTimer, 1000);
                },
                //Prepared function if we want to implement a total time for an entire round
                timerPause() {
                    this.timerRunning = false;
                    clearInterval(this.interval);
                },
                timerReset() {
                    this.timerRunning = true;
                    clearInterval(this.interval);
                    this.totalTime = this.$store.state.totalMatchTime;
                },
                countdownTimer() {
                    if (this.timerRunning == true) {
                        this.totalTime--;
                    }if(this.totalTime == 0){
                        this.$store.state.timesUp = true;
                        return this.timerReset();

                    }
                },
            },

        }

</script>

<style scoped>

   #timer2{
       position: absolute;
       z-index: 100;
       left: 73%;
       font-size: 50px;
       background-color: rgba(0,9,25,0.9);
       color: beige;
   }

</style>
