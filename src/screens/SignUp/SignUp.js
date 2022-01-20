import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
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
import { SignUpAction } from '../../stores/actions/user.action'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { Add_User } from '../../utils/mutation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
export const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  // const loading = useSelector(state => state.userReducer.isLoading)
  const [addUser, { data, loading, error }] = useMutation(Add_User)
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -280

  const signUp = () => {
    let value =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    if (fullName == '' || email == '' || password == '') {
      ToastMessage('Please fill all the fields', null, 'error')
    } else if (!value) {
      ToastMessage('Please enter a valid email address', null, 'info')
    } else if (password.length <= 8) {
      ToastMessage('Password should be greater than 8 character', null, 'info')
    } else if (confirmPassword != password) {
      ToastMessage('Confirm Password does not match', null, 'info')
    } else {
      addUser({
        variables: {
          email: email,
          name: fullName,
          password: password
        }
      })
        .then(data => {
          // console.log('data return', data)
          if (data?.data?.addUser?.status) {
            let userData = data?.data?.addUser?.data
            let jsonData = JSON.stringify(userData)
            AsyncStorage.setItem('userData', jsonData)
            ToastMessage(data?.data?.addUser?.message, null, 'success')

            navigation.navigate('AppStackNavigator', {
              screen: 'Home'
            })
          } else {
            // ToastMessage(data?.data?.addUser?.message, null, 'error')
            ToastMessage('Email already exists', null, 'error')
          }
        })
        .catch(error => {
          console.log('error', error)
          if (error) {
            ToastMessage('Something went wrong', null, 'info')
          } else {
            ToastMessage(error?.data?.addUser?.message, null, 'info')
          }
        })

      // dispatch(SignUpAction(data, navigation))
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
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Platform.OS == "ios" ? 0 : 40 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.Pictures.logo}
            style={{ width: 105, height: 105 }}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
            <Text style={styles.inputLabel}>Full Name</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            onChangeText={text => setFullName(text)}
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Email address</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Eg namaemail@emailkamu.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Password</Text>
          </View>
          <Input
            containerStyle={styles.input}
            inputStyle={{ fontSize: 12 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={show ? false : true}
            onChangeText={text => setPassword(text)}
            rightIcon={
              <Icon
                size={15}
                onPress={() => setShow(!show)}
                name={show ? 'eye' : 'eye-off'}
              />
            }
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
          </View>
          <Input
            containerStyle={styles.input}
            inputStyle={{ fontSize: 12 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="**** **** ****"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            secureTextEntry={showConfirm ? false : true}
            onChangeText={text => setconfirmPassword(text)}
            rightIcon={
              <Icon
                size={15}
                onPress={() => setShowConfirm(!showConfirm)}
                name={showConfirm ? 'eye' : 'eye-off'}
              />
            }
          />
        </View>

        <View
          style={{
            paddingVertical: 20
          }}>
          {loading ? (
            <ActivityIndicator size="large" color="#4A4C50" />
          ) : (
            <Button
              onPress={() => signUp()}
              buttonStyle={{ width: '90%', height: 48, alignSelf: 'center' }}
              title="Sign Up"
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
    height: height / 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textView: {
    width: width,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpText: {
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
  }
})
