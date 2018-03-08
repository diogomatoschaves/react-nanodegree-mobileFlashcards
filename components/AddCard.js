/**
 * Created by diogomatoschaves on 05/03/2018.
 */

import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, Keyboard, View,
  StyleSheet, TextInput, Platform, TouchableWithoutFeedback } from 'react-native'
import Button from './Button'
import Input from './Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { addCardToDeck } from '../actions/index'
import { connect } from 'react-redux'


class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: '',
    disabled: true,
  };

  updateQuestion = ({ text }) => {
    const { answer } = this.state

    this.setState(() => ({
      question: text,
      disabled: !Boolean(text) || !Boolean(answer)
    }))
  }

  updateAnswer = ({ text }) => {
    const { question } = this.state

    this.setState(() => ({
      answer: text,
      disabled: !Boolean(text) || !Boolean(question)
    }))
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      const { question, answer } = this.state
      const { addCard, goBack, title } = this.props

      addCard({question, answer}, title)

      goBack()
    }
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.text} >Insert the question and the answer</Text>
            <Input
              styles={Platform.OS === 'ios' ? styles.iosTextInput : styles.androidTextInput}
              updateText={this.updateQuestion}
              value={this.state.question}
              placeholder={'Question or statement'}
              autoFocus={true}
            />
            <Input
              styles={Platform.OS === 'ios' ? styles.iosTextInput : styles.androidTextInput}
              updateText={this.updateAnswer}
              value={this.state.answer}
              placeholder={'Answer'}
            />
            <Button
              btnStyle={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
              textStyle={styles.submitBtnText}
              text={'Submit'}
              activeOpacity={this.state.disabled ? 1 : 0.2}
              onPress={this.onSubmit}
              extraStyle={this.state.disabled ? {backgroundColor: 'gray'} : {}}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  iosTextInput: {
    alignSelf: 'stretch',
    height: 50,
    fontSize: 20,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 1.2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  androidTextInput: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: 'black',
    padding: 15,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 0.8,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 10,
  },
  androidSubmitBtn: {
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
  submitBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iosTrueFalseBtn: {
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 0.8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  androidTrueFalseBtn: {
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedBtn: {
    elevation: 10,
    backgroundColor: 'gray',
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
})

function mapStateToProps(state, { navigation }) {

  const { title } = navigation.state.params;

  return {
    title
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addCard: (newCard, deckTitle) => dispatch(addCardToDeck({ newCard, deckTitle })),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

