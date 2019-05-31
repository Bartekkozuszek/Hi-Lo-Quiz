<template>
    <div id="main">
        <div id="userInfo">
            <h1>Logged in as: <strong>{{ this.$store.state.currentUser.name }}</strong></h1>
            <h1 id="errorMsg" v-if="errorMsg !== null">{{ errorMsg }}</h1>
        </div>
        <div id="questionBox">
            <div class="questionArea">
                <h1>Unapproved Question</h1>
                <textarea class="questionText" v-model="question" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Answer</h1>
                <textarea class="questionText" v-model="answer" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>High</h1>
                <textarea class="questionText" v-model="high" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Low</h1>
                <textarea class="questionText" v-model="low" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
            </div>
            <div id="infoArea">
                <p v-if="author !== null">Author: {{ author }}</p>
                <p v-if="author !== null">Submitted by: {{ author }}</p>
            </div>
            <div id="questionButton">
                <button @click="isReadonly = !isReadonly" :class=" { selected: !isReadonly }">Edit</button>
                <button @click="setData">Revert</button>
            </div>
        </div>
        <div>
            <button @click="approveQuestion">Approve</button>
            <button @click="getOneUnapprovedQuestion">Next</button>
            <button @click="deleteQuestion">Delete</button>
        </div>
    </div>
</template>


<script>
import axios from "axios"

export default {
    data(){
        return {
            question: null,
            answer: null,
            author: null,
            category: null,
            high: null,
            low: null,
            currentQuestionObject: null,
            isReadonly: true,
            errorMsg: null,
            serverURL: 'http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com'
        }
    },
    computed:{
        isAdmin(){
            return this.$store.getters.isAdmin;
        }
    },
    watch: {
        isAdmin(newValue, oldVAlue){
            if(newValue === false){
                alert('You logged out!')
                this.$router.push('/login')
            }
        }
    },
    methods: {
        getOneUnapprovedQuestion(){
            axios.get(this.serverURL + '/api/v1/questions?approved=false&amount=1',
            { headers: { access_token: localStorage.access_token }})
            .then(result =>{
            this.currentQuestionObject = result.data[0]
            this.setData()})
            .catch(err => console.log(err))
        },
        approveQuestion(){
            if(confirm('Are you sure you wish approve this question?')){
                axios.put(this.serverURL + '/api/v1/questions/' + this.currentQuestionObject._id, {
                question: this.question,
                category: this.category,
                answer: this.answer,
                high: this.high,
                low: this.low,
                approved: true
                },
                { headers: { access_token: localStorage.access_token }})
                .then((res) => {if(res.status === 200){
                alert("Question approved!")}})
                .catch((err)=> console.log(err))
                this.getOneUnapprovedQuestion()
            }
        },
        deleteQuestion(){
            if(confirm('Are you sure you wish to permanently delete this question?')){
                axios.delete(this.serverURL + '/api/v1/questions/' + this.currentQuestionObject._id,
                { headers: { access_token: localStorage.access_token }})
                .then(result => {
                if(result.status === 200){
                    alert("Question successfully deleted")
                }
                })
                .catch(err => console.log(err))
                this.getOneUnapprovedQuestion()
            }
        },
        setData(){
            if(this.currentQuestionObject.approved === false){
                this.question = this.currentQuestionObject.question
                this.answer = this.currentQuestionObject.answer
                this.author = this.currentQuestionObject.author
                this.category = this.currentQuestionObject.category
                this.high = this.currentQuestionObject.high
                this.low = this.currentQuestionObject.low
                this.isReadonly = true
            }else {
                this.errorMsg = 'No unapproved questions or no longer logged in as admin'
                this.clearData()
            }
        },
        clearData(){
            this.question = null
            this.answer = null
            this.author = null
            this.category = null
            this.high = null
            this.low = null
            this.isReadonly = true
        }
    },
    beforeMount(){
        this.getOneUnapprovedQuestion()
    }
}
</script>


<style scoped>
    html {
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    p {
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
    }

    * {
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
    }

    #main{
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    #userInfo {
        padding: 2%;
    }

    #userInfo h1 {
        font-size: 30px;
    }
    #errorMsg {
        font-size: 15px;
        color: red;
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
    button:hover{
        background-color: #ce4010;
        transition: 0.4s;
    }
    strong {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 30px;
    }

    textarea {
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 2px;
        min-width: 500px;
    }

    .questionText {
        min-width:300px;
        min-height: auto;
        padding:10px 8px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        background:#3c47a5;
        border: none;
        color: #ffffff;
        font-size: 13px;
        letter-spacing: 0.5px;
        text-align: center;
        text-transform: uppercase;

    }


    .selected {
        background: darkgrey;
    }
    .editable {
        border: solid 1px red;
    }
</style>
