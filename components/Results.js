/**
 * Created by diogomatoschaves on 07/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { AppLoading } from 'expo'
import { NavigationActions } from 'react-navigation'
import { initializeQuiz } from '../actions/index'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'


class Results extends Component {

  static navigationOptions = ({ navigation }) => {
    const {title} = navigation.state.params

    return {
      title,
      headerLeft: () => (
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', margin: 0}}
          onPress={() => navigation.navigate('DeckView', { title })}
        >
          <FontAwesome
            name={'angle-left'}
            style={{color: 'white', marginLeft: 6, marginRight: 6, paddingBottom: 2}}
            size={37}
          />
          <Text style={{color: 'white', fontSize: 17}}>
            {title}
          </Text>
        </TouchableOpacity>),
    }
  }

  state = {
    correctPercentage: null
  }


  componentDidMount() {

    const { score } = this.props
    const correctPercentage = ((score.correct / (score.correct + score.incorrect)) * 100).toFixed(0)

    this.setState({ correctPercentage })
    
    clearLocalNotification()
      .then(setLocalNotification())

  }

  onPressDeckView = () => {
    const { title } = this.props
    this.props.navigation.navigate('DeckView', { title })
  }

  onPressRestart = () => {
    const { title, questions, startQuiz } = this.props
    
    startQuiz(questions)
    
    this.props.navigation.navigate('Quiz', { title })
  }

  render() {

    const { correctPercentage } = this.state

    return (
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[styles.text, {fontSize: 50}]}>
            Score:
          </Text>
          <View style={styles.container}>
            {correctPercentage ? (
              <Text style={styles.scoreText}>
                {correctPercentage}%
              </Text>
            ) : (
              <AppLoading/>
            )}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
            textStyle={[styles.btnText, { color: 'black'}]}
            onPress={this.onPressDeckView}
            text={'Go to Deck'}
            extraStyle={{backgroundColor: 'white', marginTop: 30}}
          />
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
            textStyle={styles.btnText}
            onPress={this.onPressRestart}
            text={'Restart Quiz'}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  scoreText: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    color: 'gray'

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iosBtn: {
    backgroundColor: 'black',
    padding: 15,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 0.8,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  androidBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
})

function mapStateToProps ({ decks, quiz }, { navigation }) {
  
  const { title } = navigation.state.params
  
  return {
    title,
    score: quiz.score,
    questions: decks[title].questions
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    startQuiz: (questions) => dispatch(initializeQuiz({ questions })) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
