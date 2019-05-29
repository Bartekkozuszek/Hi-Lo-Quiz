<template>
    <div class="about">
        <div class="info">
       <h5>About</h5>
        This application was made by the six lobsters as a group project in iths.
        Contact: <a href="https://github.com/wuxxerno/Hi-Lo-Quiz">github</a>
        <hr>
        <h5>Stats</h5>
        <p>Total games played: {{this.totalGameCount}} </p>
        <hr>
        <h5>Rules</h5>
        <p>The first one who guesses the correct number wins.</p>
        <p>After you make your guess the computer will respond with either "High" or "Low".</p>
        <p>Use the the numbers on the slider to your advantage! The slider adapts to the lowest possible and highest possible answer based on where you are in the match</p>
        <p>You can guess a number outside the recommended range by inputting it in the input field.</p>
        <p>If you dont make a guess before the time runs out the guess will be the last number selected (or if none selected, the lowest in the span)</p>
        <p>The bots have different ways to make their guesses, some may be highly intelligent, others may employ dirty tricks so watch out!</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "About",
        computed: {
            totalGameCount() {
                return this.$store.state.totalGameCount;
            }
        },
        created() {
            this.$store.dispatch("getTotalGames");
        }

    };
</script>

<style>
    .about {
        background-color: var(--themeColor1);
    }
    .info {
        padding-top: 5px;
        padding-bottom: 5px;
        color: #f3f3f3;
        font-size: small;
    }

</style>
