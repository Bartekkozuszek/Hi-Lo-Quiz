<template>
    <div class="aq">
        <div>
            <form @submit.prevent="submitQuestion">
                <label>Question:</label><br />
                <input required autofocus v-model="submitedQuestion" placeholder="Type your question here" /><br />
                <label>Answer:</label><br />
                <input required type="number" v-model="submitedAnswer" placeholder="Type the answer here" /><br />
                <button type="button" @click="toggleAddQuestion">Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddQuestion",
        data() {
            return {
                submitedQuestion: "",
                submitedAnswer: 0
            }
        },
        methods: {
            submitQuestion() {

            },
                  toggleAddQuestion() {
          if (this.$store.state.showAddQuestion == true) {
              this.$store.state.showAddQuestion = false
          } else {
              this.$store.state.showAddQuestion = true
          }
      }
        }
    }
</script>

<style scoped>
    .aq{
        position: absolute;
        top:5%;
        left:24%;
        width:50%;
        height:50%;
        background-color:rgba(0, 0, 0, 0.9);
        padding: 1em;
    }

</style>