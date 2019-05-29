<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="answer-container" v-if="wantAnswers">
    <div
            class="answer-slider-container"
            v-bind:class="{ boxShadowClass: isPlayer }"
    >
      <vue-slider
              ref="slider"
              v-model="guess"
              :marks="marksArray"
              v-bind="options"
              :clickable="showSubmit"
              :disabled="!showSubmit"
              :key="componentKey"
              v-on:change="setValueToGuess"
              v-bind:class="{hide: pressed}"
      >
        <template v-slot:mark="{ pos, label }">
          <div class="custom-mark" :style="{ left: `${pos}%` }">
            {{ label }}
          </div>
        </template>
      </vue-slider>
    </div>

    <div class="textChoice">Make your choice!</div>
    <br />
    <input
            ref="input"
            v-model.number="value"
            type="number"
            v-on:change="setGuessToValue"
            autofocus="autofocus"
    />
    <button class="submit-button" v-on:click.self="submitAnswer" :disabled="!showSubmit">
      Submit
    </button>
    <button class="submit-button" v-on:click="pressed = !pressed">{{this.buttonMessage}}</button>
    <!--select v-model="selected" @change="assignQuestion">
      <option v-for="(o, index) in loadedQuestions">{{ o.question }}</option>
    </-_select/-->
  </div>
</template>

