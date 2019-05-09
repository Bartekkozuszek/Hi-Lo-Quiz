<template>
    <div class="question">
        <h3> {{currentQuestion}} </h3>
    </div>
</template>

<script>
    export default {
        name: "QuestionDisplay", 
        computed: {
            currentQuestion() {
                return this.$store.state.currentQuestion.question
            }
        }
    }
</script>

<style>
    .question {
        border: thin solid black;
        background-color: lemonchiffon
    }
</style>