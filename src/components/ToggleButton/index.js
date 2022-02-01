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
    <TouchableOpacity
      onPress={() => updatedSwitchData(getSelectionMode == 1 ? 2 : 1)}
      activeOpacity={0.9}>
      <LinearGradient
        colors={
          selectionMode == 1 ? ['#E0E5F2', '#E0E5F2'] : ['#FE0000', '#680000']
        }
        start={{ x: 0.55, y: 0 }}
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
        <View
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: selectionMode == 1 ? '#fff' : 'transparent'
          }}
          // onPress={() => updatedSwitchData(1)}
        ></View>

        <View
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: selectionMode == 2 ? '#fff' : 'transparent'
          }}
          // onPress={() => updatedSwitchData(2)}
        ></View>
      </LinearGradient>
    </TouchableOpacity>
  )
}
export default ToggleButton