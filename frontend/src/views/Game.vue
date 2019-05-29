<template>
  <div class="first">

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
    html {
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .first {
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;

    }
</style>
