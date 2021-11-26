import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaView, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { CustomScrollBarComponent } from './components/ScrollBarComponent/ScollBarComp'
import 'react-native-gesture-handler'
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
