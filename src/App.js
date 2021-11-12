import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { AuthHeader } from './components/AuthHeader/AuthHeader'
import { ReportIncident } from './screens/ReportIncident/ReportIncident'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars';

import { ReportIncidentB } from './screens/ReportIncident/ReportIncidentB'
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
      <Provider store={store}>
        <MainNavigation />
      </Provider>
      {/* <ReportIncidentB /> */}
    </>
  )
}

export default App
