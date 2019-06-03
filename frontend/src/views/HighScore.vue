<template>
    <div class="Hs"
    >

        <div class="highScoreHeader">
            <div class="tab"
                 v-bind:class="{activeTab: this.playerField}"
                v-on:click="activatePlayerTab">
                <p v-bind:class="{activeTab: this.playerField}" >Players</p>
            </div>
            <div class="tab"
                 v-bind:class="{activeTab: !this.playerField}"
                 v-on:click="activateBotTab">
                <p v-bind:class="{activeTab: !this.playerField}" >Bots</p>
            </div>
            <p>Global Rankings</p>
            <p class="back"@click="goBack">BACK</p>
        </div>

        <div id="botZone" v-if="!this.playerField">
            <div class="playerComponent" >
                <p class="rank">Rank</p>
                <p class="rank">Name</p>
                <div></div>
                <p class="rank">Winrate</p>
                <p class="rank">Matches Played</p>
            </div>
            <div class="playerComponent" v-for="(player, index) in this.$store.state.loadedBots"
                 :key="index"
            >
                <p class="rank">{{index+1}}</p>
                <img class="playerImage" :src="player.image">
                <p class="rank1">{{player.name}}</p>
                <p class="rank1">{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
                <p class="rank1">{{player.wins+player.losses}}</p>

            </div>
        </div>
        <div id="playerZone" v-if="this.playerField">
            <div class="playerComponent" >
                <p class="rank">Rank</p>
                <p class="rank">Name</p>
                <div></div>
                <p class="rank">Score</p>
                <p class="rank">Winrate</p>
            </div>
            <div class="playerComponent" v-for="(player, index) in this.$store.state.highScore"
                 :key="index"
            >
                <p class="rank">{{index+1}}</p>
                <img class="playerImage" :src="player.image">
                <p class="rank1">{{player.userName}}</p>
                <p class="rank1">{{player.score}}</p>
                <p class="rank1">{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
            </div>

            <div class="playerComponent" v-if="playerBadEnough" v-bind="player=this.$store.state.currentUser">
                <p class="rank">{{player.rank}}</p>
                <img class="playerImage" :src="player.image">
                <p class="rank">{{player.name}}</p>
                <p class="rank">{{player.score}}</p>
                <p class="rank">{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HighScore",
        methods:{
            toggeShowHighscore:function(){
                if (this.$store.state.showHighScore==true){
                    this.$store.state.showHighScore=false;
                }else{
                    this.$store.state.showHighScore=true;
                }
            },
            activatePlayerTab:function () {
                this.playerField=true;
            },
            activateBotTab:function () {
                this.playerField=false;
            },
            goBack() {
                this.$router.push('/')
            }
        },
        data: function(){
            return {
             playerField:true
            }
        },
        mounted() {
            this.$store.dispatch("loadHighScores");
            this.$store.dispatch("loadBotStats");
        },
        computed:{
            playerBadEnough:function(){
                if(this.$store.state.currentUser.rank>5){
                    return true;
                }
                return false;
            }

        }
    }
</script>

<style scoped>


    .Hs{
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
        position: absolute;
        width:100%;
        height:100%;
    }
    .back{
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        cursor: pointer;

    }

    .playerComponent{
        display: grid;
        grid-template-columns: 8vh 8vh 10fr 10fr 10fr;
        grid-template-rows: 8vh;
        text-align: left;
        border:solid rgba(0, 9, 25, 0.5) 1px;
        background-color:rgba(0, 9, 25, 0.9);
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        cursor: pointer;
        background: url(../../public/images/bg.jpg) no-repeat center center fixed;
    }
    p{
        color: #ffffff;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .playerComponent>*{


    }

    .rank{
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-align: center;
        color: #ce4010;
    }
    .rank1{
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-align: center;
        color: #ffffff;
    }

    .playerImage{
        height: 99%;
    }
    .highScoreHeader{
        display:grid;
        grid-template-columns:70px 70px auto 70px;
        background-color:var(theme2);
    }
    .tab{
        justify-content: center;
    }
    .activeTab{
        color:#ffffff!important;
        background-color: #3c47a5;
    }
</style>
