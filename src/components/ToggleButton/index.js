import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const ToggleButton = ({
  navigation,
  selectionMode,
  onSelectSwitch
  //   selectionColor,
  //   roundCorner,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode)
  //   const [getRoundCorner, setRoundCorner] = useState(roundCorner)

  const updatedSwitchData = val => {
    setSelectionMode(val)
    onSelectSwitch(val)
  }

  return (
    <View>
      <LinearGradient
        colors={
          getSelectionMode == 1
            ? ['#E0E5F2', '#E0E5F2']
            : ['#FE0000', '#680000']
        }
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: 36,
          height: 18,
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2
        }}>
        <TouchableOpacity
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: getSelectionMode == 1 ? '#fff' : 'transparent'
          }}
          onPress={() => updatedSwitchData(1)}
          activeOpacity={0.9}></TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: getSelectionMode == 2 ? '#fff' : 'transparent'
          }}
          onPress={() => updatedSwitchData(2)}
          activeOpacity={0.9}></TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
export default ToggleButton
