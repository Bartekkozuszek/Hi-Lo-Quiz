<template>
    <div>
        <input v-model="guess" placeholder="edit me" @click="submitAnswer(guess)">
        <p>Message is: {{ guess }}</p>
    </div>
</template>

<script>
    export default {
        name: "Answer",
        computed: {
            guess() {
                return this.$store.getters.lastMove.guess
            }
        },
        method : {
            submitAnswer(payload) {
                this.$store.dispatch('addMove', {guess: payload, timeTook: 10})
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