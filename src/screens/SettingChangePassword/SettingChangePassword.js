import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView
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
import { useDispatch } from 'react-redux'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { ChangePasswordAction } from '../../stores/actions/user.action'
import { Verify_Otp, New_Password, CHANGE_PASSWORD } from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const SettingChangePassword = ({ navigation, route }) => {
  //   const emailFromParam = route?.params?.emailFromParam
  //   console.log('emailFromParam IN CAHNGE PASSS', emailFromParam)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData')
    let data = JSON.parse(userData)
    setUserId(data?.id)
  }
  const dispatch = useDispatch()

  const [ChangePassword, { data, loading, error }] =
    useMutation(CHANGE_PASSWORD)
  console.log('error data', loading)

  const changePaswword = () => {
    if (newPassword == '' || confirmPassword == '') {
      ToastMessage('Please fill all fields', null, 'error')
    } else if (newPassword.length <= 8) {
      ToastMessage(
        'New Password should be greater then 8 character',
        null,
        'info'
      )
    } else if (newPassword !== confirmPassword) {
      ToastMessage('Confirm Password does not match', null, 'info')
    } else {
      ChangePassword({
        variables: {
          changePasswordId: parseInt(userId),
          currentPassword: oldPassword,
          newPassword: newPassword
        }
      })
        .then(data => {
          if (data?.data?.changePassword?.status) {
            ToastMessage(data?.data?.changePassword?.message, null, 'success')
            navigation.goBack()
          } else {
            ToastMessage(data?.data?.changePassword?.message, null, 'error')
          }
        })
        .catch(error => {
          console.log('error', error, {
            changePasswordId: parseInt(userId),
            currentPassword: oldPassword,
            newPassword: newPassword
          })
          if (error) {
            ToastMessage('Something went wrong', null, 'error')
          } else {
            ToastMessage(error.data.changePassword.message, null, 'error')
          }
        })
    }
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -200
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
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
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
          <Text style={styles.ChangePasswordText}>Change Password</Text>
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
          <View style={{ width: '83%', alignSelf: 'center' }}>
            <Text style={styles.inputLabel}>Current Password</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={text => {
              setOldPassword(text)
            }}
          />

          <View style={{ width: '83%', alignSelf: 'center' }}>
            <Text style={styles.inputLabel}>New Password</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={text => {
              setNewPassword(text)
            }}
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={text => {
              setConfirmPassword(text)
            }}
          />
        </View>

        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingVertical: 20
          }}>
          {loading ? (
            <ActivityIndicator size="large" color="#4A4C50" />
          ) : (
            <Button
              onPress={() => {
                changePaswword()
              }}
              // onPress={() => { navigation.navigate('SignIn') }}
              buttonStyle={{
                width: '90%',
                height: 48,
                alignSelf: 'center',
                marginTop: 10
              }}
              title="Submit"
            />
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
  ChangePasswordText: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'Rubik-Medium'
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
    fontFamily: 'Rubik-Regular',
    backgroundColor: '#fff'
  }
})
