import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-vector-icons/Ionicons'
export default function Button({
  title = 'Title',
  onPress = () => { },
  textStyle = {},
  buttonStyle = {},
  linearColor1 = '#9CA3AF',
  linearColor2 = '#4A4C50',
  startColor = { x: 1, y: 0 },
  endColor = { x: 0, y: 1 },
  isIcon = false,
  image = false,
  iconName = "menu",
  imageStyle = {},
  iconStyle = {},
  disabled
}) {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          style={[styles.button, buttonStyle]}
          colors={[linearColor1, linearColor2]}
          // RED LINEAR COLORS: '#FE0000' , '#680000'

          start={startColor}
          end={endColor}>
          {!isIcon && !image ?
            <Text style={[styles.text, textStyle]}>{title}</Text>
            :
            <>
              {isIcon ? <Icon name={iconName} style={[iconStyle]} /> : <Image source={image} style={[imageStyle]} />}
            </>
          }
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
    fontFamily: "OpenSans-Bold",
    textAlign: 'center'
  }
})
