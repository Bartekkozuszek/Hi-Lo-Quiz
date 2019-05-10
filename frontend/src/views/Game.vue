<template>
    <div class="question">
        <question-display></question-display>
        <answer></answer>
        <h3> {{currentQuestion}} </h3>
    </div>

</template>

<script>
    import QuestionDisplay from "../components/QuestionDisplay.vue"
    import Answer from "../components/Answer.vue"

    export default {
        name: "Game",
        computed:{
        },
        components : {
            QuestionDisplay,
            Answer
        }
    }
</script>

<style>
    .question {
        border: thin solid black;
        background-color: lemonchiffon
    }
</style>