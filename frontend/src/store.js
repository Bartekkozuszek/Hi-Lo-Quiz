import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timeoutMultiplier:1,
    //0:No game
    //1:Game starting
    //2:Game in Progress
    //3:Game Over
    gameState:0,
    totalMatchTime:50,
    movehistory: {
      currentQuestion:"change to a template question",
      moves:[]
    },
    sessionPlayersArray:[
      {
        name: TheUser,
        isPlayer:true,
        wins:5,
        losses:7,
        description:"testPlayer and template",
        imange:null,
        timeleft:totalMatchTime,
        },
        {
          name: botTemplate,
          isPlayer:false,
          wins:100,
          losses:300,
          description:"testBot and template",
          imange:null,
          timeleft:totalMatchTime,
          move: function (movehistory){
              Newmove: [
              player=name
            ]
            return move
          }
        }
      ]
  },
  mutations: {

  },
  actions: {}
});
