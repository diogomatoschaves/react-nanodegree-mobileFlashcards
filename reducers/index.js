/**
 * Created by diogomatoschaves on 04/03/2018.
 */

import { ADD_CARD_TO_DECK, ADD_DECK_TITLE, GET_DECK, GET_DECKS, 
  INITIALIZE_QUIZ, REMOVE_CARD_FROM_QUIZ, RESET_QUIZ, UPDATE_SCORE } from '../actions/index'
import { combineReducers } from 'redux'


function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK_TITLE :
      return {
        ...state,
        [action.deckTitle]: action.newDeck
      }
    case ADD_CARD_TO_DECK :
      const { deckTitle } = action
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [...state[deckTitle].questions, action.newCard]
        }
      }
    case GET_DECKS :
      return {
        ...action.results
      }
    case GET_DECK :
      return {
        ...state,
        [action.deckTitle]: action.deck
      }
    default :
      return state
  }
}

function quiz (state = {questions: [], score: {correct: 0, incorrect: 0}}, action) {
  switch (action.type) {
    case INITIALIZE_QUIZ :
      return {
        ...state,
        questions: action.questions
      }
    case REMOVE_CARD_FROM_QUIZ :
      return {
        ...state,
        questions: Object.keys(state.questions).reduce((accumulator, item) => {
          if (action.card !== item) {
            accumulator = [...accumulator, item]
          }
          return accumulator
        }, [])
      }
    case UPDATE_SCORE :
      if (action.scoreType === 'correct') {
        return {
          ...state,
          score: {
            ...state.score,
            correct: state.score.correct + 1
          }
        }
      } else {
        return {
          ...state,
          score: {
            ...state.score,
            incorrect: state.score.incorrect + 1
          }
        }
      }
    case RESET_QUIZ :
      return {
        ...state,
        questions: [],
        score: {correct: 0, incorrect: 0}
      }
    default :
      return state
  }
}

export default combineReducers({
  decks,
  quiz
})