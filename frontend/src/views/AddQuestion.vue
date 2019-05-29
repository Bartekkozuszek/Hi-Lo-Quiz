<template>
    <div class="aq">
        <div>
            <h4>Here you can submit your own question to the database. The question is reviewed and then added to the game. 
            Remember that the answer needs to be a number.</h4>
            <form @submit.prevent="submitQuestion">
                <h3 class="message" v-show="!isLoggedIn">* You have to log in or register in order to submit a question.</h3>
                <label class="label">Question:</label><br />
                <input :disabled="isLoggedIn ? false : true" required autofocus v-model="submitedQuestion" placeholder="Type your question here" /><br />
                <label class="label">Answer:</label><br />
                <input :disabled="isLoggedIn ? false : true" required type="number" min=0 v-model="submitedAnswer" placeholder="Type the answer here" /><br />
                <button type="button" @click="goBack">Cancel</button>
                <button :disabled="isLoggedIn ? false : true" type="submit">Submit</button>
            </form>
            <modal :width=250 :height=100 class="md" name="success">
                <div class="md-content" id="success">Question submitted successfully</div>
            </modal>
            <modal :width=250 :height=100 class="md" name="fail">
                <div class="md-content">Something went wrong :( Please try again.</div>
            </modal>
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
                        if (resp.status === 201) {
                            this.showSuccess()
                            this.submitedQuestion = ""
                            this.submitedAnswer = 0
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.showFail()
                    })
            },
            toggleAddQuestion() {
                if (this.$store.state.showAddQuestion == true) {
                    this.$store.state.showAddQuestion = false
                } else {
                    this.$store.state.showAddQuestion = true
                }
            },
            showSuccess() {
                this.$modal.show('success')
            },
            showFail() {
                this.$modal.show('fail')
            },
            goBack() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .aq{
       
        background-color:rgba(0, 5, 20, 0.9);
        padding: 1em;
    }

    h4 {
        color: white;
    }

    .message{
        color: orangered;
    }

    .label {
        color: azure
    }

    /*.md{
        color:chocolate;
        text-align: center;
    }*/

    .v--modal-overlay[data-modal="success"] {
  color:chocolate;
  text-align: center;
  transition: box-shadow 1s;
}
    .md-content {
        padding: 10px;
        text-align: center;
        font-weight: 600;
    }

    #success {
        color: forestgreen;
    }

</style>