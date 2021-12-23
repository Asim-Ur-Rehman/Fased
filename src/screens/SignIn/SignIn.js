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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useDispatch } from 'react-redux'
import { useMutation, useLazyQuery } from '@apollo/client'
import { SignInAction } from '../../stores/actions/user.action'
import { Login_User } from '../../utils/queries'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignIn = ({ navigation }) => {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser, { data, loading, error }] = useLazyQuery(Login_User);

  const dispatch = useDispatch()

  const signIn = () => {
    if (email == '' || password == '') {
      ToastMessage('Form Error', 'Please fill all fields', 'error');
    }
    else {


      loginUser({
        variables: {
          email: email,
          password: password
        }
      }).then((data) => {
        console.log('data return', data.data.loginUser.status)
        if (data.data.loginUser.status) {
          let userData = data.data.loginUser.data
          let jsonData = JSON.stringify(userData)
          AsyncStorage.setItem('userData', jsonData)

          ToastMessage('User SignIn Successfully', data.data.loginUser.message, 'success');

          navigation.navigate('AppStackNavigator', {
            screen: 'Home',
          })
          setEmail('')
          setPassword('')

        }
        else {
          ToastMessage('SignIn Error', data.data.loginUser.message, 'error');
        }


      })
        .catch((error) => {
          console.log('error', error)
          ToastMessage('SignIn Error', error.data.loginUser.message, 'error');
        })
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader
        navigation={navigation}
        guestUser={true}
        onPress={() => {
          navigation.navigate('Languages')
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
          <Text style={styles.signInText}>Sign In</Text>
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
            <Text style={styles.inputLabel}>Email address</Text>
          </View>
          <TextInput
            value={email}
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="Eg namaemail@emailkamu.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) =>
              setEmail(text)
            }
          />

          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>Password</Text>
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
            onChangeText={(text) =>
              setPassword(text)
            }
          />
        </View>

        <View style={styles.checkboxContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              checkBoxColor="#9CA3AF"
              checkedCheckBoxColor="#BE0000"
              style={{ alignSelf: 'center', }}
              onClick={() => setChecked(!checked)}
              isChecked={checked}
            />
            <Text style={styles.label}>Remember me</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPassword')
            }}
            activeOpacity={0.7}
            style={{}}>
            <Text style={styles.label}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 20
          }}>

          {
            loading ? <ActivityIndicator size='large' color='#4A4C50' /> :
              <Button

                onPress={() => {
                  signIn()
                }}

                buttonStyle={{ width: '90%', height: 48, alignSelf: 'center' }}
                title="Sign In"
              />
          }


        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#252529', fontSize: 13, fontFamily: "Inter-Regular", }}>
            Or sign in with social account
          </Text>
        </View>

        <View style={styles.socialIconContainer}>
          <TouchableOpacity activeOpacity={0.7} style={styles.fbImg}>
            <MaterialIcon name="facebook" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.TwitterImg}>
            <MaterialIcon name="twitter" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.InImg}>
            <Icon name="linkedin" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{ color: '#252529', fontSize: 13, fontFamily: "Inter-Regular" }}>
            Don’t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp')
            }}
            activeOpacity={0.7}>
            <Text
              style={{
                color: '#BE0000',
                fontSize: 13,
                fontFamily: "Inter-Medium",
                marginLeft: 3
              }}>
              Sign Up Here
            </Text>
          </TouchableOpacity>
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
    fontFamily: "Inter-Medium",
    textAlign: 'center',
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily: "Inter-Medium",
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
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-SemiBold",
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


