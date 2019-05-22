<template>
    <div class="Hs">
        <div class="back">
            <p>BACK</p>
        </div>
        <div class="playerComponent" >
            <p class="rank">Rank</p>
            <p>Player</p>
            <div></div>
            <p>Score</p>
            <p>Wins</p>
            <p>Losses</p>
            <p>Winrate</p>
        </div>
        <div class="playerComponent" v-for="(player, index) in this.$store.state.highScore"
             :key="index"
        >
            <p class="rank">{{index+1}}:</p>
            <img class="playerImage" :src="player.image">
            <p>{{player.name}}</p>
        </div>

        <div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "HighScore"
    }
</script>

<style scoped>
    .Hs{
        position: absolute;
        top:5%;
        left:20%;
        width:60%;
        height:80%;
        background-color: magenta;
    }
    .back{
        text-align: right;
    }

    .playerComponent{
        display: grid;
        grid-template-columns: 8fr 8fr 10fr 10fr 10fr 10fr 10fr;
        grid-template-rows: 8vh;
        text-align: left;
    }

    .rank{
        text-align: center;
    }
    .playerImage{
        height: 99%;
    }
</style>