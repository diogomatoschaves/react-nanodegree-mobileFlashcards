/**
 * Created by diogomatoschaves on 06/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { AppLoading } from 'expo'
import { removeCardFromQuiz, updateScore } from '../actions/index'
import { FlipView } from 'react-native-flip-view-next'
// var FlipView = require('react-native-flip-view');


class DeckView extends Component {

  // static navigationOptions = ({ navigation }) => {
  //   const { title } = navigation.state.params
  //
  //   return {
  //     title
  //   }
  // }

  state = {
    quizQuestion: null,
    isFlipped: false
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  componentDidMount() {
    const quizQuestion = this.props.quizQuestions.pop()
    this.setState({ quizQuestion })
    this.props.removeCard(quizQuestion)
  }

  onPressCorrect = () => {
    this.props.updateScore('correct')
  }

  onPressIncorrect = () => {
    this.props.updateScore('incorrect')
  }

  onPressNext = () => {

  }

  // _renderFront = () => {
  //   return (
  //
  //   )
  // }
  //
  // _renderBack = () => {
  //   const { quizQuestion } = this.state
  //
  //   )
  // }

  render() {

    const { title, questions } = this.props
    const { quizQuestion } = this.state

    // debugger;

    if (!title || !quizQuestion) {
      return (
        <AppLoading />
      )
    }

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate},
        {perspective: 1000}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate },
        {perspective: 1000}
      ]
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.text} >{quizQuestion.question}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isFlipped: !this.state.isFlipped})
                  this.flipCard()
                }}
              >
                <Text style={{fontSize: 15, textAlign: 'center', color: 'red'}}>Answer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                btnStyle={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn}
                textStyle={styles.correctBtnText}
                onPress={this.onPressCorrect}
                text={'Correct'}
              />
              <Button
                btnStyle={Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn}
                textStyle={styles.incorrectBtnText}
                onPress={this.onPressIncorrect}
                text={'Incorrect'}
              />
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.flipText}>
                {quizQuestion.answer}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isFlipped: !this.state.isFlipped})
                  this.flipCard()
                }}
              >
                <Text style={{fontSize: 15, textAlign: 'center', color: 'red'}}>Question</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                btnStyle={Platform.OS === 'ios' ? styles.iosNextBtn : styles.androidNextBtn}
                textStyle={styles.nextBtnText}
                onPress={this.onPressNext}
                text={'Next'}
              />
            </View>
          </Animated.View>
      </ScrollView>
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
    fontSize: 60,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 30,
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
  flipCard: {
    // width: 200,
    // height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "green",
    position: "absolute",
    top: 0,
    alignSelf: 'center',
    left: 0,
    right: 0,
    // height: 300
  },
  flipText: {
    fontSize: 60,
    textAlign: 'center',
    width: 200,
    color: 'black',
    fontWeight: 'bold',
  },
  flipBackCard: {
    position: "absolute",
    top: 0,
    margin:0
  },
})

function mapStateToProps({ decks, quiz }, { navigation }) {

  const { title } = navigation.state.params;

  return {
    title,
    quizQuestions: quiz.questions,
    questions: decks[title].questions
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    removeCard: (card) => dispatch(removeCardFromQuiz({ card })),
    updateScore: (scoreType) => dispatch(updateScore({ scoreType })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)

// <Input
//               styles={Platform.OS === 'ios' ? styles.iosTextInput : styles.androidTextInput}
//               updateText={this.updateAnswer}
//               value={this.state.answer}
//               placeholder={'Answer'}
//               autoFocus={true}
//             />

// <View style={styles.btnsContainer}>
//               <Button
//                 btnStyle={Platform.OS === 'ios' ? styles.iosTrueFalseBtn : styles.androidTrueFalseBtn}
//                 textStyle={styles.submitBtnText}
//                 text={'True'}
//                 activeOpacity={!this.state.answer ? 1 : 0.2}
//                 onPress={() => this.setState({ answer: true})}
//                 extraStyle={this.state.answer ? {backgroundColor: 'green'} : styles.selectedBtn}
//                 elevation={this.state.answer ? 10 : 0}
//               />
//               <Button
//                 btnStyle={Platform.OS === 'ios' ? styles.iosTrueFalseBtn : styles.androidTrueFalseBtn}
//                 textStyle={styles.submitBtnText}
//                 text={'False'}
//                 activeOpacity={this.state.answer ? 1 : 0.2}
//                 onPress={() => this.setState({ answer: false})}
//                 extraStyle={!this.state.answer ? {backgroundColor: 'red'} : styles.selectedBtn}
//                 elevation={!this.state.answer ? 10 : 0}
//               />