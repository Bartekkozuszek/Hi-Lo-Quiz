<template>
    <div id="table-component">
        <div class="tableSlot tableSlot1" v-bind:class="{slot1Animate: this.$store.state.animatingCharacters}">
            <img :src="slot1Image"></img>
            <p class="namebtn"
               :style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}"
            >{{whatPlayer(1).name}}</p>
        </div>
        <div class="tableSlot tableSlot2" v-bind:class="{slot2Animate: this.$store.state.animatingCharacters}">
            <img :src="slot2Image"></img>
            <p class="namebtn"
               :style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}"
            >{{whatPlayer(2).name}}</p>
        </div>
        <div class="tableSlot tableSlot3" v-bind:class="{slot3Animate: this.$store.state.animatingCharacters}">
            <img :src="slot3Image"></img>
            <p class="namebtn"
               :style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}"
            >{{whatPlayer(3).name}}</p>
        </div>
        <div class="tableSlot tableSlot4" v-bind:class="{slot4Animate: this.$store.state.animatingCharacters}">
            <img :src="slot4Image"></img>
            <p class="namebtn"
               :style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}"
            >{{whatPlayer(4).name}}</p>
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
        /*filter: grayscale(100%);*/
        opacity:0.4;
        left:0%;
    }
    .tableSlot2{
        position: fixed;
        left:38%;
    }
    .tableSlot3{
        position: fixed;
        /*filter: grayscale(100%);*/
        opacity: 0.4;
        left:80%;
    }
    .tableSlot4{
        position: fixed;
        /*filter: grayscale(100%);*/
        opacity:0;
        left:140%;
    }
    .slot1Animate{
        left:-30%;
        opacity:0;
        transition: all 1s ease;
    }
    .slot2Animate{
        left:0%;
        opacity:0.4;

        /*filter: grayscale(100%);*/

        transition: all 1s ease;
    }
    .slot3Animate{
        left:38%;
        /*filter: grayscale(0%);*/
        opacity: 1;
        transition: all 1s ease;
    }
    .slot4Animate{
        left:80%;
        opacity:0.4;
        transition: all 1s ease;
    }
    .namebtn{
        display: inline-block;
        padding: 11px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        color: beige;
        border: 1px solid #a0a08d;
        width: 250px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: 0.4s;
        cursor: pointer;
    }


</style>
