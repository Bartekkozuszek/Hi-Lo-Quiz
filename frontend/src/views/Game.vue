<template>
  <div
    class="thisDiv":style="{'background-image': `url(${require('../../public/images/background2fixed.jpg')})`}">
    <question-display></question-display>
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

export default {
  name: "Game",
  computed: {},
  components: {
    SpeechBubble,
    GuessResponse,
    QuestionDisplay,
    Answer,
    GameTable
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
