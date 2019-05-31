<template>
    <div id="main">
        <div id="userInfo">
            <h1>Logged in as: <strong>{{ this.$store.state.currentUser.name }}</strong></h1>
            <h1 id="errorMsg" v-if="errorMsg !== null">{{ errorMsg }}</h1>
        </div>
        <div id="questionBox">
            <div id="questionArea">
                <h1>Unapproved Question:</h1>
                <textarea id="questionText" v-model="question" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Answer:</h1>
                <textarea v-model="answer" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Category:</h1>
                <textarea v-model="category" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>High:</h1>
                <textarea v-model="high" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Low:</h1>
                <textarea v-model="low" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
                <h1>Learn more?</h1>
                <textarea v-model="learnMore" :readonly="isReadonly" :class="{ editable: !isReadonly} "></textarea>
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
            learnMore: null,
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
                learnMore: this.learnMore,
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
                this.learnMore = this.currentQuestionObject.learnMore
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
        this.getOneUnapprovedQuestion()
    }
}
</script>


<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-size: 20px;
    } 

    #main{
        text-align: center;
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
        margin: 20px 0 20px 0;
        width: 80px;
    }
    strong {
        font-size: 30px;
    }

    textarea {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 2px;
        min-width: 500px;
    }

    #questionText {
        min-width: 500px;
        min-height: 100px;
        
    }
    .selected {
        background: darkgrey;
    }
    .editable {
        border: solid 1px red;
    }
</style>