/**
 * Created by diogomatoschaves on 05/03/2018.
 */

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function Button ({ onPress, text, btnStyle, textStyle, extraStyle, ...rest }) {
  return (
    <TouchableOpacity
      style={[btnStyle, extraStyle]}
      onPress={onPress}
      {...rest}
    >
     <Text style={textStyle}>{text}</Text> 
    </TouchableOpacity>
  )

}
