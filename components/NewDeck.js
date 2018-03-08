/**
 * Created by diogomatoschaves on 05/03/2018.
 */

import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, Keyboard,
  StyleSheet, TextInput, Platform, TouchableWithoutFeedback } from 'react-native'
import Button from './Button'
import Input from './Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { addDeckTitle } from '../actions/index'
import { connect } from 'react-redux'


class NewDeck extends Component {

  state = {
    text: '',
    disabled: true,
  };

  updateText = ({ text }) => {
    this.setState(() => ({
      text,
      disabled: !Boolean(text)
    }))
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      const { text } = this.state
      const { addDeck, goToDeck } = this.props

      addDeck({title: text, questions: []}, text)
      
      goToDeck(text)
      
      this.setState({ text: '', disabled: true})
    }
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.text} >What's the title of the new deck?</Text>
            <Input
              styles={Platform.OS === 'ios' ? styles.iosTextInput : styles.androidTextInput}
              updateText={this.updateText}
              value={this.state.text}
              placeholder={'Deck Name'}
              autoFocus={true}
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
    marginTop: 80,
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 50,
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
    marginTop: 10,
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
})

function mapStateToProps () {
  return {}
}


function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addDeck: (newDeck, deckTitle) => dispatch(addDeckTitle({ newDeck, deckTitle })),
    goToDeck: (title) => navigation.navigate('DeckView', { title })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
