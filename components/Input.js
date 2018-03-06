/**
 * Created by diogomatoschaves on 05/03/2018.
 */

import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, Platform } from 'react-native'

export default function Input ({ styles, updateText, text, ...rest }) {
  
  return (
      <TextInput
        onChangeText={(text) => updateText({ text })}
        value={text}
        style={styles}
        {...rest}
      >
      </TextInput>
  )
}

//    <KeyboardAvoidingView behaviour="padding">
