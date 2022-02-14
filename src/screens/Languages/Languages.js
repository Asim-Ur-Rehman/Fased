import React, { useEffect, useState } from 'react'
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
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import { AuthHeader } from '../../components/AuthHeader/AuthHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useTranslation } from 'react-i18next';
export const Languages = ({ navigation }) => {
  const [select, setSelect] = useState()
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  // useEffect(() => {
  //     navigation.navigate('AppStackNavigator')
  // }, [])

  // useEffect(() => {
  //   getUserData()
  // }, [])

  // const getUserData = async e => {
  //   let userData = await AsyncStorage.getItem('userData')
  //   let data = JSON.parse(userData)
  //   let checkForUser = data && Object.keys(data).length > 0
  //   if (checkForUser) {
  //     navigation.navigate('AppStackNavigator')
  //   }
  //   if (e && !checkForUser) {
  //     navigation.navigate('SignIn')
  //   }
  // }
  console.log("selectedLanguageCode", selectedLanguageCode)
  const Buttons = [
    { code: 'ar', label: 'Arabic' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'sp', label: 'Spanish' },
  ]

  const selectLanguage = (item) => {
    // console.log('slected', select)
    // if (select) {
    //   getUserData('click')
    // } else {
    //   ToastMessage('Please select any language', null, 'error')
    // }
    // getUserData('click')
    i18n.changeLanguage(item?.code);
    navigation.navigate('SignIn')
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: theme.primaryColor
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      {/* <AuthHeader guestUser={true} onPress={() => {
                navigation.navigate('SignIn')
            }} /> */}
      <View style={styles.logoMainViewStyle}>
        <Image
          source={Images.Pictures.logo}
          style={{
            width: 105,
            height: 105
          }}
        />
      </View>
      <View style={styles.textViewStyle}>
        <Text style={styles.textStyle}>Select your preferred language</Text>
      </View>

      {Buttons.map((item, i) => {
        return (
          <View
            key={i}
            style={{
              marginTop: i == 0 ? 30 : 20
            }}>
            <Button
              onPress={() => {
                // setSelect(item)
                selectLanguage(item)
              }}
              // linearColor1={
              //   select?.title == item?.title ? '#FE0000' : '#9CA3AF'
              // }
              // linearColor2={
              //   select?.title == item?.title ? '#680000' : '#4A4C50'
              // }
              linearColor1={item?.code == selectedLanguageCode ? '#FE0000' : '#9CA3AF'}
              linearColor2={item?.code == selectedLanguageCode ? '#680000' : '#9CA3AF'}
              title={item.label}
              buttonStyle={{
                width: '90%',
                alignSelf: 'center'
              }}
            />
          </View>
        )
      })}

      {/* <TouchableOpacity
        onPress={() => {
          selectLanguage()
        }}
        activeOpacity={0.9}
        style={{
          width: '20%',
          alignSelf: 'flex-end',
          //   height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',

          //   backgroundColor: 'red',
          marginTop: 20,
          flexDirection: 'row',
          marginRight: 25
        }}>
        <Text
          style={{
            fontSize: 20
          }}>
          Next
        </Text>
        <AntDesign name="arrowright" color="#000000" size={24} />
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  logoMainViewStyle: {
    // marginTop: 60,
    height: height * 0.33,
    alignItems: 'center',
    // backgroundColor: 'green',
    justifyContent: 'flex-end'
  },
  textViewStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 10
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    color: theme.textColor.grayText
  }
})
