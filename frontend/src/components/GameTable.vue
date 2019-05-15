<template>
    <div id="table-component">
        <div class="tableSlot tableSlot1" v-bind:class="{slot1Animate: this.$store.state.animatingCharacters}">
            <img :src="slot1Image"></img>
            <p>{{whatPlayer(1).name}}</p>
        </div>
        <div class="tableSlot tableSlot2" v-bind:class="{slot2Animate: this.$store.state.animatingCharacters}">
            <img :src="slot2Image"></img>
            <p>{{whatPlayer(2).name}}</p>
        </div>
        <div class="tableSlot tableSlot3" v-bind:class="{slot3Animate: this.$store.state.animatingCharacters}">
            <img :src="slot3Image"></img>
            <p>{{whatPlayer(3).name}}</p>
        </div>
        <div class="tableSlot tableSlot4" v-bind:class="{slot4Animate: this.$store.state.animatingCharacters}">
            <img :src="slot4Image"></img>
            <p>{{whatPlayer(4).name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameTable",
        methods:{
            whatPlayer:function(slotIndex){
                //if only 1 player ignore the rest.
                if(this.$store.state.sessionPlayersArray.length==1){
                    return 0;
                }
                //Assign correct player to return
                let supposedSlot=this.$store.state.currentPlayerIndex-2+slotIndex;
                //extreme case for start of array
                if(supposedSlot<0){
                    supposedSlot=this.$store.state.sessionPlayersArray.length-1;
                }//extreme case for end of array
                else if(supposedSlot==this.$store.state.sessionPlayersArray.length){
                    supposedSlot=0;
                }
                //even more extreme case for end of array
                else if(supposedSlot>this.$store.state.sessionPlayersArray.length){
                    supposedSlot=1;
                }

                    return this.$store.state.sessionPlayersArray[
                    supposedSlot
                    ];
            }
        },
        computed:{
            slot1Image:function(){ return this.whatPlayer(1).image;},
            slot2Image:function(){ return this.whatPlayer(2).image;},
            slot3Image:function(){ return this.whatPlayer(3).image;},
            slot4Image:function(){ return this.whatPlayer(4).image;}
        }
    }
</script>

<style scoped>
    #table-component{
        display: grid;
        grid-template-columns: auto auto;
        height:40vw;
        max-height:300px;
    }
    img{
        width: 35vw;
        max-width: 300px;
    }
    .tableSlot{
        width:30%;
        max-width: 150px;
    }
    .tableSlot1{
        position: fixed;
        left:0%;
    }
    .tableSlot2{
        position: fixed;
        left:32%;
    }
    .tableSlot3{
        position: fixed;
        left:80%;
    }
    .tableSlot4{
        position: fixed;
        left:140%;
    }
    .slot1Animate{
        left:-30%;
        transition: all 0.5s ease;
    }
    .slot2Animate{
        left:0%;
        transition: all 0.5s ease;
    }
    .slot3Animate{
        left:32%;
        transition: all 0.5s ease;
    }
    .slot4Animate{
        left:80%;
        transition: all 0.5s ease;
    }
</style>
