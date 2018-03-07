/**
 * Created by diogomatoschaves on 07/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { AppLoading } from 'expo'
import { NavigationActions } from 'react-navigation'


class Results extends Component {

  state = {
    correctPercentage: null
  }


  componentDidMount() {

    const { score } = this.props

      // if (prevProps.score !== score) {

      // debugger;

    const correctPercentage = ((score.correct / (score.correct + score.incorrect)) * 100).toFixed(0)

    this.setState({ correctPercentage })

  }

  onPressBtn = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      })
    )
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
            textStyle={styles.btnText}
            onPress={this.onPressBtn}
            text={'Finish'}
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
    marginTop: 30,
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

function mapStateToProps ({ quiz }) {
  return {
    score: quiz.score
  }
}

export default connect(mapStateToProps)(Results)
