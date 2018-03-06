/**
 * Created by diogomatoschaves on 03/03/2018.
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecksStore } from '../actions/index'
import { getDecksStorage } from '../utils/api.js'


class DecksList extends Component {

  componentDidMount() {
    getDecksStorage()
      .then((results) => {
        const data = JSON.parse(results)
        this.props.getDecks(data)
      })
  }

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
              'DeckView',
              { item }
            )}
    >
     <View style={styles.item} >
      <Text style={styles.text}>{item.title}</Text>
      <Text style={{fontSize: 18, color: 'gray'}}>{item.questions.length} cards</Text>
     </View>
    </TouchableOpacity>
    );

  render () {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks).reduce((newArray, item) => {
                newArray.push(decks[item]);
                return newArray}, [])}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'black',
    fontSize: 23
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
});

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getDecks: (results) => dispatch(getDecksStore(results))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksList)
