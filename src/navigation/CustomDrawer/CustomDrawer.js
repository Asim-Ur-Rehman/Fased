import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { Images } from '../../constants/images'

export const CustomDrawer = ({ navigation }) => {
  const [active, setActive] = useState('')
  const isGuest = useSelector((state) => state.userReducer.isGuest)

  const Data = [
    {
      title: 'Home',
      navigateTo: 'Home'
    },
    {
      title: 'About Us'
      //   navigateTo: 'AboutUs'
    },
    {
      title: 'Settings'
      // navigateTo: 'Setting'
    },
    {
      title: isGuest ? 'SignUp' : 'Logout',
      navigateTo: isGuest ? 'SignUp' : 'SignIn'
    },
    // {
    //   title: 'Logout',
    //   navigateTo: 'SignIn'
    // }
  ]

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.topCutButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Image
            source={Images.Pictures.closeIcon}
            style={{ width: 13, height: 13, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Data.map((item, i) => {
          return (
            <LinearGradient
              key={i}
              colors={
                active == i
                  ? ['#ffffff20', '#6C8CB220', '#ffffff20']
                  : ['#ffffff', '#ffffff']
              }
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainView}>
              <TouchableOpacity
                onPress={() => {
                  setActive(i)
                  item.navigateTo && navigation.navigate(item.navigateTo)
                  //   alert('Navigate')
                }}
                activeOpacity={0.7}
                key={i}
                style={{
                  height: 65,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: i == active ? '#fff' : 'transparent',
                  marginVertical: 8
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "OpenSans-Bold",
                    color: i == active ? '#000' : '#ACB8BE'
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  topCutButton: {
    alignItems: 'flex-end',
    marginTop: 50,
    paddingRight: 20
  },
  mainView: {
    width: '100%'
  },
})
