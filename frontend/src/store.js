import Vue from "vue";
import Vuex from "vuex";
import avatar1 from "../public/images/avatar1test.png";
import avatar2 from "../public/images/avatar2test.png";
import avatar3 from "../public/images/avatar3test.png";
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
    loadedQuestions: [
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "history",
        question: "In what year was Gothenburg founded?",
        answer: 1621,
        low: 1000,
        high: 2000,
        learnMore: "https://en.wikipedia.org/wiki/Gothenburg"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "records",
        question:
          "is how many meters tall is Burj Khalifa, the highest building in the world?",
        answer: 828,
        low: 100,
        high: 1000,
        learnMore:
          "https://www.guinnessworldrecords.com/records/hall-of-fame/burj-khalifa-tallest-building-in-the-world"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "records",
        question:
          "The Longest human tunnel travelled through by a skateboarding dog contained how many persons?",
        answer: 30,
        low: 1,
        high: 100,
        learnMore:
          "https://www.guinnessworldrecords.com/records/hall-of-fame/otto-the-skateboarding-bulldog"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "records",
        question: "How many centimeters tall is the worlds tallest living man?",
        answer: 251,
        low: 200,
        high: 300,
        learnMore:
          "https://www.guinnessworldrecords.com/records/hall-of-fame/sultan-kosen-tallest-living-man"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "records",
        question: "How old was the youngest Nobel Prize winner ever?",
        answer: 17,
        low: 5,
        high: 70,
        learnMore:
          "https://www.guinnessworldrecords.com/records/hall-of-fame/malala-yousafzai-youngest-nobel-prize-winner"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "records",
        question: "How old was the youngest Nobel Prize winner ever?",
        answer: 17,
        low: 5,
        high: 70,
        learnMore:
          "https://www.guinnessworldrecords.com/records/hall-of-fame/malala-yousafzai-youngest-nobel-prize-winner"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "history",
        question: "in what year did Cristopher Columbus find America?",
        answer: 1492,
        low: 1000,
        high: 2000,
        learnMore:
          "https://www.history.com/topics/exploration/christopher-columbus"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "history",
        question:
          "in what year did Charles Darwin publish On the Origin of Species?",
        answer: 1859,
        low: 1800,
        high: 1950,
        learnMore:
          "http://darwin-online.org.uk/EditorialIntroductions/Freeman_OntheOriginofSpecies.html"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "random",
        question:
          "What Percentage Of Americans Have Served In The Military?(rounded to whole percents)",
        answer: 7,
        low: 0,
        high: 100,
        learnMore:
          "https://fivethirtyeight.com/features/what-percentage-of-americans-have-served-in-the-military/"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "random",
        question:
          "What Percentage of the water on Earth is drinkable?(rounded to whole percents)",
        answer: 0,
        low: 0,
        high: 100,
        learnMore:
          "https://www.worldatlas.com/articles/what-percentage-of-the-earth-s-water-is-drinkable.html"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "record",
        question:
          "How many flavours does the biggest ice cream bar in Europe offer?",
        answer: 331,
        low: 50,
        high: 500,
        learnMore: "http://www.glassmagasinet.se/"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "history",
        question:
          "In what year did The Simpsons first air on American Television?",
        answer: 1989,
        low: 1940,
        high: 1990,
        learnMore: "https://simpsons.fandom.com/wiki/History_of_The_Simpsons"
      },
      {
        userSubmitted: false,
        author: "Pontus Fredriksson",
        category: "history",
        question: "It-högskolan was founded in what year?",
        answer: 2012,
        low: 2000,
        high: 2018,
        learnMore: "No."
      }
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
            timeTook: 2000 //*timeoutMultiplier();
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }
      },
      {
        name: "PontusBot",
        isPlayer: false,
        id: 2,
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
            timeTook: 2000 //*timeoutMultiplier();
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
          return newMove;
        }
      },
      {
        name: "PetrosBot",
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
            timeTook: 2000 //*timeoutMultiplier();
          };
          console.log("botten " + this.name + "gissar: " + newMove.guess);
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
          low: 0,
          high: 200
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
    min: (state, getters) => {
      let temp = getters.lastMove.low;
      if (typeof temp !== "undefined") {
        return temp;
      } else if (
        typeof state.moveHistory.moves[state.moveHistory.moves.length - 2]
          .low !== "undefined"
      )
        return state.moveHistory.moves[state.moveHistory.moves.length - 2].low;
      else return 0;
    },
    max: (state, getters) => {
      let temp = getters.lastMove.high;
      if (typeof temp !== "undefined") {
        return temp;
      } else if (
        typeof state.moveHistory.moves[state.moveHistory.moves.length - 2]
          .high !== "undefined"
      )
        return state.moveHistory.moves[state.moveHistory.moves.length - 2].high;
      else return 999;
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
          state.isLoggedIn = true
          state.currentUser.name = payload.user
          state.user = payload.user
      },
      logout(state) {
          state.isLoggedIn = false
          state.currentUser.name = 'guest'
          state.gameState = 1
      }
  },
  actions: {
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
      document.documentElement.style.setProperty(
        "--playerAmount",
        state.sessionPlayersArray.length
      );
    },
    assignQuestion({ state, dispatch, commit }, index) {
      state.currentPlayerIndex = 0;
      state.currentQuestion = state.loadedQuestions[index];
      state.moveHistory.question = state.loadedQuestions[index].question;
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
        }, 1000);
      }
    },
    addMove({ state }, newMove) {
      //pushes last object in array to the same array
      state.moveHistory.moves.push(newMove);
    },
    toggleAnimations({ state }) {
      const root = document.documentElement;

      root.style.setProperty("--animationTime", state.timeoutMultiplier);
      },
      async login({ commit }, payload) {
          await axios.post('http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/login', {
              userName: payload.user,
              password: payload.password
          })
              .then((resp) => {
                  commit('login', payload)
                  console.log(resp.data.msg)
              }).catch((err) => console.log(err))
      },
      logout({ commit }) {
          commit('logout')
      }
  }
});
