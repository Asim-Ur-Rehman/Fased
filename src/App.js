import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { Categories } from './screens/Categories/Categories'
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, Platform.OS == "ios" ? 3000 : 1000);
  }, [])
  return (
    <>
      {/* <Provider store={store}>
        <MainNavigation />
      </Provider> */}
      <Categories />
    </>
  )
}

export default App
