import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { ReportIncidents } from './screens/ReportIncident/ReportIncidents'

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
      {/* <Provider store={store}>
        <MainNavigation />
      </Provider> */}
      <ReportIncidents />
    </>
  )
}

export default App
