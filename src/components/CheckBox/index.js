import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const CheckBox1 = ({
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
          getSelectionMode == 1 ? ['#000', '#8C8BA5'] : ['#fff', '#E39684']
        }
        start={getSelectionMode == 1 ? { x: 0, y: 0 } : { x: 0.9, y: 0 }}
        end={getSelectionMode == 1 ? { x: 0.7, y: 0 } : { x: 0.01, y: 0.5 }}
        style={{
          width: 42,
          height: 20,
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 2,
          borderColor: 'transparent'
        }}>
        <TouchableOpacity

style={{
    height: 19,
    width: 19,
    borderRadius: 2,
    backgroundColor:"red"
    // backgroundColor: getSelectionMode == 1 ? selectionColor : 'transparent',
  }}
          onPress={() => updatedSwitchData(1)}
          activeOpacity={.9}>
          {/* <LinearGradient
            start={{ x: 0, y: .1}}
            end={{ x: .7, y: .5 }}
            colors={
              getSelectionMode == 1
                ? ['#707070', '#A4A3BC']
                : ['transparent', 'transparent']
            }
            style={{
              height: 19,
              width: 19,
              borderRadius: 9.5,
              // backgroundColor: getSelectionMode == 1 ? selectionColor : 'transparent',
            }}></LinearGradient> */}
        </TouchableOpacity>




        <TouchableOpacity

style={{
    height: 19,
    width: 19,
    borderRadius: 2,
    backgroundColor:"red"
    // backgroundColor: getSelectionMode == 2 ? selectionColor : 'transparent',
  //   borderRadius: getRoundCorner ? 25 : 0
  }}

          onPress={() => updatedSwitchData(2)}
          activeOpacity={.9}>
          {/* <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1.4, y: 0.4 }}
            colors={
              getSelectionMode == 2
                ? ['#8C8BA5', '#E39684']
                : ['transparent', 'transparent']
            }
            style={{
              height: 19,
              width: 19,
              borderRadius: 9.5,
              // backgroundColor: getSelectionMode == 2 ? selectionColor : 'transparent',
            //   borderRadius: getRoundCorner ? 25 : 0
            }}></LinearGradient> */}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
export default CheckBox1
