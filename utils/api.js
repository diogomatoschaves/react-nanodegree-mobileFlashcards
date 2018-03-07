/**
 * Created by diogomatoschaves on 03/03/2018.
 */

import { AsyncStorage } from 'react-native'

const ENTRIES_KEY = 'MobileFlashcards:entries'

const initialStorage = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'React is a library for managing user interfaces',
        answer: true
      },
      {
        question: 'Is the componentDidMount lifecycle event a good place to make Ajax requests in React?',
        answer: true
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'A closure is the combination of a function and the lexical environment within ' +
        'which that function was declared',
        answer: true
      }
    ]
  }
}

export function setInitialStorage () {
  // AsyncStorage.clear()
  return AsyncStorage.mergeItem(ENTRIES_KEY, JSON.stringify(initialStorage))
  // return AsyncStorage.getItem(ENTRIES_KEY)
  //   .then((results) => {
  //
  //     if (results === null) {
  //       return AsyncStorage.mergeItem(ENTRIES_KEY, JSON.stringify(initialStorage))
  //     }
  //     console.log('results:', results);
  //   })
}

export function getDecksStorage () {
  return AsyncStorage.getItem(ENTRIES_KEY)
    // .then((results) => {
    //   return JSON.parse(results);
    // })
}

export function getDeckStorage (deckTitle) {
  return AsyncStorage.getItem(ENTRIES_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      if (data[deckTitle]) {
        return data[deckTitle]
      } else {
        return null
      }
    })
}

export function addDeckTitleStorage (newDeck, deckTitle) {
  return AsyncStorage.getItem(ENTRIES_KEY)
    .then((results) => {
      // debugger;
      const data = JSON.parse(results)
      if (data[deckTitle]) {

      } else {
        // data[deckTitle] = newDeck
        AsyncStorage.mergeItem(ENTRIES_KEY, JSON.stringify({
          [deckTitle]: newDeck
        } ))
      }
    })
}

export function addCardToDeckStorage (newCard, deckTitle) {

  return AsyncStorage.getItem(ENTRIES_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[deckTitle]

      deck.questions = [...deck.questions, newCard]

      AsyncStorage.mergeItem(ENTRIES_KEY, JSON.stringify({
        ...data,
        [deckTitle]: {
          ...deck,
          questions: deck.questions
        },
      }))
    })
}
