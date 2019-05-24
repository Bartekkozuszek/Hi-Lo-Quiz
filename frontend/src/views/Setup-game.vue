<template>
    <div id="setup"
         :style="{
      'background-image': `url(${require('../../public/images/background1.jpg')})`
    }">
        <HighScore v-if="this.$store.state.showHighScore "></HighScore>
        <add-question v-if="showAddQuestion"></add-question>
        <button @click="startGame" class="startButton">Start!</button>
        <br>
        <button @click="toggleAddQuestion" class="startButton">Submit a question</button>
        <br>
        <button @click="toggeShowHighscore" class="startButton">Highscores</button>
        <div class="botContainer" v-dragscroll.x="true">
            <div></div>
            <div class="loadedBots"
                 v-for="bot in bots"
                 :style="{
          'background-image': `url(${require('../../public/images/header1.png')})`
        }">
                <img class="playersImage" v-bind:src="bot.image" /> {{ bot.name }}
            </div>
            <div></div>
        </div>
        <div class="link"><router-link to="/bots">Change players</router-link></div>
    </div>
</template>

<script>
import SelectBots from "../components/SelectBots.vue";
import { dragscroll } from "vue-dragscroll";
    import HighScore from "../components/HighScore";
    import AddQuestion from "../components/AddQuestion.vue"

export default {
  directives: {
    dragscroll
  },
  name: "SetupGame",
  //mounted() {
  //    this.$store.dispatch('loadQuestions')
  //},
  components: {
    HighScore,
      SelectBots,
    AddQuestion
  },
  methods: {
    startGame() {
      this.$store.dispatch("loadQuestions", 1);
      this.$store.dispatch("changeGameState", 2);
    },
    toggeShowHighscore:function(){
      if (this.$store.state.showHighScore==true){
        this.$store.state.showHighScore=false;
      }else{
        this.$store.dispatch("loadHighScores");
        this.$store.state.showHighScore=true;
      }
      },
      toggleAddQuestion() {
          if (this.$store.state.showAddQuestion == true) {
              this.$store.state.showAddQuestion = false
          } else {
              this.$store.state.showAddQuestion = true
          }
      }
  },
  computed: {
    bots() {
      return this.$store.state.sessionPlayersArray;
      },
      showAddQuestion() {
          return this.$store.state.showAddQuestion;
      }
  }
};
</script>

<style scoped>
.botContainer {
  width: 42vw;
  margin-left: auto;
  margin-right: auto;
  height: 12vw;
  display: grid;
  grid-template-columns: 1vw repeat(var(--playerAmount), 12vw) 1vw;
  grid-template-rows: minmax(150px, 1fr);
  grid-column-gap: 1vw;
  background-color: black;
  overflow: hidden;
}
.playersImage {
  grid-column: 2 / -2;
  height: 9vw;
}
.link {
  color: white;
  padding: 2em;
}
.loadedBots {
  height: 90%;
  color: white;
  display: inline;
  border: thick;
  background-color: darkseagreen;
  font-size: 2vw;
}
#setup {
  position: absolute;
  background-image: linear-gradient(#1e1c1c, #645c5c);
  height: 94.5%;
  width:100%;
  alignment: center;
  background-size: 200%;
  background-position: top; /* Center the image */
  background-repeat: no-repeat;
  background-color: #2c231c;
  flex-grow : 1;
}
.startButton {
  margin: 2em;
  padding: 1em;
  width: 40%;
  background-color: lightsteelblue;
  font-size: large;
}
</style>
