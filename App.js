import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar, Platform } from 'react-native';
import { setInitialStorage, getDecksStorage, } from './utils/api'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import reducer from './reducers/index'
import DecksList from './components/DecksList.js'
import DeckView from './components/DeckView.js'
import AddCard from './components/AddCard.js'
import Quiz from './components/Quiz.js'
import NewDeck from './components/NewDeck.js'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'


const reduxEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  reduxEnhancers(applyMiddleware(thunk), applyMiddleware(logger)) // ,
);

function FlashcardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'black',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height:3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
        alignSelf: 'flex-start',
        paddingLeft: 0
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
        paddingLeft: 0
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
        paddingLeft: 0
      },
    }
  }
},)


export default class App extends React.Component {
  
  componentDidMount() {
    // AsyncStorage.clear()
    setInitialStorage()
  }
  
  render() {
    return (
      <Provider store={store} >
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={'black'} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     ,
//   },
// });