<script>
  import VueSlider from "vue-slider-component";
  import "../assets/default.css";
  import { debounce } from "debounce";
  export default {
    name: "Answer",
    components: {
      VueSlider
    },
    data: function() {
      return {
        guess: 1,
        componentKey: 0,
        selected: "",
        marks: [],
        value: 0,
        pressed: false,
        options: {
          dotSize: 20,
          width: "90%",
          height: 5,
          direction: "ltr",
          duration: 0.5,
          max: 100,
          min: 0,
          contained: true,
          railStyle: {
            boxShadow: "var(--glow-on)"
          },
          silent: false,
          lazy: true
        }
      };
    },
    computed: {
      min() {
        return this.$store.state.moveHistory.moves[
        this.$store.state.moveHistory.moves.length - 1
                ].low;
      },
      max() {
        return this.$store.state.moveHistory.moves[
        this.$store.state.moveHistory.moves.length - 1
                ].high;
      },
      msg() {
        if (this.isPlayer) return "Make your choice!";
        else return "Other players turn, please wait";
      },
      buttonMessage() {
        if (this.pressed){
          return "Easy mode (Show Slider)"
        }
        else return "Hard mode (Hide Slider)"
      },
      //Funktion för vilka tal som ska visas under slidern. Mer än 4 tal visas 5 alternativ, 4-tal 4 etc.
      marksArray() {
        let diff = Math.round(this.options.max - this.options.min);
        if (diff > 4) {
          return [
            this.options.min,
            Math.round(this.options.min + diff * 0.25),
            Math.round(this.options.min + diff / 2),
            Math.round(this.options.min + diff * 0.75),
            this.options.max
          ];
        } else if (diff > 3) {
          return [
            this.options.min,
            Math.round(this.options.min + diff * (1 / 3)),
            Math.round(this.options.min + diff * (2 / 3)),
            this.options.max
          ];
        } else if (diff > 2) {
          return [
            this.options.min,
            Math.round(this.options.min + diff / 0.5),
            this.options.max
          ];
        } else if (diff > 1) {
          return [this.options.min, this.options.max];
        } else return [this.options.max];
      },
      loadedQuestions() {
        return this.$store.state.loadedQuestions;
      },
      selectedIndex() {
        return this.loadedQuestions
                .map(function(e) {
                  return e.question;
                })
                .indexOf(this.selected);
      },
      moves() {
        return this.$store.state.moveHistory.moves;
      },
      lastMove() {
        return this.$store.getters.lastMove;
      },
      isPlayer() {
        return this.$store.getters.currentPlayer.isPlayer;
      },
      showSubmit() {
        return !!(
                this.$store.state.animatingCharacters === false && this.isPlayer
        );
      },
      currentQuestion() {
        return this.$store.state.currentQuestion;
      },
      wantAnswers() {
        return this.$store.state.wantAnswers;
      },
      firstRound() {
        return this.$store.state.moveHistory.moves.length < 2;
      },
      wantLastMove() {
        return this.$store.state.wantLastMove;
      },
      timesUp() {
        return this.$store.state.timesUp;
      }
    },
    watch: {
      //Watcher på när wantAnswer ändras och det är första rundan
        // Updatar values och fokusar inputfältet
      wantAnswers() {
        if (this.wantAnswers === true && this.firstRound === true) {
            this.updateValueForSubmit();
        }
        this.resetGuessToMiddle();
        this.setValueToGuess();
      },
      //Uppdaterar guess sen när botten är klar med sitt moves ändras wantLastMove och den uppdateras.
      // Kollar även om siffran är utanför range och isåfall sätter den maxsiffran i slidern
      lastMove() {
        if (this.lastMove.guess > this.options.max) {
          this.guess = this.options.max;
        } else if (this.lastMove.guess < this.options.min) {
          this.guess = this.options.min;
        } else {
          this.guess = this.lastMove.guess;
        }
        this.setValueToGuess();
        this.forceRerender();
      },
      //Watcher på när lastMove ändras (dvs bottarna gör turns)
      wantLastMove() {
        if (
                this.$store.state.wantAnswers &&
                this.firstRound === false &&
                this.$store.state.wantLastMove === true
        ) {
          this.updateValue();
        }
      },
      isPlayer() {
        if (this.isPlayer) {
          this.setBoxShadowOnRail();
        } else this.unsetBoxShadowOnRail();
      },
      timesUp() {
        if (this.timesUp===true) {
          this.submitAnswer()
        }
      },

    },
    methods: {
      // Metod som körs när man klickar på submit eller tiden har gått ut.
      // Input validation på att det är att nummer som skickas in mm. annars sätts value till minsta möjliga.
      // Om guess inte är ett tal eller illegal sätts gissning till middle nu.
      submitAnswer() {
        if (typeof this.value == !"number" || this.value == "") {
          this.value = this.options.min;
          this.setGuessToValue();
          this.forceRerender();
          console.log(
                  "no guess was made, so guess automatically set to lowest of span"
          );
        }
        let newMove = { guess: this.value, timeTook: 10};
        newMove.id=this.$store.state.currentUser.id
        this.$store
                .dispatch("addMove", newMove)
                .then(() => this.$store.dispatch("turnFinished"))
                .then(() => this.updateValue).then(() => this.$store.state.timesUp = false);
      },
      setValueToGuess() {
        this.value = this.guess;
        this.forceRerender();
      },
      // Uppdaterar guess (bindat värde för slidern) till value (för inputfältet). Kollar att värdet inte är utanför bounds för slidern och om det är det sätter slidern till max/min instället.
      setGuessToValue() {
        if (
                typeof this.value == "number" &&
                this.value <= this.options.max &&
                this.value >= this.options.min
        ) {
          this.guess = this.value;
          this.forceRerender();
        } else if (
                typeof this.value == "number" &&
                this.value > this.options.max
        ) {
          this.guess = this.options.max;
          this.forceRerender();
        } else if (
                typeof this.value == "number" &&
                this.value < this.options.min
        ) {
          this.guess = this.options.min;
          this.forceRerender();
        }
      },
      forceRerender() {
        this.componentKey += 1;
      },
      resetGuessToMiddle() {
        this.guess = Math.round(
                this.options.min + (this.options.max - this.options.min) / 2
        );
      },
      //Settar gisssningen till det senaste spelaren har gissat. Kollar för undefined och om det är för stort eller inte.
      updateLastPlayerGuess() {
        let temp = this.lastMove;
        if (typeof temp.guess != "undefined") {
          if (temp.guess > this.options.max) {
            this.guess = this.options.max;
          } else if (temp.guess < this.options.min) {
            this.guess = this.options.min;
          } else {
            this.guess = temp.guess;
          }
        } else {
          this.resetGuessToMiddle();
        }
      },
      setBoxShadowOnRail() {
        this.options.railStyle = {
          boxShadow: "var(--glow-on)"
        };
        this.forceRerender();
      },
      unsetBoxShadowOnRail() {
        this.options.railStyle = "var(--glow-off)";
        this.forceRerender();
      },
      // Används när man spelare /bottar har gissat för att byta tur.
      //0. Resettar Guess till middle
      //1. Sätter sedan nya min och max värden
      //2. Sätter värdet för senaste gissningen
      //3. Uppdaterar Marks arrayen.
      updateValue() {
        this.resetGuessToMiddle();
        this.forceRerender();
        if (this.max + 1 - (this.min - 1) > 1) {
          this.options.max = this.max;
          this.forceRerender();
          this.options.min = this.min;
          this.forceRerender();
          this.updateLastPlayerGuess();
          this.forceRerender();
          this.marks = this.marksArray;
          this.forceRerender();
        }
      },
      // Används när en ny fråga laddas in och intervallen på slidern behöver uppdateras.
      //0. Kollar först åt vilket håll intervallet ändras, fallen nedan är om nya max är större än tidigare, blir inverted annars med att vi ökar min först.
      //1. Sätter nytt max värde
      //2. Rerender
      //3. Uppdatera guess till optionsMax(eftersom vi vet att den kommer finnas med i intervallet)
      //4. När den är klar med detta sätt min till uppdaterade min
      //5. Rerender
      //6. Sätter guess till mitten mellan max och min.
      //7. Rerender
      //8. Settar Marks i modellen
      //10. Rerender
      updateValueForSubmit() {
        if (this.max >= this.options.max) {
          this.options.max = this.max;
          this.forceRerender();
          this.guess = this.options.max - 1;
          this.forceRerender();
          this.options.min = this.min;
          this.forceRerender();
        } else if (this.max < this.options.max) {
          this.options.min = this.min;
          this.forceRerender();
          this.guess = this.options.min + 1;
          this.forceRerender();
          this.options.max = this.max;
          this.forceRerender();
        }
        this.resetGuessToMiddle();
        this.forceRerender();
        this.marks = this.marksArray;
        this.forceRerender();
      },
      assignQuestion() {
        this.$store.dispatch("assignQuestion", this.selectedIndex).then(() => {
          this.updateValueForSubmit();
        });
      }
    },
    //Settar glow om det är en spelare som är först på tur
    mounted() {
      if (this.isPlayer) {
        this.setBoxShadowOnRail();
      } else {
        this.unsetBoxShadowOnRail();
      }
    },
    // för att fokusera input fältet, debounce för att updated inte ska kolla för ofta.
      updated: debounce(function () {
          this.$nextTick(() => {
              if(this.isPlayer === true) {
                if (this.$refs.input!='undefined') {
                  this.$refs.input.focus()
                }
              } else
                if (!this.$refs.input!='undefined') {
                  this.$refs.input.blur()
                }
          })
      }, 250)
  };
</script>

<style>
  .answer-container {
    margin-top: 100px;
  }
  .answer-slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }

  .submit-button {
    background-color: var(--themeColor2);
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
  .submit-button:hover{
    background-color: #ce4010;
    transition: 0.4s;
  }

  input{
    padding:10px 8px;
    border-radius: 22px;
    min-width: 200px;
    background:#3c47a5;
    border: none;
    color: #ffffff;
    font-size: 13px;
    text-align: center;

  }
  .hide {
    opacity: 0;
  }
  .textChoice {
    color: #ffffff;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    letter-spacing: 0.5px;

    text-decoration:underline solid var(--themeColor2);
  }

  .custom-mark {
    color: white;
    font-weight: bold;
    position: absolute;
    top: 15px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
</style>
