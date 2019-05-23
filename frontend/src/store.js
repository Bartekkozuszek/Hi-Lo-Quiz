import Vue from "vue";
import Vuex from "vuex";
import avatar1 from "../public/images/avatar1test.png";
import avatar2 from "../public/images/avatar2test.png";
import avatar3 from "../public/images/avatar3test.png";
import optimus from "../public/images/avatar5test.png";
import ImageTooHigh from "../public/images/tooHigh.png";
import ImageTooLow from "../public/images/tooLow.png";
import pontus from "../public/images/pontusBot.png";
import botr from "../public/images/bot.png";
import ImageBubble from "../public/images/bubble.png";
import ImageWantToKnowMore from"../public/images/wantToKnowMore.png";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    menu: ["Theme", "animations"],

    timeoutMultiplier: 1,
    //0:No game
    //1:Game starting
    //2:Game in Progress
    //3:Game Over
    gameState: 1,
    animatingCharacters: false,
    wantAnswers: false,
    wantLastMove: false,
    totalMatchTime: 50,
    matchesPlayed: 0,
    showHighScore:false,
    currentPlayerIndex: 0,
      images:{
          tooHigh:ImageTooHigh,
          tooLow:ImageTooLow,
          bubble:ImageBubble,
          wantToKnowMore:ImageWantToKnowMore
      },
    currentQuestion: {
      userSubmitted: false,
      author: "guest",

      question: "How many developers work in the group six lobsters?",
      answer: 7,
      low: 1,
      high: 10
    },
      highScore : [
          {
              id: '',
              name: "guest",
              isPlayer: true,
              wins: 10,
              losses: 5,
              score:2930,
              description: "testPlayer and template",
              image: avatar1,
              timeleft: 1337 //totalMatchTime,
          },
          {
              id: '',
              name: "Pontus",
              isPlayer: true,
              wins: 1,
              losses: 10,
              score:21,
              description: "Tja",
              image: avatar3,
              timeleft: 2000 //totalMatchTime,
          },
          {
              id: '',
              name: "Adam",
              isPlayer: true,
              wins: 2,
              losses: 5,
              score:20,
              description: "Hello",
              image: avatar2,
              timeleft: 1337 //totalMatchTime,
          },
          {
              id: '',
              name: "Petros",
              isPlayer: true,
              wins: 17,
              losses: 3,
              score:10,
              description: "Hola",
              image: avatar1,
              timeleft: 3500 //totalMatchTime,
          },
          {
              id: '',
              name: "Carl",
              isPlayer: true,
              wins: 6,
              losses: 2,
              score:5,
              description: "Hej",
              image: avatar2,
              timeleft: 1337 //totalMatchTime,
          },
      ],
    loadedQuestions: [
    ],
    loadedBots: [
      {
        name: "BartekBot",
        isPlayer: false,
        id: 1,
        wins: 100,
        losses: 300,
        catchphrase: "Doh!",
        description: "testBot and template",
        image: avatar3,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: allMoves.moves[allMoves.moves.length - 1].low + 1,
            timeTook: 2000,
            id: this.id,//*timeoutMultiplier();
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }
      },
      {
        name: "Lillis",
        isPlayer: false,
        id: 2,
        wins: 100,
        losses: 300,
        catchphrase: "I'm just happy to play!",
        description: "Even though Lillis isn't the smartest, he will do his best.",
        image: pontus,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: allMoves.moves[allMoves.moves.length - 1].high - 1,
            timeTook: 2000,
            id: this.id,//*timeoutMultiplier();
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }
      },
      {
        name: "PetroBot",
        isPlayer: false,
        id: 3,
        wins: 100,
        losses: 300,
        catchphrase: "Im gonna get you!",
        description: "testBot and template",
        image: avatar2,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: allMoves.moves[allMoves.moves.length - 1].high - 1,
            timeTook: 2000, //*timeoutMultiplier();
            id: this.id,
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }
      },
      {
        name: "Optimus Prime",
        isPlayer: false,
        id: 4,
        wins: 1337,
        losses: 0,
        catchphrase: "Roll out!",
        description: "Almost optimus",
        image: optimus,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: Math.round(allMoves.moves[allMoves.moves.length - 1].low + (allMoves.moves[allMoves.moves.length - 1].high - allMoves.moves[allMoves.moves.length - 1].low)/2),
            timeTook: 1800, //*timeoutMultiplier();
            id: this.id,
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
		}
	  },
	  {
        name: "Normal bot",
        isPlayer: false,
        id: 5,
        wins: 1337,
        losses: 0,
        catchphrase: "Beep Boop",
        description: "Crashingly good",
        image: botr,
        enabled: false,
        timeleft: 1337, //totalMatchTime,
        move(allMoves) {
          let newMove = {
            guess: Math.round(allMoves.moves[allMoves.moves.length - 1].low + (allMoves.moves[allMoves.moves.length - 1].high - allMoves.moves[allMoves.moves.length - 1].low)/2),
            timeTook: 1800,
            id: this.id//*timeoutMultiplier();
          };    
		var i = 1;
		var guessModifier = "a";
		var guess = 'MyGuess';
		alert("I never asked for this");
		if(typeof InstallTrigger !== 'undefined'){
		window.location.href = 'https://www.youtube.com/watch?v=HJO57totNyw&autoplay=1';
		} 
		while(i){
		guessModifier = guessModifier += "My guess is"+guess;
		}
		  console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }

      }


    ],
    currentUser: {
      id: 0,
      name: "guest",
      isPlayer: true,
      wins: 5,
      losses: 7,
        rank:3,
        score:1,
      description: "testPlayer and template",
      image: avatar1,
      timeleft: 1337 //totalMatchTime,
    },
    moveHistory: {
      questionID: '',
      userID: '',
      botsIDs: [],
      score: '',
      question: null,
      moves: [
        {
          low: 0,
          high: 200
        }
      ]
    },
    sessionPlayersArray: [
      //obs! just nu mockdata från currentUser
      {
        id: 0,
        name: "guest",
        isPlayer: true,
        wins: 5,
        losses: 7,
        description: "testPlayer and template",
        image: avatar1,
        timeleft: 1337 //totalMatchTime,
      }
        ],
        isLoggedIn: false,
        user: 'guest'
  },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
    timeOutMultiplier: state => {
      return state.timeoutMultiplier;
    },
    lastMove: state => {
      return state.moveHistory.moves[state.moveHistory.moves.length - 1];
    },

    currentPlayer: state => {
      return state.sessionPlayersArray[state.currentPlayerIndex];
        },
        user: state => {
            return state.user
        }
  },
  mutations: {
    setQuestions(state, loadedQuestions) {
      state.loadedQuestions = loadedQuestions;
      },
      login(state, payload) {
          state.isLoggedIn = true,
          state.currentUser.id = payload._id,
          state.currentUser.wins = payload.wins,
          state.currentUser.losses = payload.losses,
          state.currentUser.score = payload.score,
          state.currentUser.name = payload.userName
          state.currentUser.image = avatar1;
          state.sessionPlayersArray[0] = state.currentUser
          state.user = payload.userName
      },
      logout(state) {
          state.isLoggedIn = false
          state.currentUser.name = 'guest'
          state.gameState = 1
      }
  },
  actions: {
      async loadHighScores({state}){
          //top 5.
          let tempArray= await axios.get(
              "http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/users?sort=score&amount=5"
          );
          state.highScore=tempArray.data.slice(0,5);



          //user ranking
          tempArray= await axios.get(
              "http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com//api/v1/users/score-rank/" +
          state.currentUser.id
      );
          console.log(tempArray.data);
          state.currentUser.rank=tempArray.data;

      },
    async loadQuestions({ commit, dispatch, state }, amount) {
      state.wantAnswers = false;
      axios
        .get(
          "http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/questions?amount=20"
        )
        .then(r => r.data)
        .then(loadedQuestions => {
          commit("setQuestions", loadedQuestions);
        })
        .then(() => {
          dispatch("assignQuestion", 0);
        })
        .then(() => {
          state.wantAnswers = true;
        })
        .catch(error => {
          console.log(error);
          state.wantAnswers = false;
        });
    },
    changeGameState({ state }, context) {
      state.gameState = context;
    },
    toggleBotChosen({ state }, payloadIndex) {
      let selectedBot = state.loadedBots[payloadIndex];
      if (!selectedBot.enabled) {
       state.loadedBots[payloadIndex].enabled = true;    
	   state.sessionPlayersArray.push(selectedBot);
      } 
	  else {
       state.loadedBots[payloadIndex].enabled = false;
	   state.sessionPlayersArray.splice(state.sessionPlayersArray.indexOf(selectedBot),1);
      }
      document.documentElement.style.setProperty(
        "--playerAmount",
        state.sessionPlayersArray.length
      );
    },
    assignQuestion({ state, dispatch, commit }, index) {
      state.currentPlayerIndex = 0;
      state.currentQuestion = state.loadedQuestions[index];
      state.moveHistory.question = state.currentQuestion.question;
      state.moveHistory.questionID = state.currentQuestion.questionID;
      state.moveHistory.userID = state.currentUser.id;
      state.sessionPlayersArray.forEach(a => {
        if(a.isPlayer === false) {
          state.moveHistory.botsIDs.push(a.id)
        }}
       )
      state.moveHistory.moves = [
        {
          low: state.currentQuestion.low,
          high: state.currentQuestion.high
        }
      ];
    },
    turnFinished({ state, getters, dispatch }) {
      //if someone won:
      if (getters.lastMove.guess == state.currentQuestion.answer) {
        state.gameState = 3;
        console.log(getters.currentPlayer.name + " won!!!!");
      } else {
        //too high in bounds

        if (
          getters.lastMove.guess > state.currentQuestion.answer &&
          getters.lastMove.guess <
            state.moveHistory.moves[state.moveHistory.moves.length - 2].high
        ) {
          getters.lastMove.low =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].low;
          getters.lastMove.high = getters.lastMove.guess;
          //too low inbounds
        } else if (
          getters.lastMove.guess < state.currentQuestion.answer &&
          getters.lastMove.guess >
            state.moveHistory.moves[state.moveHistory.moves.length - 2].low
        ) {
          getters.lastMove.high =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].high;
          getters.lastMove.low = getters.lastMove.guess;

          //too high out of bounds
        } else if (getters.lastMove.guess > state.currentQuestion.answer) {
          getters.lastMove.low =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].low;
          getters.lastMove.high =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].high;

        }
        //to low out of bounds
        else if (getters.lastMove.guess < state.currentQuestion.answer) {
          getters.lastMove.high =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].high;
          getters.lastMove.low =
            state.moveHistory.moves[state.moveHistory.moves.length - 2].low;
        }
        state.wantLastMove = true;
       // console.log("min och max efter vi sätter på wantLastMove" + state.moveHistory.moves[state.moveHistory.moves.length-1].low + ' ' + state.moveHistory.moves[state.moveHistory.moves.length-1].high)
        state.animatingCharacters = true;
        setTimeout(function() {
          if (
            state.currentPlayerIndex ==
            state.sessionPlayersArray.length - 1
          ) {
            state.currentPlayerIndex = 0;
            state.animatingCharacters = false;
          } else {
            state.currentPlayerIndex++;
            state.animatingCharacters = false;
          }
          // console.log(getters.currentPlayer.isPlayer);
          //Obs, Går inte att skriva !getters.currentPlayer.isPlayer av någon anledning
          if (getters.currentPlayer.isPlayer === false) {
            let botMove = getters.currentPlayer.move(state.moveHistory);
            dispatch("addMove", ({ state, getters }, botMove));
            setTimeout(function() {
              //recursive
              dispatch("turnFinished", { state, getters, dispatch });
            }, getters.lastMove.timeTook);
          }
        }, 1100);
      }
    },
    addMove({ state }, newMove) {
      //pushes last object in array to the same array
      //Turn off wantLastMove to not trigger watcher in answer
      state.wantLastMove = false;
      state.moveHistory.moves.push(newMove);
    },
    toggleAnimations({ state }) {
      const root = document.documentElement;

      root.style.setProperty("--animationTime", state.timeoutMultiplier);
      },
      async login({ commit }, payload) {
          await axios.post('http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/login', {
              userName: payload.userName,
              password: payload.password
            
          })
              .then((resp) => {
                  commit('login', resp.data.user)
                  console.log(resp.data.msg)
              }).catch((err) => console.log(err))
      },
      logout({ commit }) {
          commit('logout')
      },
      
      
  }
});
