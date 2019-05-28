<template>
    <button @click="toggleAddQuestion" class="startButton">Submit a question</button>
</template>

<script>
    import AddQuestion from "../components/AddQuestion.vue"
    export default {
        name: "AddQuestion",

        components: AddQuestion,

        methods: {
            toggleAddQuestion() {
                if (this.$store.state.showAddQuestion == true) {
                    this.$store.state.showAddQuestion = false
                } else {
                    this.$store.state.showAddQuestion = true
                }
            },

        }
    }

</script>

<style scoped>
    .startButton {

        background-color: var(--themeColor2); /* Green */
        border: none;
        color: white;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 13px;
        margin: 4px 2px;
        cursor: pointer;
        min-width: 200px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin: 10px 0;
    }

</style>
