<template>
    <div id="main">
        <div id="userInfo">
            <h1>Logged in as: <strong>{{ this.$store.state.currentUser.name }}</strong></h1>
            <h1>Unapproved questions in database: {{ questionCount }}</h1>
            <h1 id="errorMsg" v-if="errorMsg !== null">{{ errorMsg }}</h1>
        </div>
        <hr>
        <div id="questionBox">
            <div id="questionArea">
                <h1>Question Nr: {{ index + 1 }}</h1>
                <textarea id="questionText" v-model="question" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Answer:</h1>
                <textarea v-model="answer" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Category:</h1>
                <textarea v-model="category" :readonly="isReadonly" :class="{ editable: !isReadonly} " placeholder="Empty"></textarea>
                <h1>High:</h1>
                <textarea v-model="high" :readonly="isReadonly" :class="{ editable: !isReadonly} " placeholder="Empty"></textarea>
                <h1>Low:</h1>
                <textarea v-model="low" :readonly="isReadonly" :class="{ editable: !isReadonly} " placeholder="Empty"></textarea>
                <h1>Learn more?:</h1>
                <textarea v-model="learnMore" :readonly="isReadonly" :class="{ editable: !isReadonly} " id="learnMore" placeholder="Empty"></textarea>
            </div>

            <div id="infoArea">
                <p v-if="author !== null">Author: {{ author }}</p>
            </div>
            <div id="questionButton">
                <button @click="isReadonly = !isReadonly" :class=" { selected: !isReadonly }">Edit</button>
                <button @click="revertQuestion">Revert</button>
            </div>
        </div>
        <hr>
        <div>
            <button @click="approveQuestion">Approve</button>
            <!-- <button @click="getOneUnapprovedQuestion">Next</button> -->
            
            <button @click="deleteQuestion">Delete</button>
        </div>
        <div id="navButtons">
            <button @click="prevQuestion">Previous</button>
            <button @click="nextQuestion">Next</button>
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
            learnMore: null,
            isReadonly: true,
            errorMsg: null,
            unapprovedQuestions: [],
            index: 0,
            serverURL: 'http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com'
        }
    },
    computed:{
        isAdmin(){
            return this.$store.getters.isAdmin;
        },
        questionCount(){
            return this.unapprovedQuestions.length
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
        getUnapprovedQuestions(){
            axios.get(this.serverURL + '/api/v1/questions?approved=false',
            { headers: { access_token: localStorage.access_token }})
            .then(result =>{
                this.unapprovedQuestions = result.data;
                this.setData(this.unapprovedQuestions[0])
            })
            .catch(err => console.log(err))
        },
        nextQuestion(){
            if(this.index < this.unapprovedQuestions.length - 1){
                this.index += 1;
            }
            else {
                this.index = 0;
            }
            this.setData(this.unapprovedQuestions[this.index])
        },
        prevQuestion(){
            if(this.index > 0){
                this.index -= 1;
            }
            else{
                this.index = this.unapprovedQuestions.length - 1;
            }
            this.setData(this.unapprovedQuestions[this.index])
        },
        revertQuestion(){
            this.setData(this.unapprovedQuestions[this.index])
        },
        approveQuestion(){
            if(confirm('Are you sure you wish approve this question?')){
                axios.put(this.serverURL + '/api/v1/questions/' + this.unapprovedQuestions[this.index]._id, {
                question: this.question,
                category: this.category,
                answer: this.answer,
                high: this.high,
                low: this.low,
                learnMore: this.learnMore,
                approved: true
                },
                { headers: { access_token: localStorage.access_token }})
                .then((res) => {
                    if(res.status === 200){
                    alert("Question approved!")
                    this.unapprovedQuestions.splice(this.index, 1)
                    this.prevQuestion();
                }})
                .catch((err)=> console.log(err))
            }
        },
        deleteQuestion(){
            if(confirm('Are you sure you wish to permanently delete this question?')){
                axios.delete(this.serverURL + '/api/v1/questions/' + this.unapprovedQuestions[this.index]._id,
                { headers: { access_token: localStorage.access_token }})
                .then(result => {
                if(result.status === 200){
                    alert("Question successfully deleted")
                    this.unapprovedQuestions.splice(this.index, 1)
                    this.prevQuestion();
                }
                })
                .catch(err => console.log(err))
            }
        },
        setData(questionObj){
            if(questionObj.approved === false){
                this.question = questionObj.question
                this.answer = questionObj.answer
                this.author = questionObj.author
                this.category = questionObj.category
                this.high = questionObj.high
                this.low = questionObj.low
                this.learnMore = questionObj.learnMore
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
            this.learnMore = null,
            this.isReadonly = true
        }
    },
    beforeMount(){
        this.getUnapprovedQuestions()
    }
}
</script>


<style scoped>

    html {
        /* background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover; */
    }
    h1 {
        color: white;
        color: black;
        font-size: 25px;
    }
    p {
        color: #ffffff;
        color: black;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
    }
    * {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
    }

    #main{
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        /* background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover; */
    }
    #userInfo {
        padding: 0px; 
        margin-top: 20px;
    }

    #userInfo h1 {
        font-size: 30px;
    }
    #errorMsg {
        font-size: 15px;
        color: red;
    }
    #infoArea p{
        font-size: 20px;
        margin-top: 20px;
    }

    button {
        background-color: var(--themeColor2);
        border: none;
        color: white;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        cursor: pointer;
        min-width: 200px;
        border-radius: 22px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin: 10px 0;
    }

    #questionButton button {
        min-width: 150px;
    }
    #navButtons button {
        /* min-width: 150px; */
    }
    button:hover{
        background-color: #ce4010;
        transition: 0.4s;
    }
    strong {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 30px;
    }

    hr{
        background: white;
    }

    textarea {
        text-align: center;
        margin-top: 10px;
        height: 50px;
        margin-bottom: 2px;
        min-width: 500px;
        font-size: 20px;
        color: black;
    }


    #questionText {
        /* min-width:300px; */
        height: 100px;
        /* padding:10px 8px;         */
        /* letter-spacing: 0.5px; */
        text-align: center;
        /* text-transform: uppercase; */
    }
    #learnMore{
        height: 70px;
    }


    .selected {
        background: darkgrey;
        background-color: #ce4010;
        color: darkgrey;
    }
    .editable {
        border: solid 1px red;
    }
</style>
