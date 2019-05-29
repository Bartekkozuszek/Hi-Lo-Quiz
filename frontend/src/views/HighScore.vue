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
            <p class="back"@click="toggeShowHighscore">BACK</p>
        </div>

        <div id="botZone" v-if="!this.playerField">
            <div class="playerComponent" >
                <p class="rank">Rank</p>
                <p>Name</p>
                <div></div>
                <p>Winrate</p>
                <p>Matches Played</p>
            </div>
            <div class="playerComponent" v-for="(player, index) in this.$store.state.loadedBots"
                 :key="index"
            >
                <p class="rank">{{index+1}}</p>
                <img class="playerImage" :src="player.image">
                <p>{{player.name}}</p>
                <p>{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
                <p>{{player.wins+player.losses}}</p>

            </div>
        </div>
        <div id="playerZone" v-if="this.playerField">
            <div class="playerComponent" >
                <p class="rank">Rank</p>
                <p>Name</p>
                <div></div>
                <p>Score</p>
                <p>Winrate</p>
            </div>
            <div class="playerComponent" v-for="(player, index) in this.$store.state.highScore"
                 :key="index"
            >
                <p class="rank">{{index+1}}</p>
                <img class="playerImage" :src="player.image">
                <p>{{player.userName}}</p>
                <p>{{player.score}}</p>
                <p>{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
            </div>

            <div class="playerComponent" v-if="playerBadEnough" v-bind="player=this.$store.state.currentUser">
                <p class="rank">{{player.rank}}</p>
                <img class="playerImage" :src="player.image">
                <p>{{player.name}}</p>
                <p>{{player.score}}</p>
                <p>{{Math.round(player.wins/(player.wins + player.losses)*100)}}%</p>
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
            }
        },
        data: function(){
            return {
             playerField:true
            }
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
        position: absolute;
        top:5%;
        left:5%;
        width:90%;
        height:80%;
    }
    .back{

    }

    .playerComponent{
        display: grid;
        grid-template-columns: 8vh 8vh 10fr 10fr 10fr;
        grid-template-rows: 8vh;
        text-align: left;
        border:solid rgba(0, 9, 25, 0.5) 1px;
        background-color:rgba(0, 9, 25, 0.9);
    }
    p{
        color:beige;
    }
    .playerComponent>*{
    }

    .rank{
        text-align: center;
    }
    .playerImage{
        height: 99%;
    }
    .highScoreHeader{
        display:grid;
        grid-template-columns:70px 70px auto 70px;
        background-color:rgba(0, 0, 0, 0.9);
    }
    .tab{
        justify-content: center;
    }
    .activeTab{
        color:rgba(0, 9, 25, 0.9)!important;
        background-color: beige;
    }
</style>