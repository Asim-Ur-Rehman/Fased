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
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useDispatch } from 'react-redux'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountDown from 'react-native-countdown-component'
import { Verify_Otp, Forgot_Password } from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
export const Otp = ({ navigation, route }) => {
  const emailFromParam = route?.params?.emailFromParam
  const [buttonClick, setButtonClicked] = useState(false)
  const [timer, setTimer] = useState(120)
  const dispatch = useDispatch()

  const [OtpVerify_Email, { data, loading, error }] = useMutation(Verify_Otp)
  const [forgotPassword, { data1, loading1, error1 }] =
    useMutation(Forgot_Password)
  const Submit = async otp => {
    OtpVerify_Email({
      variables: {
        token: otp,
        email: emailFromParam
      }
    })
      .then(data => {
        if (data.data.OtpVerify_Email.status) {
          ToastMessage(data.data.OtpVerify_Email.message, null, 'success')
          navigation.navigate('ChangePassword', {
            emailFromParam: emailFromParam
          })
        } else {
          ToastMessage(data.data.OtpVerify_Email.message, null, 'error')
        }
      })
      .catch(error => {
        console.log('error', error)
        ToastMessage(error.data.OtpVerify_Email.message, null, 'error')
      })
    // let OtpData = {
    //     otp: parseInt(otp),
    //     email: state.paramEmail_Number,
    //     timer: state.timer,
    // };
    // console.log('send data', OtpData);
  }

  const _timer = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center'
          // flexDirection: 'row',
          // justifyContent: 'space-between'
        }}>
        {buttonClick ? null : (
          <>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Rubik-Medium',
                // textAlign: 'center'
                color: '#A8AEB9'
              }}>
              OTP will expired in
            </Text>
            <CountDown
              until={timer}
              size={15}
              onFinish={() => setButtonClicked(!buttonClick)}
              digitStyle={{ backgroundColor: '#fff' }}
              digitTxtStyle={{ color: '#A8AEB9' }}
              timeToShow={['M', 'S']}
              // timeLabels={{ s: 'SS'}}
              timeLabelStyle={{ color: '#fff', fontWeight: 'bold' }}
              // showSeparator
            />
          </>
        )}
      </View>
    )
  }

  const _resendOtp = async () => {
    // console.log('Resend Click');
    setTimer(120)
    setButtonClicked(false)

    forgotPassword({
      variables: {
        email: emailFromParam
      }
    })
      .then(data => {
        if (data.data.forgotPassword.status) {
          ToastMessage(data.data.forgotPassword.message, null, 'success')
          // navigation.navigate('Otp', {
          //     emailFromParam: email
          // })
        } else {
          ToastMessage(data.data.forgotPassword.message, null, 'error')
        }
      })
      .catch(error => {
        console.log('error', error)
        ToastMessage(error.data.forgotPassword.message, null, 'error')
      })
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <AuthHeader
                onPress={() => {
                    navigation.goBack()
                }}
            /> */}
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
          <Text style={styles.ForgetPasswordText}>Verify OTP</Text>
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
          <OTPInputView
            style={{ width: '80%', height: 100 }}
            pinCount={6}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            keyboardType="default"
            onCodeFilled={code => {
              // console.log(`Code is ${code}, you are good to go!`)
              Submit(code)
            }}
          />
        </View>

        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
          {_timer()}
        </View>

        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingVertical: 20
          }}>
          <Button
            onPress={() => {
              _resendOtp()
            }}
            // onPress={() => { navigation.navigate('ChangePassword') }}
            buttonStyle={{
              width: '90%',
              height: 48,
              alignSelf: 'center',
              marginTop: 10
            }}
            title="Resend OTP"
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
  },

  underlineStyleBase: {
    width: 40,
    height: 50,
    backgroundColor: 'white',

    borderWidth: 1,
    // borderBottomWidth: 1,
    color: 'black',
    fontSize: 16
  },

  underlineStyleHighLighted: {
    borderColor: '#374151'
  }
})
