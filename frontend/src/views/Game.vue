<template>
  <div>
    <question-display></question-display>
    <answer></answer>
  </div>
</template>

<script>
import QuestionDisplay from "../components/QuestionDisplay.vue";
import Answer from "../components/Answer.vue";

export default {
  name: "Game",
  computed: {},
  components: {
    QuestionDisplay,
    Answer
  }
};
</script>

<style></style>
