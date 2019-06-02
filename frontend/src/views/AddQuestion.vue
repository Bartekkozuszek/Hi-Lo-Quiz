<template>
  <div class="aq">
    <h5>
      Here you can submit your own question to our database. The question is reviewed and then added to the game.
      Remember that the answer needs to be a number.
    </h5>
    <form @submit.prevent="submitQuestion">
      <h5 class="message" v-if="!isLoggedIn">* You have to log in or register in order to submit a question.</h5>
      <label class="label">Question:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        autofocus
        v-model="submitedQuestion"
        placeholder=" Type your question here"
      /><br />
      <label class="label">Answer:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        type="number"
        min="0"
        v-model="submitedAnswer"
        placeholder=" Type the answer here"
      /><br />
      <label class="label">Low:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        type="number"
        min="0"
        v-model="submitedLow"
        placeholder=" Type the low here"
      /><br />
      <label class="label">High:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        type="number"
        min="0"
        v-model="submitedHigh"
        placeholder=" Type the high here"
      /><br />
      <label class="label">Category:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        v-model="submitedCategory"
        placeholder=" Type category here"
      /><br />
      <label class="label">Author:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        v-model="submitedAuthor"
        placeholder=" Type author here"
      /><br />
      <label class="label">Learn more:</label><br />
      <input
        :disabled="isLoggedIn ? false : true"
        required
        v-model="submitedLearnMore"
        placeholder=" Type learn more url here"
      /><br />
      <button type="button" @click="goBack">Cancel</button>
      <button :disabled="isLoggedIn ? false : true" type="submit">Submit</button>
    </form>
    <modal :width="250" :height="100" class="md" name="success">
      <div class="md-content" id="success">Question submitted successfully</div>
    </modal>
    <modal :width="250" :height="100" class="md" name="fail">
      <div class="md-content">Something went wrong :( Please try again.</div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddQuestion',
  data() {
    return {
      submitedQuestion: '',
      submitedAnswer: 0,
      submitedLow: 0,
      submitedHigh: 1000,
      submitedCategory: '',
      submitedAuthor: '',
      submitedLearnMore: ''
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    submitQuestion() {
      axios
        .post(
          'http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/questions',
          {
            question: this.submitedQuestion,
            answer: this.submitedAnswer,
            low: this.submitedLow,
            high: this.submitedHigh,
            category: this.submitedCategory,
            author: this.submitedAuthor,
            learnMore: this.submitedLearnMore
          },
          { headers: { access_token: localStorage.access_token } }
        )
        .then(resp => {
          if (resp.status === 201) {
            this.showSuccess()
            this.submitedQuestion = ''
            this.submitedAnswer = 0
            this.submitedLow = 0
            this.submitedHigh = 1000
          }
        })
        .catch(err => {
          console.log(err)
          this.showFail()
        })
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
.aq {
  background: url(../../public/images/bg.jpg);
  background-position: center;
  background-size: 310vh;
  height: 100vh;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 1em;
}

h5 {
  color: white;
}

.message {
  color: orangered;
  font-style: italic;
  font-weight: 600;
}

.label {
  color: azure;
}

input {
  width: 20em;
  height: 2em;
  border-radius: 7px;
}

/*.md{
        color:chocolate;
        text-align: center;
    }*/

.v--modal-overlay[data-modal='success'] {
  color: chocolate;
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

button {
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

button:hover {
  background-color: #ce4010;
  transition: 0.4s;
}
</style>
