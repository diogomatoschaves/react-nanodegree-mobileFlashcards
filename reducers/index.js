/**
 * Created by diogomatoschaves on 04/03/2018.
 */

import { ADD_CARD_TO_DECK, ADD_DECK_TITLE,
  GET_DECK, GET_DECKS, ADD_CARD_TO_QUIZ, RESET_QUIZ } from '../actions/index'
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

function quiz (state = {questions: []}, action) {
  switch (action.type) {
    case ADD_CARD_TO_QUIZ :
      return {
        ...state,
        questions: [...state.questions, action.question]
      }
    case RESET_QUIZ :
      return {
        ...state,
        questions: []
      }
    default :
      return state
  }
}

export default combineReducers({
  decks,
  quiz
})