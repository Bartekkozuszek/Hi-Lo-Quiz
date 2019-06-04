<template>
    <div id="setup">

        <div class="container">
            <br>
            <div class="row"></div>
            <div class="col-md-12"></div>
                    <p>Select character:</p>
            <div id="carouselControl" class="carousel slide" data-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="test .img-fluid" src="../../public/images/avatar1.png" alt="#">
                    </div>
                    <div class="carousel-item">
                        <img class="test .img-fluid" src="../../public/images/avatar8.png" alt="#">
                    </div>
                    <div class="carousel-item">
                        <img class="test .img-fluid" src="../../public/images/avatar9.png" alt="#">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselControl" role="button" data-slide="prev"
                v-on:click="indexMinus">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselControl" role="button" data-slide="next"
                   v-on:click="indexPlus">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <br>
            <br class="smallerdevice">

            <div class="row">
                <div class="col-md-12">
                    <p>Your opponents:</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 col-2 arrow_container_left">
                </div>
                <div class="col-md-6 col-8">
                <div class="botContainer" v-dragscroll.x="true">
                    <div></div>
                    <div class="loadedBots"
                         v-for="bot in bots">
                        <img class="playersImage" v-bind:src="bot.image" />
                    </div>
                </div>
            </div>

                <div class="col-md-3 col-2 arrow_container_right">
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 change_player_link_container">
                    <router-link to="/bots">Change players</router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p>Selected category is: {{selected}}</p>
                    <select v-model="selected" @change="setSelectedCategory">
                        <option v-for="(o, index) in categories">{{ o }}</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <button @click="startGame" class="startButton">Play</button>
                </div>
            </div>


        </div>
        </div>

</template>

<script>
    import SelectBots from "../components/SelectBots.vue";
    import { dragscroll } from "vue-dragscroll";

    export default {
        directives: {
            dragscroll
        },
        name: "SetupGame",

        components: {
            SelectBots
        },
        data: function() {
            return {
                selected : "random",
                wantedImageIndex:0,
                clickable: true,
            }
        },
        methods: {

            indexPlus(){
                if (this.clickable === true) {
                    this.clickable = false
                    if (this.wantedImageIndex < 2) {
                        this.wantedImageIndex++;
                    } else if (this.wantedImageIndex >= 2)
                        this.wantedImageIndex = 0;

                    this.$store.state.currentUser.image = this.$store.state.playerAvatars[this.wantedImageIndex]
                    console.log(this.wantedImageIndex)
                    setTimeout(() => {
                        this.clickable = true;
                    }, 600)
                }
            },
            indexMinus(){
                if (this.clickable === true) {
                    this.clickable = false
                    if (this.wantedImageIndex > 0) {
                        this.wantedImageIndex--;
                    } else if (this.wantedImageIndex <= 0)
                        this.wantedImageIndex = 2;

                    this.$store.state.currentUser.image = this.$store.state.playerAvatars[this.wantedImageIndex]
                    console.log(this.wantedImageIndex)
                }

                setTimeout(() => {
                    this.clickable = true;
                }, 600)



            },
            startGame() {
                this.$store.state.sessionPlayersArray[0]=this.$store.state.currentUser;
                this.$store.commit("clearMoveHistory");
                this.$store.dispatch("loadQuestions", 1);
                this.$store.dispatch("changeGameState", 2);
            },
            //toggeShowHighscore:function(){
            //    if (this.$store.state.showHighScore==true){
            //        this.$store.state.showHighScore=false;
            //    }else{
            //        this.$store.dispatch("loadHighScores");
            //        this.$store.dispatch("loadBotStats");
            //        this.$store.state.showHighScore=true;
            //    }
            //},
            //toggleAddQuestion() {
            //    if (this.$store.state.showAddQuestion == true) {
            //        this.$store.state.showAddQuestion = false
            //    } else {
            //        this.$store.state.showAddQuestion = true
            //    }
            //},
            setSelectedCategory() {
                this.$store.commit("setSelectedCategory", this.selectedIndex)
            }
        },
        computed: {
            bots() {
                return this.$store.state.sessionPlayersArray;
            },
            categories() {
                return this.$store.state.categories;
            },
            selectedIndex() {
                return this.categories.indexOf(this.selected);
            }
        },
        mounted() {
            this.$store.dispatch("loadCategories");
            this.$store.state.currentUser.image = this.$store.state.playerAvatars[0];
        },
    };
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
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        height: 100px;
        width: 100px;
        outline: var(--themeColor2);
        background-size: 100%, 100%;
        border-radius: 50%;
        border: 1px solid var(--themeColor2);
        background-image: none;
    }

    .carousel-control-next-icon:after
    {
        content: '>';
        font-size: 55px;
        color: var(--themeColor2);
    }

    .carousel-control-prev-icon:after {
        content: '<';
        font-size: 55px;
        color: var(--themeColor2);
    }

    .arrow_container_left {
        text-align: right;
    }
    .arrow_container_right {
        text-align: left;
    }
    .arrow_blue {
        background: #3c47a5;
        display: inline-block;
        padding: 10px 17px;
        border-radius: 100%;
        margin-top: 60px;
        cursor: pointer;
    }
    .arrow_blue:hover {
        opacity: 0.7;
        transition: 0.2s;
    }
    .change_player_link_container {
        padding-bottom: 30px;
    }
    .change_player_link_container a{
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 11px;
        letter-spacing: 0.5px;
        border-bottom: 1px solid var(--themeColor2);
        text-decoration:none;
    }
    .change_player_link_container a:hover {
        border-bottom: 1px solid #ce4010;
        color: #f3f3f3;
        transition: 0.2s;
    }
    select {
        padding:10px 8px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        min-width: 200px;
        background:#3c47a5;
        border: none;
        color: #ffffff;
        font-size: 13px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
    .carousel-inner {
        min-height: 100px;
    }
    .test{
        height: 180px;

    }
    .botContainer {


        width: 80%;
        margin-left: auto;
        margin-right: auto;
        height: 12vw;
        display: grid;
        grid-template-columns: 2px repeat(var(--playerAmount), 10vw) 2px;
        grid-template-rows: none;
        overflow: hidden;
    }
    .playersImage {
        grid-column: 2 / -2;
        height: 8vw;
        margin: 10px;
    }
    .link {
        color: white;
        padding: 2em;
    }
    .loadedBots {
        height: 20%;
        display: inline;
    }
    .loadedBots p {
        font-size: 11px;
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        padding-top: 10px;
    }
    #setup {
        position: absolute;
        width:100%;
        height: 100%;
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
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
    .startButton:hover{
        background-color: #ce4010;
        transition: 0.4s;
    }
    @media screen and (max-width: 600px) {
        .botContainer {
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            height: 20vw;
            display: grid;
            grid-template-columns: 2px repeat(var(--playerAmount), 18vw) 2px;
            grid-template-rows: none;
            overflow: hidden;
        }

        .playersImage {
            grid-column: 2 / -2;
            height: 14vw;
            margin: 10px;
        }
        .smallerdevice {
            display: none;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
            height: 100px;
            width: 100px;
            outline: var(--themeColor2);
            background-size: 100%, 100%;
            border-radius: 50%;
            border: var(--themeColor2);
            background-image: none;
        }
    }

</style>
