<template>
  <div>
    <question-display></question-display>
    <GameTable></GameTable>
    <answer></answer>
  </div>
</template>

<script>
import QuestionDisplay from "../components/QuestionDisplay.vue";
import Answer from "../components/Answer.vue";
import GameTable from "../components/GameTable.vue";

export default {
  name: "Game",
  computed: {},
  components: {
    QuestionDisplay,
    Answer,
    GameTable
  }
};
</script>

<style></style>
