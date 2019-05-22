<template>
    <div id="winScreenWindow"
         :style="{'background-image': `url(${require('../../public/images/background2fixed.jpg')})`}">
        <question-display></question-display>
        <a :href="getUrl()" target="_blank">
            <img id="knowMore" :src="this.$store.state.images.wantToKnowMore">
        </a>
        <div class="answerText">
            <p class="darkenBG answerText">The right answer is: {{this.$store.state.currentQuestion.answer}} </p>
        </div>

        <div class="winnerImage">
            <img class="darkenBG" :src="winnerImage"></img>
            <div class="darkenBG">
                <p>Player:{{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].name}}</p>
                <p>Wins: {{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].wins}}</p>
                <p>Losses: {{this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].losses}}</p>
            </div>
        </div>

        <div :style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}"
                class="Backbtn" @click="goToMenu">Back</div>
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
            }
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
    p{
        color:beige;
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
        display: inline-block;
        padding: 11px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        color: beige;
        border: 1px solid #a0a08d;
        width: 250px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: 0.4s;
        cursor: pointer;
    }

    .Backbtn:hover {
        border: #474a5d;
    }





</style>
