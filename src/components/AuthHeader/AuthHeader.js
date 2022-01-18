import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { continueAsGuest } from '../../stores/actions/user.action'

export const AuthHeader = ({ guestUser, onPress = () => {}, navigation }) => {
  const dispatch = useDispatch()
  return (
    <View
      style={{
        width: '88%',
        alignSelf: 'center',
        height: 50,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <AntDesign name="arrowleft" color="#000000" size={24} onPress={onPress} />

      {guestUser && (
        <TouchableOpacity
          onPress={() => {
            dispatch(continueAsGuest())
            navigation.navigate('AppStackNavigator')
          }}
          activeOpacity={0.7}>
          <LinearGradient
            style={{
              width: 180,
              height: 36,
              borderRadius: 10,
              backgroundColor: '#f9f9fb',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            colors={['#9CA3AF', '#4A4C50']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                color: theme.textColor.whiteText
              }}>
              Continue as Guest User
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  )
}
