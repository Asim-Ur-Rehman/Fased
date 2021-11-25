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



  // const Data = [
  //   {
  //     key: 1,
  //     title: 'Killing',
  //     description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel',
  //     Image: Images.Pictures.category,
  //     backgroundColor: '#DF0707'
  //   },
  //   {
  //     key: 2,
  //     title: 'Harrasment',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
  //     Image: Images.Pictures.harasment,
  //     backgroundColor: '#FFA724'
  //   },
  //   {
  //     key: 3,
  //     title: 'Kidnapping',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
  //     Image: Images.Pictures.kidnap,
  //     backgroundColor: '#CF00BA'
  //   },
  //   {
  //     key: 4,
  //     title: 'Robery',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
  //     Image: Images.Pictures.robery,
  //     backgroundColor: '#5819C1'
  //   },
  //   {
  //     key: 5,
  //     title: 'Snatching',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
  //     Image: Images.Pictures.snatch,
  //     backgroundColor: '#211DE8'
  //   },
  //   {
  //     key: 6,
  //     title: 'Assault',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
  //     Image: Images.Pictures.assault,
  //     backgroundColor: '#0CB9A2'
  //   },

  // ];

  return (
    <>
      {/* <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:"center", alignItems:"center"}} showsVerticalScrollIndicator={false}
      style={{flex:1}}
        >
        <CategoryComp data={Data} targetKey={"key"} />
      </ScrollView> */}

   

      <Provider store={store}>
        {/* <NewsDetails/> */}
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MainNavigation />
      </View>
      </Provider>
    </>
  )
}

export default App



















