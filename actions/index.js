/**
 * Created by diogomatoschaves on 04/03/2018.
 */
import { getDecksStorage, getDeckStorage, addCardToDeckStorage, addDeckTitleStorage } from '../utils/api'

export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_CARD_TO_QUIZ = 'ADD_CARD_TO_QUIZ'
export const RESET_QUIZ = 'RESET_QUIZ'

export function addDeckTitle ({ newDeck, deckTitle }) {
  return (dispatch) => {
    addDeckTitleStorage(newDeck, deckTitle)
    dispatch(addDeckTitleStore({ newDeck, deckTitle }))
  }
}

export function addDeckTitleStore ({ newDeck, deckTitle }) {
  return {
    type: ADD_DECK_TITLE,
    deckTitle,
    newDeck
  }
}

export function addCardToDeck ({ newCard, deckTitle }) {
  return (dispatch) => {
    addCardToDeckStorage(newCard, deckTitle)
    dispatch(addCardToDeckStore({ newCard, deckTitle }))
  }
}

export function addCardToDeckStore ({ newCard, deckTitle, }) {
  return {
    type: ADD_CARD_TO_DECK,
    deckTitle,
    newCard
  }
}

export function getDecks () {
  return (dispatch) => {
    getDecksStorage()
      .then((results) => {
        dispatch(getDecksStore(results))
      })
  }
}

export function getDecksStore (results) {
  return {
    type: GET_DECKS,
    results
  }
}

export function getDeck ({ deckTitle}) {
  return (dispatch) => {
    getDeckStorage(deckTitle)
      .then((deck) => {
        dispatch(getDeckStore({ deck, deckTitle }))
      })
  }
}

export function getDeckStore ({ deck, deckTitle }) {
  return {
    type: GET_DECK,
    deckTitle,
    deck
  }
}

export function addCardToQuiz ({ question }) {
  return {
    type: ADD_CARD_TO_QUIZ,
    question
  }
}

export function resetQuiz () {
  return {
    type: RESET_QUIZ
  }
}


