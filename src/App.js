import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { AuthHeader } from './components/AuthHeader/AuthHeader'
import { ReportIncidentC } from './screens/ReportIncident/ReportIncidentC'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { CustomScrollBarComponent } from './components/ScrollBarComponent/ScollBarComp'

import { Categories } from './screens/Categories/Categories'
import { FlagReport } from './screens/flagReport/flagReport'
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
    {/* <CustomScrollBarComponent/> */}
            <FlagReport />
      {/* <Provider store={store}>
        <MainNavigation />
      </Provider> */}
      {/* <Categories /> */}
    </>
  )
}

export default App
