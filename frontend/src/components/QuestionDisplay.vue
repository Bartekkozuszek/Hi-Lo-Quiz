<template>
  <div class="question">
    <h3 class="col-md-12 row">{{ currentQuestion }}</h3>
  </div>
</template>

<script>
export default {
  name: "QuestionDisplay",
  computed: {
    currentQuestion() {
      return this.$store.state.currentQuestion.question;
    }
  }
};
</script>

<style>
.question {
  background-color: #3c47a5;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  min-width: 200px;
  font-family: 'Source Sans Pro', sans-serif;
  border-radius: 22px;

}
</style>
