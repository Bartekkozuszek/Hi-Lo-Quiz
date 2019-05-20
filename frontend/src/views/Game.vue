<template>
  <div
    class="thisDiv"
    :style="{
      'background-image': `url(${require('../../public/images/background2fixed.jpg')})`
    }"
  >
    <question-display></question-display>
    <guess-response></guess-response>
    <GameTable></GameTable>
    <answer></answer>
  </div>
</template>

<script>
import QuestionDisplay from "../components/QuestionDisplay.vue";
import Answer from "../components/Answer.vue";
import GameTable from "../components/GameTable.vue";
import GuessResponse from "../components/GuessResponse";

export default {
  name: "Game",
  computed: {},
  components: {
    GuessResponse,
    QuestionDisplay,
    Answer,
    GameTable
  }
};
</script>

<style>
.thisDiv {
  height: 87vh;
  background-position: center;
  background-size: 310vh;
}
</style>
