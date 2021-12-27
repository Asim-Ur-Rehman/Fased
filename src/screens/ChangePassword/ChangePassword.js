import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator
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
import { Verify_Otp, New_Password } from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
export const ChangePassword = ({ navigation, route }) => {
  const emailFromParam = route?.params?.emailFromParam
  console.log('emailFromParam IN CAHNGE PASSS', emailFromParam)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const [NewPassword, { data, loading, error }] = useMutation(New_Password);
  const changePaswword = () => {
    if (newPassword == '' || confirmPassword == '') {
      ToastMessage('Form Error', 'Please fill all fields', 'error');
    }
    else if (newPassword.length <= 8) {
      ToastMessage(
        'New Password Error',
        'New Password should be greater then 8 character',
        'info',
      );

    }
    else if (newPassword !== confirmPassword) {
      ToastMessage(
        'Confirm Password Error',
        'Confirm Password does not match',
        'info',
      );

    }
    else {


      // let data = {
      //   newPassword: state.newPassword,
      //   confirmPassword: state.confirmPassword
      // }
      // dispatch(ChangePasswordAction(data, navigation))
      NewPassword({
        variables: {
          password: confirmPassword,
          email: emailFromParam
        }
      }).then((data) => {
        // console.log('data return', data.data.NewPassword.status)
        if (data?.data?.NewPassword?.status) {


          ToastMessage('Update Password Successfully', data?.data?.NewPassword?.message, 'success');
          navigation.push('SignIn')


        }
        else {
          ToastMessage('Password Error', data?.data?.NewPassword?.message, 'error');
        }


      })
        .catch((error) => {
          console.log('error', error)
          if (error) {
            ToastMessage('Password Error', 'Something went wrong', 'error');
          }
          else {
            ToastMessage('Password Error', error.data.NewPassword.message, 'error');
          }

        })


    }
  }

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
          <View style={{ width: '83%', alignSelf: 'center', }}>
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
            onChangeText={(text) => {
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
            onChangeText={(text) => {
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

          {
            loading ? <ActivityIndicator size='large' color='#4A4C50' /> :
              <Button
                onPress={() => {
                  changePaswword()
                }}
                // onPress={() => { navigation.navigate('SignIn') }}
                buttonStyle={{ width: '90%', height: 48, alignSelf: 'center', marginTop: 10 }}
                title="Submit"
              />
          }


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
  ChangePasswordText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily: "Rubik-Medium",
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
    fontFamily: "Rubik-Regular",
    backgroundColor: '#fff'
  }
})

