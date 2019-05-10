import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu:[
      "Theme",
      "animations"
    ],

    timeoutMultiplier:1,
    //0:No game
    //1:Game starting
    //2:Game in Progress
    //3:Game Over
    gameState:0,
    totalMatchTime:50,
    currentPlayerIndex:0,
    currentQuestion:{
      userSubmitted:false,
      author: "guest",
      question:"How many developers work in the group six lobsters?",
      answer:7,
      low:1,
      high:10
    },
    loadedQuestions:[

    ],
    loadedBots:[
      {
        name: "botTemplate",
        isPlayer:false,
        wins:100,
        losses:300,
        description:"testBot and template",
        image:null,
        timeleft:1337, //totalMatchTime,
        move() {
            let lastMove= state.moveHistory[moveHistory.length-1];
            let newMove= {
              guess: lastMove.high-1,
              timeTook:2//*timeoutMultiplier();
            }
          return newMove;
        }
      }
    ],
    currentUser:{
      id:0,
      databaseId:null,
      name: "guest",
      isPlayer:true,
      wins:5,
      losses:7,
      description:"testPlayer and template",
      image:null,
      timeleft:1337, //totalMatchTime,
    },
    moveHistory: {
      question:null,
      moves:[]
    },
    sessionPlayersArray:[
      ]
  },
  getters: {
    timeoutMultiplier(state){
      return state.timeoutMultiplier;
    },
    lastMove(state){
      return state.moveHistory[moveHistory.length-1];
    },
    currentPlayer(state){
      return state.sessionPlayersArray[state.currentPlayerIndex];
    },
  },
  mutations:{

  },
  actions: {
    //TODO DO THIS
    toggleBotChosen({state}, payloadIndex){
      let selectedBot =state.loadedBots[payloadindex];
      if(typeOf(state.sessionPlayersArray.find(o => o.id ===
      selectedBot.id)) == undefined ){
        state.sessionPlayersArray.splice(indexOf(selectedBot));
      }else{
        state.sessionPlayersArray.push(selectedBot);
      }
    },
    assignQuestion({state,question}){
      state.currentQuestion= question,
      state.moveHistory.length=0,
      state.moveHistory.push({
        low:state.currentQuestion.low,
        high:state.currentQuestion.high
      })
    },
    turnFinished({state, getters}){
      //if someone won:
      if(getters.lastMove().guess==
          state.currentQuestion.answer){
            state.gameState=3;
      }else{
        if(getters.lastMove().guess>currentQuestion.answer&&
           getters.lastMove().guess < getters.lastMove().high){
          getters.lastMove().high = getters.lastMove().guess;
        }else if(getters.lastMove().guess > getters.lastMove().low){
          getters.lastMove().low = getters.lastMove().guess;
        }

        //if last player
        if(state.currentPlayerIndex==state.sessionPlayersArray.length-1){
          state.currentPlayerIndex=0;
        }else{
          state.currentPlayerIndex++;
        }
        //if bots turn
        if(!getters.currentPlayer().isPlayer){
          addMove(getters.currentPlayer().move)
          //recursive
          state.turnFinished();
        }
      }
    },
    addMove({state, getters}, newMove){
        //pushes last object in array to the same array
        state.moveHistory.push(getters.lastMove());
        //forEach Propertyname in newMove
        Object.keys(newMove).forEach(function (element){
          //set movehistory properties to newMove properties
          getters.lastMove()[element]=newMove[element];
        })
    }
  }
});
