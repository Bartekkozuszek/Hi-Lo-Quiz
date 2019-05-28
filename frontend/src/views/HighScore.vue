<template>
    <HighScore v-if="this.$store.state.showHighScore "></HighScore>
    <add-question v-if="showAddQuestion"></add-question>
    <br>
    <button @click="toggeShowHighscore" class="startButton">Highscores</button>

</template>

<script>
    import HighScore from "../components/HighScore";
    export default {
        name: "HighScore",

        computed: {
            HighScore
        },
        methods: {
            toggeShowHighscore: function () {
                if (this.$store.state.showHighScore == true) {
                    this.$store.state.showHighScore = false;
                } else {
                    this.$store.dispatch("loadHighScores");
                    this.$store.dispatch("loadBotStats");
                    this.$store.state.showHighScore = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>
