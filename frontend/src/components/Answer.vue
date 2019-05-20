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
        :key="componentKey"
      >
        <template v-slot:mark="{ pos, label }">
          <div class="custom-mark" :style="{ left: `${pos}%` }">
            {{ label }}
          </div>
        </template>
      </vue-slider>
    </div>
    <!--Just nu submitbutton för enkelhetens skull men sen fixa så att värdet skickas ändå om tiden går ut-->
    <div>Make your choice!</div>
    <br />
    <input :value="guess" />
    <button
      v-if="showSubmit"
      id="submit-button"
      :marks="marks"
      v-on:click="submitAnswer"
    >
      Submit
    </button>
    <!--select v-model="selected" @change="assignQuestion">
      <option v-for="(o, index) in loadedQuestions">{{ o.question }}</option>
    </-_select/-->
  </div>
</template>

<script>
  import VueSlider from "vue-slider-component";
  import "../assets/default.css";

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
      options: {
        dotSize: 20,
        width: "90%",
        height: 5,
        direction: "ltr",
        disabled: false,
        clickable: this.showSubmit,
        duration: 0.5,
        lazy: false,
        max: 100,
        min: 0,
        railStyle: {
          boxShadow: 'var(--glow-on)'
        },
        silent: false
      }
    };
  },
  computed: {
    min() {
      return this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1].low
    },
    max() {
      return this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1].high
    },
    marksArray() {
      let diff = Math.round(this.options.max - this.options.min);
      if (diff>3) {
          return [
              this.options.min,
              Math.round(this.options.min + diff * 0.25),
              Math.round(this.options.min + diff / 2),
              Math.round(this.options.min + diff * 0.75),
              this.options.max
          ];
      } else if (diff>2)
        {
            return [
                this.options.min,
                Math.round(this.options.min + diff / 0.5),
                this.options.max
            ];
        }
      else if (diff>1) {
          return [
              this.options.min,
              this.options.max
          ];
        }
      else return [this.options.max]
    },
    loadedQuestions() {
      return this.$store.state.loadedQuestions;
    },
    selectedIndex() {
      return this.loadedQuestions
              .map(function (e) {
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
      return !!(this.$store.state.animatingCharacters === false && this.isPlayer);
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
     return this.$store.state.wantLastMove
    }
  },

  watch: {
    //Watcher på när wantAnswer ändras och det är första rundan
    wantAnswers() {
      if (this.wantAnswers === true && this.firstRound === true)
        this.updateValueForSubmit();
    },
    //Uppdaterar guess sen när botten är klar med sitt moves ändras wantLastMove och den uppdateras.
    lastMove() {
      this.guess = this.lastMove.guess
      this.forceRerender
    },
  //Watcher på när lastMove ändras (dvs bottarna gör turns)
    wantLastMove() {
      if (this.$store.state.wantAnswers && this.firstRound === false && this.$store.state.wantLastMove===true) {
        //console.log("watcher wantLastMove running")
        this.updateValue();
      }
    },
    isPlayer() {
      if(this.isPlayer)
      this.setBoxShadowOnRail();
      else this.unsetBoxShadowOnRail();
    }
  },
  methods: {
    submitAnswer() {
      let newMove = { guess: this.guess, timeTook: 10 };
     // console.log(this.$store.getters.currentPlayer.name + ' gissar: ' + this.guess);
      this.$store
        .dispatch("addMove", newMove)
        .then(() => this.$store.dispatch("turnFinished"))
        .then(() => this.updateValue);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    resetGuessToMiddle() {
      this.guess = Math.round(
        this.options.min + (this.options.max - this.options.min) / 2
      );
    },
    updateLastPlayerGuess() {
      let temp = this.lastMove;
      if (typeof temp.guess != "undefined") {
        this.guess = temp.guess;
      } else {
        this.resetGuessToMiddle();
      }
    },
    setBoxShadowOnRail() {
      this.options.railStyle = {
        boxShadow: 'var(--glow-on)'
      }
      this.forceRerender()

    },
    unsetBoxShadowOnRail() {
      this.options.railStyle = {
      }
      this.forceRerender()

    },
    //0. Resettar Guess till middle
    updateValue() {
      this.resetGuessToMiddle();
      this.forceRerender();
      if (this.max + 1 - (this.min - 1) > 1) {
        this.options.max = this.max;
        this.forceRerender();
       // console.log('this.min: '+this.min)
        this.options.min = this.min;
        this.forceRerender();
        this.updateLastPlayerGuess();
        this.forceRerender();
        this.marks = this.marksArray;
        this.forceRerender();
      }
    },

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
    //Settar glow om det är en spelare
    mounted() {
    if(this.isPlayer)
      this.setBoxShadowOnRail()
      else this.unsetBoxShadowOnRail()
    }
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
  background-image: url("../../public/images/btnwood.jpg");
}

.boxShadowClass {
  box-shadow: 0 4px 8px 0 beige, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#submit-button {
  margin: 10px;
}

.custom-mark {
  color: beige;
  font-weight: bold;
  position: absolute;
  top: 15px;
  transform: translateX(-50%);
  white-space: nowrap;
}

</style>
