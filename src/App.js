import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { CustomScrollBarComponent } from './components/ScrollBarComponent/ScollBarComp'
import 'react-native-gesture-handler'
import CategoryComp from './components/CategoryComponent/index'
import { Images } from './constants/images'
import Radio from './components/CategoryComponent/radio'
import { ScrollView } from 'react-native-gesture-handler'
import { NewsDetails } from './screens/News/NewsDetails'

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
          </View>
        </Provider>
      {/* </SafeAreaView> */}
    </>
  )
}

export default App



















