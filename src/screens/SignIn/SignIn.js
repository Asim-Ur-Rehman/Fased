import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'

export const SignIn = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgrounds.whiteBG
      }}>
      <Text> SignIn Screen </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp')
        }}>
        <Text>Next</Text>
      </TouchableOpacity>

      <Button
        linearColor1="#FE0000"
        linearColor2="#680000"
        startColor={{ x: 0, y: 1 }}
        endColor={{ x: 1, y: 0 }}
      />
    </View>
  )
}
