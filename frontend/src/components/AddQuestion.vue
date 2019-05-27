<template>
    <div class="aq">
        <div>
            <form @submit.prevent="submitQuestion">
                <h3 class="message" v-show="!isLoggedIn">* You have to log in or register in order to submit a question.</h3>
                <label class="label">Question:</label><br />
                <input :disabled="isLoggedIn ? false : true" required autofocus v-model="submitedQuestion" placeholder="Type your question here" /><br />
                <label class="label">Answer:</label><br />
                <input :disabled="isLoggedIn ? false : true" required type="number" min=0 v-model="submitedAnswer" placeholder="Type the answer here" /><br />
                <button type="button" @click="toggleAddQuestion">Cancel</button>
                <button :disabled="isLoggedIn ? false : true" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "AddQuestion",
        data() {
            return {
                submitedQuestion: "",
                submitedAnswer: 0,
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.isLoggedIn
            }
        },
        methods: {
            submitQuestion() {
                axios.post('http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/questions', {
                    question: this.submitedQuestion,
                    answer: this.submitedAnswer
                })
                    .then((resp) => {
                        if (resp.status === 201)
                            alert('Question submited successfully')
                        else {
                            alert('Something went wrong')
                        }
                    }).catch((err) => {
                    this.registerError = err.response.data.msg
                })  
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
        background-color:rgba(0, 5, 20, 0.9);
        padding: 1em;
    }

    .message{
        color: orangered;
    }

    .label {
        color: azure
    }

</style>