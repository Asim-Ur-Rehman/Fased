import React, { useState, useRef, useEffect } from 'react'
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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Login_User } from '../../utils/queries'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginManager, Profile } from 'react-native-fbsdk-next'

import LinkedInModal from 'react-native-linkedin'
import { SOCIAL_LOGIN } from '../../utils/mutation'
import { getApi } from '../../api/fakeApiUser'
import { useDispatch } from 'react-redux'
import { SignInAction, continueAsGuest } from '../../stores/actions/user.action'
import { useTranslation } from 'react-i18next';

import Recaptcha from 'react-native-recaptcha-that-works'
import { getFcmToken } from '../../utils/helper'

export const SignIn = ({ navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    getFcmToken()
    .then(token => {
      setfcmToken(token)
    })
  }, [])

  const recaptcha = useRef()
  
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [fcmToken, setfcmToken] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const linkedRef = useRef(null)

  const loginUser = useQuery(Login_User, {
    variables: {
      email: email,
      password: password,
      fcmToken: fcmToken
    }
  })
  const dispatch = useDispatch()
  const [socialMediaLogin, { data, loading, error }] = useMutation(SOCIAL_LOGIN)
  console.log("fcmToken", fcmToken)
  const signIn = async () => {

    if (email == '' || password == '') {
      ToastMessage('Please fill all the fields', null, 'error')
      setLoader(false)
    } else {
      if (loginUser?.error) {
        ToastMessage('Something went wrong', null, 'info')
        setLoader(false)
      }
      if (loginUser?.data?.loginUser?.status) {
        let jsonData = JSON.stringify(loginUser?.data?.loginUser?.data)
        AsyncStorage.setItem('userData', jsonData)
        // ToastMessage(loginUser?.data?.loginUser?.message, null, 'success')
        ToastMessage('Signed In Successfully', null, 'success')

        dispatch(SignInAction(loginUser?.data?.loginUser?.data))
        // navigation.navigate('AppStackNavigator', {
        //   screen: 'Home'
        // })
        setTimeout(() => {
          setEmail('')
          setPassword('')
        }, 2000)
        setLoader(false)
      } else {
        ToastMessage(loginUser?.data?.loginUser?.message, null, 'error')
        setLoader(false)
      }
    }
  }

  const fbLogin = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          Profile.getCurrentProfile().then(async function (currentProfile) {
            if (currentProfile) {
              socialMediaLogin({
                variables: {
                  providerId: currentProfile.userID,
                  registrationType: 'facebook',
                  name: currentProfile.name,
                  email: currentProfile.email ? currentProfile.email : undefined,
                  fcmToken: fcmToken
                }
              }).then(res => {
                AsyncStorage.setItem(
                  'userData',
                  JSON.stringify(res?.data?.socialMediaLogin?.data)
                )
                dispatch(SignInAction(res?.data?.socialMediaLogin?.data))
                ToastMessage(res?.data?.socialMediaLogin?.data, null, 'success')
                navigation.navigate('AppStackNavigator', {
                  screen: 'Home'
                })
              })
            }
          })
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }

  const linkedLogin = async token => {
    // Attempt a login using the LinkedIn login dialog asking for default permissions.
    try {
      const userData = await getApi(
        'https://api.linkedin.com/v2/me',
        '',
        token.access_token
      )
      socialMediaLogin({
        variables: {
          providerId: userData?.data?.id,
          registrationType: 'linikedin',
          name:
            userData?.data?.localizedFirstName +
            userData?.data?.localizedLastName,
          email: undefined,
          fcmToken: fcmToken
        }
      }).then(res => {
        AsyncStorage.setItem(
          'userData',
          JSON.stringify(res?.data?.socialMediaLogin?.data)
        )
        dispatch(SignInAction(res?.data?.socialMediaLogin?.data))
        ToastMessage(res?.data?.socialMediaLogin?.message, null, 'success')
        navigation.navigate('AppStackNavigator', {
          screen: 'Home'
        })
      })
    } catch (error) {
      console.log('error', error)
      ToastMessage(error, null, 'error')
    }
  }

  const guestUserLogin = () => {
    recaptcha.current.open()
  }
  const onVerify = token => {
    dispatch(continueAsGuest())
    navigation.navigate('AppStackNavigator')
    // console.log('success!', token)
  }
  const onExpire = () => {
    ToastMessage('Captcha expired', null, 'error')
  }
  const onError = () => {
    ToastMessage('Captcha error', null, 'error')
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader
        navigation={navigation}
        guestUser={true}
        onPress={() => {
          navigation.navigate('Languages')
        }}
        onPressGuset={() => {
          dispatch(continueAsGuest({
            guestUserLogin:'guesUserLogin'
          }))
          // navigation.navigate('AppStackNavigator')
          // alert('donehyugyu')
          // guestUserLogin()
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
          <Text style={styles.signInText}>{t('Sign_In')}</Text>
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
            <Text style={styles.inputLabel}>{t('Email_address')}</Text>
          </View>
          <TextInput
            value={email}
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder={t('eg_namaemail@emailkamu.com')}
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>{t('Password')}</Text>
          </View>

          <TextInput
            value={password}
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              checkBoxColor="#9CA3AF"
              checkedCheckBoxColor="#BE0000"
              style={{ alignSelf: 'center' }}
              onClick={() => setChecked(!checked)}
              isChecked={checked}
            />
            <Text style={styles.label}>{t('Remember_me')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPassword')
            }}
            activeOpacity={0.7}
            style={{}}>
            <Text style={styles.label}>{t('Forgot_Password')}?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 20
          }}>
          {loader ? (
            <ActivityIndicator size="large" color="#4A4C50" />
          ) : (
            <Button
              onPress={() => {
                setLoader(true)
                signIn()
              }}
              buttonStyle={{ width: '90%', height: 48, alignSelf: 'center' }}
              title={t('Sign_In')}
            />
          )}
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              color: '#252529',
              fontSize: 13,
              fontFamily: 'Inter-Regular'
            }}>
            {t('Or_sign_in_with_social_account')}
          </Text>
        </View>

        <View style={styles.socialIconContainer}>
          <TouchableOpacity
            onPress={fbLogin}
            activeOpacity={0.7}
            style={styles.fbImg}>
            <MaterialIcon name="facebook" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.TwitterImg}>
            <MaterialIcon name="twitter" size={28} color="#fff" />
          </TouchableOpacity>
          <LinkedInModal
            ref={linkedRef}
            clientID="78dauvk4h579n4"
            clientSecret="Z02I7Pk9v8Q9DSEo"
            renderButton={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // linkedRef.current.open()
                  }}
                  activeOpacity={0.7}
                  style={styles.InImg}>
                  <Icon name="linkedin" size={25} color="#fff" />
                </TouchableOpacity>
              )
            }}
            redirectUri="https://www.appstirr.com/"
            onSuccess={linkedLogin}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text
            style={{
              color: '#252529',
              fontSize: 13,
              fontFamily: 'Inter-Regular'
            }}>
            {t('Dont_have_an_account?')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp')
            }}
            activeOpacity={0.7}>
            <Text
              style={{
                color: '#BE0000',
                fontSize: 16,
                fontFamily: 'Inter-Medium',
                marginLeft: 3
              }}>
              {t('Sign_Up_Here')}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
     
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
    // backgroundColor:"#fff"
  },
  logoContainer: {
    width: width,
    height: height / 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // backgroundColor:"red"
  },
  textView: {
    width: width,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'Inter-Medium'
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
    fontFamily: 'Inter-Regular',
    backgroundColor: '#fff'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 11.7,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    marginLeft: 5
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 90
  },
  fbImg: {
    width: 50,
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 7.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5
  },
  TwitterImg: {
    width: 50,
    height: 50,
    backgroundColor: '#1DA1F2',
    borderRadius: 7.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5
  },
  InImg: {
    width: 50,
    height: 50,
    backgroundColor: '#2867B2',
    borderRadius: 7.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5
  }
})
