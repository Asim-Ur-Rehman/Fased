import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import CheckBox from 'react-native-check-box'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { AuthHeader } from '../../components/AuthHeader/AuthHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

export const ForgetPassword = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader
        onPress={() => {
          navigation.goBack()
        }}
      />
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.Pictures.logo}
            style={{ width: 105, height: 105 }}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.ForgetPasswordText}>Forgot Password</Text>
          <View
            style={{
              backgroundColor: '#FE0000',
              width: 21,
              height: 1,
              marginTop: 8
            }}
          />
        </View>
        <View style={styles.InputContainer}>


          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Email address</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="Eg namaemail@emailkamu.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />
        </View>

        <View style={{ width: '76%', alignSelf: 'center', marginTop: 8, paddingVertical: 10 }}>
          <Text style={{ color: "#A8AEB9", fontSize: 14, fontFamily:"Rubik-Regular", lineHeight: 16, textAlign: "center" }}>A message will be sent to your email address
            with further instructions</Text>
        </View>

        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingVertical: 20
          }}>
          <Button
            onPress={() => { navigation.navigate('ChangePassword') }}
            buttonStyle={{ width: '90%', height: 48, alignSelf: 'center', marginTop: 10 }}
            title="Recover Password"        
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logoContainer: {
    width: width,
    height: height / 4.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textView: {
    width: width,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ForgetPasswordText: {
    fontSize: 18,
    fontFamily:"Rubik-Medium",
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily:"Rubik-Medium",
  },
  input: {
    width: '88%',
    alignSelf: 'center',
    height: 48,
    marginVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#BEC5D1',
    paddingHorizontal: 14,
    color: '#374151',
    fontSize: 12,
    fontFamily:"Rubik-Regular",
    backgroundColor: '#fff'
  }
})


