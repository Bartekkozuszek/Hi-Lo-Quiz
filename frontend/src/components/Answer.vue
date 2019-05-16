<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div class="answer-slider-container">
      <vue-slider ref="slider" v-model="guess" v-bind="options" :marks="marks">
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
    <button id="submit-button" v-on:click="submitAnswer">Submit</button>
    Assign new Question:
    <select v-model="selected" @change="assignQuestion">
      <option v-for="(o, index) in loadedQuestions">{{ o.question }}</option>
    </select>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "Answer",
  components: {
    VueSlider
  },

  data: function() {
    return {
      guess: 0,
      selected: "",
      marks: val => {
        let diff = this.options.max - this.options.min;
        if (diff <= 20) return val;
        else if (diff <= 40) return val % 2 === 0;
        else if (diff <= 80) return val % 4 === 0;
        else if (diff <= 200) return val % 10 === 0;
        else if (diff <= 400) return val % 40 === 0;
        else if (diff <= 1000) return val % 100 === 0;
        else return (val % diff) / (diff / 10) === 0;
      },
      options: {
        dotSize: 20,
        width: "90%",
        height: 5,
        direction: "ltr",
        disabled: false,
        clickable: true,
        duration: 0.2,
        lazy: false
      }
    };
  },
  computed: {
    min() {
      let num = this.$store.state.moveHistory.moves[
        this.$store.state.moveHistory.moves.length - 1
      ].low;
      return num;
    },
    max() {
      let num = this.$store.state.moveHistory.moves[
        this.$store.state.moveHistory.moves.length - 1
      ].high;
      return num;
    },
    loadedQuestions() {
      return this.$store.state.loadedQuestions;
    },
    selectedIndex() {
      let pos = this.loadedQuestions
        .map(function(e) {
          return e.question;
        })
        .indexOf(this.selected);
      return pos;
    }
  },
  methods: {
    submitAnswer() {
      let newMove = { guess: this.guess, timeTook: 10 };
      this.$store
        .dispatch("addMove", newMove)
        .then(this.$store.dispatch("turnFinished"))
        .then(this.updateValue);
    },
    //Sets guess to average rounded up to nearest int
    //Kollar så att det finns 2 eller mer platser kvar, annars sker ingen uppdatering.
    updateValue() {
      if (this.max + 1 - (this.min - 1) > 1) {
        this.options.max = this.max;
        this.options.min = this.min;
        this.$nextTick(() => {
          this.$refs.slider.setValue(
            Math.round(this.min + (this.max - this.min) / 2)
          );
        });
      }
    },

    //0. Kollar först åt vilket håll intervallet ändras, fallen nedan är om nya max är större än tidigare, blir inverted annars med att vi ökar min först.
    //1. Sätter nytt max värde
    //2. Uppdaterar guess för att uppdatera modellen (om den är mindre än föregående max lägg till en, annars dra bort en), för att slidern inte alltid är uppdaterad
    //3. Await så att den väntar tills den är klar med att uppdatera guess till optionsMax(eftersom vi vet att den kommer finnas med i intervallet)
    //4. När den är klar med detta sätt min till uppdaterade min
    //5. Uppdaterar guess med-1 för att uppdatera modellen
    //6. Sätter guess till mitten mellan max och min.
    async updateValueForSubmit() {
      if (this.max >= this.options.max) {
        this.options.max = this.max;
        if (
          this.guess <
          this.$store.state.moveHistory.moves[
            this.$store.state.moveHistory.moves.length - 2
          ].max -
            1
        )
          this.guess++;
        else this.guess--;
        await this.$nextTick(() => {
          this.guess = this.options.max - 1;
        });
        this.options.min = this.min;
        if (this.guess < this.options.max - 1) this.guess++;
        else this.guess--;
      } else if (this.max < this.options.max) {
        this.options.min = this.min;
        if (
          this.guess <
          this.$store.state.moveHistory.moves[
            this.$store.state.moveHistory.moves.length - 2
          ].max -
            1
        )
          this.guess++;
        else this.guess--;
        await this.$nextTick(() => {
          this.guess = this.options.min + 1;
        });
        this.options.max = this.max;
        if (this.guess < this.options.max - 1) this.guess++;
        else this.guess--;
      }
      //Här sätts det riktiga värdet
      await this.$nextTick(() => {
        this.guess = this.guess = Math.round(
          this.options.min + (this.options.max - this.options.min) / 2
        );
      });
    },
    assignQuestion() {
      this.$store
        .dispatch("assignQuestion", this.selectedIndex)
        .then(this.updateValueForSubmit);
    }
  },
  mounted() {
    this.updateValue();
    //this.updateMarks()
  }
};
</script>

<style>
.answer-slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

#submit-button {
  margin: 10px;
}

.custom-mark {
  color: crimson;
  position: absolute;
  top: 15px;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
