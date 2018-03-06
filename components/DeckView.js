/**
 * Created by diogomatoschaves on 05/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { AppLoading } from 'expo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


class DeckView extends Component {
  
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.item

    return {
      title
    }
  }
  
  onPressAddCard = () => {
    const { title } = this.props
    this.props.navigation.navigate('AddCard', { title })
  }
  
  onPressStartQuiz = () => {
    const { title } = this.props
    this.props.navigation.navigate('Quiz', { title })
  }
  
  render() {
    
    const { title, questions } = this.props
    
    if (!title || !questions) {
      return (
        <AppLoading />
      )
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[{fontSize: 30, textAlign: 'center', marginTop: 100}]}>{title}</Text>
          <Text style={[{fontSize: 20, textAlign: 'center', color: 'gray', marginBottom: 70}]}>
            {questions.length} cards
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosAddCardBtn : styles.androidAddCardBtn}
            textStyle={styles.addCardBtnText}
            onPress={this.onPressAddCard}
            text={'Add Card'}
          />
          <Button
            btnStyle={Platform.OS === 'ios' ? styles.iosStartQuizBtn : styles.androidStartQuizBtn}
            textStyle={styles.startQuizBtnText}
            onPress={this.onPressStartQuiz}
            text={'Start Quiz'}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  iosAddCardBtn: {
    backgroundColor: 'white',
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
  androidAddCardBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addCardBtnText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  iosStartQuizBtn: {
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
  androidStartQuizBtn: {
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
  startQuizBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flex: 1,
    // boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    margin: 30
  }
})

function mapStateToProps({ decks }, { navigation }) {

  const { title } = navigation.state.params.item;

  return {
    title,
    questions: decks[title].questions
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
