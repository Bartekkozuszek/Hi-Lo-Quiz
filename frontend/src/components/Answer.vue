<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div class="answer-slider-container">
      <vue-slider ref="slider" v-model="guess" v-bind="options">
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
    <button id="change-question" v-on:click="assignQuestion">
      Assign new Question
    </button>
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
  data() {
    return {
      value: null,
      guess: null,
      previousLow: 1,
      options: {
        dotSize: 20,
        width: "90%",
        height: 5,
        direction: "ltr",
        interval: 1,
        disabled: false,
        clickable: true,
        marks: true,
        duration: 0.2,
        lazy: false,
        adsorb: true
      }
    };
  },
  computed: {
    min() {
      return (
        this.$store.state.moveHistory.moves[
          this.$store.state.moveHistory.moves.length - 1
        ].low + 1
      );
    },
    max() {
      return (
        this.$store.state.moveHistory.moves[
          this.$store.state.moveHistory.moves.length - 1
        ].high - 1
      );
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
    updateValue() {
      if (this.max - this.min > 1) {
        this.options.max = this.max;
        this.guess = Math.round(this.previousLow + (this.options.max - this.options.previousLow) / 2)
        this.options.min = this.min;
        this.previousLow = this.min;
        this.$nextTick(() => {
          this.$refs.slider.setValue(
            Math.round(
              this.options.min + (this.options.max - this.options.min) / 2
            )
          );
        });
      }
    },
    assignQuestion() {
      this.$store.dispatch("assignQuestion", 1).then(this.updateValue());
    }
  },
  mounted() {
    this.updateValue();
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
