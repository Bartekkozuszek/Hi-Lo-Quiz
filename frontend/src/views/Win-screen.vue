<template>
    <div id="winScreenWindow"
         :style="{'background-image': `url(${require('../../public/images/bg.jpg')})`}">
        <question-display></question-display>
        <a :href="getUrl()" target="_blank">
            <img id="knowMore" :src="this.$store.state.images.wantToKnowMore">
        </a>
        <br>
        <br>
        <div class="answerText">
            <p class=" answerText">The right answer is: {{this.$store.state.currentQuestion.answer}} </p>
        </div>
        <br>


        <div class="winnerImage">
            <img class="BG" :src="winnerImage"></img>
            <div class="BG">
                <p>Player: {{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].name}}</p>
                <p>Guesses: {{totalGuesses}}</p>
                <p>Wins: {{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].wins}}</p>
                <p>Losses: {{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].losses}}</p>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>

        <div class="Backbtn" @click="goToMenu">Back</div>
    </div>
</template>

<script>
    import QuestionDisplay from "../components/QuestionDisplay.vue";
    import background from "../../public/images/background2.jpg"

    export default {
        name: "Win-screen",
        components:{
            QuestionDisplay,
        },
        methods:{
            goToMenu:function(){
                this.$store.dispatch('changeGameState', 1)
            },
            getUrl:function(){
                return this.$store.state.currentQuestion.learnMore;
            }
        },

        computed:{
            winnerImage:function(){

               return this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].image;
            },
            totalGuesses:function () {
                return Math.ceil((this.$store.state.moveHistory.moves.length-1)/
                this.$store.state.sessionPlayersArray.length);
            }
        },
        beforeMount() {
            this.$store.dispatch("loadHighScores");
            this.$store.dispatch("loadBotStats");
        }
    }
</script>

<style scoped>
    #knowMore{
        position: absolute;
        left: 80%;
        width:6vw;
        min-width: 70px;
        top:15%;
        z-index: 1;
    }

    .winnerImage{
        display: grid;
        grid-template-columns: auto 10vw;
        height:40vw;
        max-height:300px;
        justify-content: center;
        right:30%;

    }
    .answerText{
        display: grid;
        justify-content: center;
    }
    .darkenBG{
        background-color: rgba(0,0,0,0.5);
    }
    #knowMore{
        margin: 20px;
    }
    p{
        color:white;
    }
    img{
        width: 35vw;
        max-width: 300px;
    }
    #winScreenWindow{
        height:87vh;
        background-position: center;
        background-size: 310vh;
    }
    .Backbtn{
        background-color: var(--themeColor2); /* Green */
        border: none;
        color: white;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 13px;
        margin: 4px 2px;
        cursor: pointer;
        min-width: 200px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin: 10px 0;
    }

    .Backbtn:hover {
        background-color: #ce4010;
        transition: 0.4s;
    }

    @media screen and (max-width: 600px) {
        #knowMore{
            position: absolute;
            left: 0%;
            width:6vw;
            min-width: 70px;
            top:50%;
            z-index: 1;
        }
    }




</style>
