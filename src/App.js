import 'react-native-gesture-handler'
import React, { useEffect, useState, useRef } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { Settings } from 'react-native-fbsdk-next'
import { NotificationPermission } from './utils/helper'
import * as NavigationService from './navigation/navigationService'
import './utils/Languages/IMLocalize';
// const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://fasedapp.herokuapp.com/',
  cache: new InMemoryCache()
})

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed
Settings.setAppID('1553192515049980')
Settings.initializeSDK()

const App = ({ navigation }) => {
  useEffect(() => {
    // persistCache({
    //   cache,
    //   storage: AsyncStorage
    // }).then(() => setLoadingCache(false))
    NotificationPermission()
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const Newsdata = JSON.parse(remoteMessage?.data?.data)
        NavigationService.navigate(remoteMessage?.data?.screen, {
          title: Newsdata?.Title,
          tagline: Newsdata?.Tagline,
          description: Newsdata?.Description,
          createdAt: Newsdata?.createdAt,
          newsData: Newsdata
        })
      }
    })
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setTimeout(() => {
            const Newsdata = JSON.parse(remoteMessage?.data?.data)
            NavigationService.navigate(remoteMessage?.data?.screen, {
              title: Newsdata?.Title,
              tagline: Newsdata?.Tagline,
              description: Newsdata?.Description,
              createdAt: Newsdata?.createdAt,
              newsData: Newsdata
            })
          }, 2000)
        }
      })
    setTimeout(
      () => {
        SplashScreen.hide()
      },
      Platform.OS == 'ios' ? 3000 : 1000
    )
  }, [])

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <MainNavigation navigation={navigation} />
            <Toast />
          </View>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default App
