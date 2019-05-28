<template>
  <div
    class="thisDiv"
    :style="{
      'background-image': `url(${require('../../public/images/bg.jpg')})`
    }"
  >
    <question-display></question-display>
    <GameClock></GameClock>
    <guess-response></guess-response>
    <SpeechBubble></SpeechBubble>
    <GameTable></GameTable>
    <answer></answer>
  </div>
</template>

<script>
import QuestionDisplay from "../components/QuestionDisplay.vue";
import Answer from "../components/Answer.vue";
import GameTable from "../components/GameTable.vue";
import GuessResponse from "../components/GuessResponse";
import SpeechBubble from "../components/SpeechBubble";
import GameClock from "../components/GameClock";
export default {
  name: "Game",
  computed: {},
  components: {
    SpeechBubble,
    GuessResponse,
    QuestionDisplay,
    Answer,
    GameTable,
    GameClock
  }
};
</script>

<style>
.thisDiv {
  height: 94.5vh;
  background-position: center;
  background-size: 310vh;
}
</style>
