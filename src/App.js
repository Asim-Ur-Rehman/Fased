import 'react-native-gesture-handler'
import React, { useEffect, useState, useRef } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
const App = () => {
  useEffect(() => {
    setTimeout(
      () => {
        SplashScreen.hide()
      },
      Platform.OS == 'ios' ? 3000 : 1000
    )
  }, [])

  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}>  */}
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <MainNavigation />
          <Toast />
        </View>
      </Provider>
      {/* </SafeAreaView> */}
    </>
  )
}

export default App



















