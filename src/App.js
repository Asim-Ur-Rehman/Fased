import 'react-native-gesture-handler'
import React, { useEffect, useState, useRef } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
const cache = new InMemoryCache()


const client = new ApolloClient({
  uri: 'https://fasedapp.herokuapp.com/',
  cache,
});

const App = ({ navigation }) => {
  const [loadingCache, setLoadingCache] = useState(true)
  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))

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



















