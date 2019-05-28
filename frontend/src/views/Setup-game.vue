<template>




    <div id="setup">

        <div class="container">
            <br>
            <br>
            <br>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <p>Your opponents:</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 col-2 arrow_container_left">
                    <a href="#" class="arrow_blue">
                        <img src="../../public/images/arrow_left.png" alt="">
                    </a>
                </div>
                <div class="col-md-6 col-8">
                    <div class="botContainer" v-dragscroll.x="true">
                        <div></div>
                        <div class="loadedBots"
                             v-for="bot in bots"

                        >
                            <img class="playersImage" v-bind:src="bot.image" /> <p>{{ bot.name }}</p>
                        </div>

                    </div>
                </div>

                    <div class="col-md-3 col-2 arrow_container_right">
                        <a href="#" class="arrow_blue">
                            <img src="../../public/images/arrow_right.png" alt="">
                        </a>
                    </div>

            </div>
            <div class="row">
                <div class="col-md-12 change_player_link_container">
                    <router-link to="/bots">Change players</router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p>Selected category is: {{selected}}</p>
                    <select v-model="selected" @change="setSelectedCategory">
                        <option v-for="(o, index) in categories">{{ o }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button @click="startGame" class="startButton">Play</button>
                </div>
            </div>
            <br>
            <br>


        </div>
        <HighScore v-if="this.$store.state.showHighScore "></HighScore>
        <add-question v-if="showAddQuestion"></add-question>

        <br>
        <button @click="toggleAddQuestion" class="startButton">Submit a question</button>
        <br>
        <button @click="toggeShowHighscore" class="startButton">Highscores</button>




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
  data: function() {
    return {
      selected : "random",
    }
  },
  methods: {
    startGame() {
        this.$store.commit("clearMoveHistory")
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
      },
          setSelectedCategory() {
      this.$store.commit("setSelectedCategory", this.selectedIndex)
    }

  },
  computed: {
    bots() {
      return this.$store.state.sessionPlayersArray;
    },
    categories() {
      return this.$store.state.categories;
    },
    selectedIndex() {
      return this.categories.indexOf(this.selected);
      },
      showAddQuestion() {
          return this.$store.state.showAddQuestion;
      }

  },
  mounted() {
   this.$store.dispatch("loadCategories");
      }


};
</script>

<style scoped>

    html {
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    p {
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
    }
    .arrow_container_left {
         text-align: right;
     }
    .arrow_container_right {
        text-align: left;
    }
    .arrow_blue {
        background: #3c47a5;
        display: inline-block;
        padding: 7px 17px;
        border-radius: 100%;
        margin-top: 60px;
        cursor: pointer;
    }

    .arrow_blue:hover {
        opacity: 0.7;
        transition: 0.2s;

    }

    .change_player_link_container {
        padding-bottom: 30px;
    }

    .change_player_link_container a{
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 11px;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #db6124;
        text-decoration:none;
    }

    .change_player_link_container a:hover {
        border-bottom: 1px solid #ce4010;
        color: #f3f3f3;
        transition: 0.2s;

    }

    select {
        padding:10px 8px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        min-width: 200px;
        background:#3c47a5;
        border: none;
        color: #ffffff;
        font-size: 13px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
.botContainer {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 12vw;
  display: grid;
  grid-template-columns: 1px repeat(var(--playerAmount), 10vw) 1px;
  grid-template-rows: none;
  overflow: hidden;
}
.playersImage {
  grid-column: 2 / -2;
  height: 8vw;
}
.link {
  color: white;
  padding: 2em;
}
.loadedBots {
  height: 90%;
  display: inline;
}

.loadedBots p {
    font-size: 11px;
    color: #ffffff;
    padding-top: 10px;
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
    background: url(../../public/images/bg.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.startButton {

    background-color: #db6124; /* Green */
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
    .startButton:hover{
        background-color: #ce4010;
        transition: 0.4s;
    }
</style>
