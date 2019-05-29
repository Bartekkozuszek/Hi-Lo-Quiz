<template>
  <div class="question">
    <p class="col-md-12 row">{{ currentQuestion }}</p>
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
  font-size: 22px;
  margin: 4px 2px;
  min-width: 200px;
  font-family: 'Source Sans Pro', sans-serif;
  border-radius: 22px;
}
@media screen and (max-width: 600px){
  .question {
    background-color: #3c47a5;
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 2px;
    min-width: 200px;
    font-family: 'Source Sans Pro', sans-serif;
    border-radius: 22px;
  }

}
</style>
