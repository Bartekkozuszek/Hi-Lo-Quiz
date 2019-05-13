<template>
  <div>
    <div class="answer-slider-container">
      <vue-slider v-model="guess" v-bind="options"></vue-slider>
    </div>
    <!--Just nu submitbutton för enkelhetens skull men sen fixa så att värdet skickas ändå om tiden går ut-->
    <button id="submit-button" v-on:click="submitAnswer">Submit</button>
    <p>Selected value is: {{ guess }}</p>
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
      guess: "",
      options: {
        dotSize: 20,
        width: "75%",
        height: 4,
        direction: "ltr",
        min: 0,
        max: 10,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.2,
        lazy: false
      }
    };
  },
  methods: {
    submitAnswer() {
      let newMove = { guess: this.guess, timeTook: 10 };
      this.$store.dispatch("addMove", newMove).then(this.$store.dispatch("turnFinished"));

    }
  }
};
</script>

<style>
.answer-slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

#submit-button {
  margin: 10px;
}
</style>
