import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    menu: ["Theme", "animations"],

    timeoutMultiplier: 1,
    //0:No game
    //1:Game starting
    //2:Game in Progress
    //3:Game Over
    gameState: 0,
    totalMatchTime: 50,
    currentPlayerIndex: 0,
    currentQuestion: {
      userSubmitted: false,
      author: "guest",

      question: "How many developers work in the group six lobsters?",
      answer: 7,
      low: 1,
      high: 10
    },
    loadedQuestions: [],
    loadedBots: [
      {
        name: "botTemplate",
        isPlayer: false,
        wins: 100,
        losses: 300,
        description: "testBot and template",
        image: null,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: allMoves.moves[allMoves.moves.length-1].high - 1,
            timeTook: 2 //*timeoutMultiplier();
          };
            console.log("botten " + this.name + "gissar: " + newMove.guess)
          return newMove;
        }
      }
    ],
    currentUser: {
      id: 0,
      databaseId: null,
      name: "guest",
      isPlayer: true,
      wins: 5,
      losses: 7,
      description: "testPlayer and template",
      image: null,
      timeleft: 1337 //totalMatchTime,
    },
    moveHistory: {
      question: null,
      moves: [
        {
          low: 1,
          high: 10
        }

      ]

    },
    sessionPlayersArray: [
      //obs! just nu mockdata från currentUser
      {
        id: 0,
        databaseId: null,
        name: "guest",
        isPlayer: true,
        wins: 5,
        losses: 7,
        description: "testPlayer and template",
        image: null,
        timeleft: 1337 //totalMatchTime,
      }
    ]
  },
  getters: {
    timeOutMultiplier: state => {
      return state.timeoutMultiplier;
    },
    lastMove: state => {
        return state.moveHistory.moves[state.moveHistory.moves.length - 1];
    },
    currentPlayer: state => {
      return state.sessionPlayersArray[state.currentPlayerIndex];
    }
  },
  mutations: {},
  actions: {
    toggleBotChosen({ state }, payloadIndex) {
      let selectedBot = state.loadedBots[payloadIndex];
      if (
        typeof state.sessionPlayersArray.find(o => o.id === selectedBot.id) ==
        "undefined"
      ) {
        state.sessionPlayersArray.push(selectedBot);
        selectedBot.enabled = true;
      } else {
        selectedBot.enabled = false;
        state.sessionPlayersArray.splice(
          state.sessionPlayersArray.indexOf(selectedBot)
        );
      }
    },
    assignQuestion({ state, question }) {
      (state.currentQuestion = question),
        (state.moveHistory.length = 0),
        state.moveHistory.push({
          low: state.currentQuestion.low,
          high: state.currentQuestion.high
        });
    },
    turnFinished({ state, getters, dispatch }) {
      //if someone won:
      if (getters.lastMove.guess == state.currentQuestion.answer) {
        state.gameState = 3;
        console.log(getters.currentPlayer.name + " won!!!!")
      } else {
          //too high in bounds
        if (
          getters.lastMove.guess > state.currentQuestion.answer &&
          getters.lastMove.guess < state.moveHistory.moves[state.moveHistory.moves.length-2].high
        ) {
          getters.lastMove.low = state.moveHistory.moves[state.moveHistory.moves.length-2].low;
          getters.lastMove.high = getters.lastMove.guess;
          //too low inbounds
        } else if (getters.lastMove.guess < state.currentQuestion.answer &&
          getters.lastMove.guess > state.moveHistory.moves[state.moveHistory.moves.length-2].low) {
          getters.lastMove.high = state.moveHistory.moves[state.moveHistory.moves.length-2].high;
          getters.lastMove.low = getters.lastMove.guess;

          //too high out of bounds
        } else if (getters.lastMove.guess > state.currentQuestion.answer){
            getters.lastMove.low = state.moveHistory.moves[state.moveHistory.moves.length-2].low;
            getters.lastMove.high = state.moveHistory.moves[state.moveHistory.moves.length-2].high
        }
        //to low out of bounds
        else if (getters.lastMove.guess < state.currentQuestion.answer){
            getters.lastMove.high = state.moveHistory.moves[state.moveHistory.moves.length-2].high;
            getters.lastMove.low = state.moveHistory.moves[state.moveHistory.moves.length-2].low
        }

        //if last player
        if (state.currentPlayerIndex == state.sessionPlayersArray.length - 1) {
          state.currentPlayerIndex = 0;
        } else {
          state.currentPlayerIndex++;
        }
        //Obs, Går inte att skriva !getters.currentPlayer.isPlayer av någon anledning
        if (getters.currentPlayer.isPlayer === false) {
            console.log("jag körs inte va??")
            let botMove = getters.currentPlayer.move(state.moveHistory);
          dispatch("addMove", ({ state, getters },botMove));

          //recursive
          dispatch("turnFinished", { state, getters, dispatch });
        }
      }
    },
    addMove({ state }, newMove) {
      //pushes last object in array to the same array
      state.moveHistory.moves.push(newMove);

    }
  }
});
