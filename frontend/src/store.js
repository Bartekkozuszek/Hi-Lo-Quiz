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
    currentPlayerIndex:0,
    currentQuestion:{
      userSubmitted:false,
      author: "guest",
      question:"How many developers work in the group six lobsters?",
      answer:7,
      low:1,
      high:10
    },
    moveHistory: {
      question:null,
      moves:[]
    },
    sessionPlayersArray:[
      {
        databaseId:null,
        name: "guest",
        isPlayer:true,
        wins:5,
        losses:7,
        description:"testPlayer and template",
        image:null,
        timeleft:1337, //totalMatchTime,
        },
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
                timeTook:2
              }
            return newMove;
          }
        }
      ]
  },
  mutations: {
    assignQuestion(state,question){
      state.currentQuestion= question,
      state.moveHistory.length=0,
      state.moveHistory.push({
        low:state.currentQuestion.low,
        high:state.currentQuestion.high
      })
    },
    turnFinished(state){
      //if someone won:
      if(state.moveHistory[moveHistory.length].guess==
          state.currentQuestion.answer){
            state.gameState=3;
      }else{
        if(state.moveHistory[moveHistory.length].guess>currentQuestion.answer
          && state.moveHistory[moveHistory.length].guess<
          state.moveHistory[moveHistory.length].high
        ){
          state.moveHistory[moveHistory.length].high=
          state.moveHistory[moveHistory.length].guess;
        }else if(state.moveHistory[moveHistory.length].guess>
        state.moveHistory[moveHistory.length].low){
          state.moveHistory[moveHistory.length].low=
          state.moveHistory[moveHistory.length].guess;
        }



        //if last player
        if(state.currentPlayerIndex==state.sessionPlayersArray.length-1){
          state.currentPlayerIndex=0;
        }else{
          state.currentPlayerIndex++;
        }
        //if bots turn
        if(!state.sessionPlayersArray[state.currentPlayerIndex].isPlayer){
          addMove(state.sessionPlayersArray[state.currentPlayerIndex].move)
          //recursive
          state.turnFinished();
        }
      }
    },
    addMove(state, newMove){
        //pushes last object in array to the same array
        state.moveHistory.push(
          state.moveHistory[state.moveHistory[state.movieHistory.length-1]]);
        //forEach Propertyname in newMove
        Object.keys(newMove).forEach(function (element){
          //set movehistory properties to newMove properties
          state.moveHistory[length-1][element]=newMove[element];
        })
    }
  },
  actions: {}
});
