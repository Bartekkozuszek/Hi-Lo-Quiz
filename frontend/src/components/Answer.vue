<template>
    <div>
        <input v-model="guess" v-on:keyup.enter="submitAnswer">
        <p>Message is: {{guess}} </p>
    </div>
</template>

<script>
    export default {
        name: "Answer",
        data() {
            return {
                guess : ""
            }
        },
        methods : {
            submitAnswer() {
                let newMove = {guess : this.guess, timeTook: 10}
                this.$store.dispatch('addMove', newMove)
                this.$store.dispatch('turnFinished')
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