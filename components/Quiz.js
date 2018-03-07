/**
 * Created by diogomatoschaves on 06/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Easing } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { AppLoading } from 'expo'
import { removeCardFromQuiz, updateScore } from '../actions/index'
import FlipView from 'react-native-flip-view-next'
import { NavigationActions } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'


class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: 'Back',
      headerLeft: () => (
        <Entypo
          name={'chevron-left'}
          style={{color: 'white'}}
          onPress={ () =>
            navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home' })]
            }))
          }
          size={35}
        />),
      // headerStyle: styles.leftArrow
    }
        // title: 'Back',
  }

  state = {
    quizQuestion: null,
    isFlipped: false,
    correct: null,
    answered: false,
    next: true
  }

  componentWillMount() {
    const { remainingCards, doneCards } = this.props

    const quizQuestion = remainingCards[0]
    this.setState({ quizQuestion })
    this.props.removeCard(quizQuestion)
    
  }

  componentDidUpdate(prevProps) {

    const { remainingCards, doneCards } = this.props

    if (prevProps.doneCards !== doneCards && !this.state.answered) {
      const cardNumber = doneCards.length
      const totalCards = remainingCards.length + cardNumber

      if (cardNumber === totalCards){
        this.setState({cardNumber, totalCards, next: false})
      } else {
        this.setState({cardNumber, totalCards})
      }
    }
  }

  onPressCorrect = () => {
    if (!this.state.answered) {
      if (this.state.quizQuestion.answer === true) {
        this.setState({ answered: true, correct: true })
        this.props.updateScore('correct')
      } else {
        this.setState({ answered: true, correct: false })
        this.props.updateScore('incorrect')
    }}

    this.setState({ isFlipped: !this.state.isFlipped })
  }

  onPressIncorrect = () => {
    if (!this.state.answered) {
      if (this.state.quizQuestion.answer === false) {
        this.props.updateScore('correct')
        this.setState({ answered: true, correct: true })
      } else {
        this.setState({ answered: true, correct: false })
        this.props.updateScore('incorrect')
    }}

    this.setState({ isFlipped: !this.state.isFlipped })
  }

  onPressNext = () => {
    this.props.navigation.navigate('Quiz', {title: this.props.title})
  }

  onPressFinish = () => {
    this.props.navigation.navigate('Results', {title: this.props.title})
  }

  _renderFront = () => {

    const { quizQuestion, totalCards, cardNumber } = this.state

    // debugger;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        {cardNumber !== 0 && (
          <Text style={{fontSize: 20, padding: 20}}>{cardNumber}/{totalCards} </Text>
        )}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.text} >{quizQuestion.question}</Text>
          <TouchableOpacity
            style={{marginBottom: 20}}
            onPress={() => {
              this.setState({ isFlipped: !this.state.isFlipped})
            }}
          >
            <Text style={{fontSize: 20, textAlign: 'center', color: 'red'}}>Answer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn}
            textStyle={styles.correctBtnText}
            onPress={this.onPressCorrect}
            text={'Correct'}
            extraStyle={this.state.answered ? {backgroundColor: 'gray'} : {}}
            activeOpacity={this.state.answered ? 1 : 0.2}
          />
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn}
            textStyle={styles.incorrectBtnText}
            onPress={this.onPressIncorrect}
            text={'Incorrect'}
            extraStyle={this.state.answered ? {backgroundColor: 'gray'} : {}}
            activeOpacity={this.state.answered ? 1 : 0.2}
          />
        </View>
      </ScrollView>
    )
  }

  _renderBack = () => {
    const { quizQuestion, next } = this.state
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {this.state.answered &&
            (this.state.correct
            ? (<Text style={{fontSize: 15, color: 'green', textAlign: 'center', padding: 30}}>Correct!</Text>)
            : (<Text style={{fontSize: 15, color: 'red', textAlign: 'center', padding: 30}}>Incorrect...</Text>)
            )}
          <Text style={[styles.text, {fontSize: 30}]}>
            {quizQuestion.answer ? (
              <Text>Yes!</Text>
            ) : (
              <Text>No!</Text>
            )}
          </Text>
          <TouchableOpacity
            style={{marginBottom: 20}}
            onPress={() => {
              this.setState({ isFlipped: !this.state.isFlipped})
            }}
          >
            <Text style={{fontSize: 20, textAlign: 'center', color: 'red'}}>Question</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          {next ? (
            <Button
              btnStyle={Platform.OS === 'ios' ? styles.iosNextBtn : styles.androidNextBtn}
              textStyle={styles.nextBtnText}
              onPress={this.onPressNext}
              text={'Next'}
            />
          ) : (
            <Button
              btnStyle={Platform.OS === 'ios' ? styles.iosNextBtn : styles.androidNextBtn}
              textStyle={styles.nextBtnText}
              onPress={this.onPressFinish}
              text={'Results'}
            />
          )}

        </View>
      </ScrollView>
    )
  }

  render() {

    const { title } = this.props
    const { quizQuestion } = this.state

    // debugger;

    if (!title || !quizQuestion) {
      return (
        <AppLoading />
      )
    }

    return (
      <FlipView
        style={{flex: 1}}
        front={this._renderFront()}
        back={this._renderBack()}
        isFlipped={this.state.isFlipped}
        onFlipped={(val) => {console.log('Flipped: ' + val);}}
        flipAxis="y"
        flipEasing={Easing.out(Easing.ease)}
        flipDuration={500}
        perspective={1000}/>
    )
  }
}

const styles = StyleSheet.create({
  iosCorrectBtn: {
    backgroundColor: 'green',
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
    width: 250
  },
  androidCorrectBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  correctBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  iosIncorrectBtn: {
    backgroundColor: 'red',
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
    width: 250
  },
  androidIncorrectBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  incorrectBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  iosNextBtn: {
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
  androidNextBtn: {
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
  nextBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },

  buttonsContainer: {
    flex: 1,
    // boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  contentContainerStyle: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  flipText: {
    fontSize: 60,
    textAlign: 'center',
    width: 200,
    color: 'black',
    fontWeight: 'bold',
  },

})

function mapStateToProps({ quiz }, { navigation }) {

  const { title } = navigation.state.params;

  return {
    title,
    remainingCards: quiz.remainingCards,
    doneCards: quiz.doneCards,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    removeCard: (card) => dispatch(removeCardFromQuiz({ card })),
    updateScore: (scoreType) => dispatch(updateScore({ scoreType })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

