import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
export default function Button({
  title = 'Title',
  onPress = () => {},
  textStyle = {},
  buttonStyle = {},
  linearColor1 = '#9CA3AF',
  linearColor2 = '#4A4C50',
  startColor = { x: 1, y: 0 },
  endColor = { x: 0, y: 1 }
}) {
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          style={[styles.button, buttonStyle]}
          colors={[linearColor1, linearColor2]}
          // RED LINEAR COLORS: '#FE0000' , '#680000'

          start={startColor}
          end={endColor}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 335,
    height: 48.81,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 38.76
  },
  // shadow : {
  //     shadowColor: "#FE0000",
  //     shadowOffset: {width: 0,height: 3},
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,
  //     elevation: 7,
  // },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
