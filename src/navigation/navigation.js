import React from 'react'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'

import { Languages } from '../screens/Languages/Languages'
import { SignIn } from '../screens/SignIn/SignIn'
import { SignUp } from '../screens/SignUp/SignUp'
import { Home } from '../screens/Home/Home'
import { ForgetPassword } from '../screens/ForgetPassword/ForgetPassword'
import { ChangePassword } from '../screens/ChangePassword/ChangePassword'
import { Categories } from '../screens/Categories/Categories'
import { Report } from '../screens/Reports'

import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ReportingDone } from '../screens/ReportIncident/reportingDone'

const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      // drawerContent={props => <CustomDrawer {...props} />}
      drawerContentOptions={{
        itemStyle: { marginVertical: 8, marginHorizontal: 8 },
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "100%",
        },
      }}
      initialRouteName="Home"
      overlayColor="transparent"
      drawerType="front">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn">
      <AuthStack.Screen name="Languages" component={Languages} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
    </AuthStack.Navigator>
  );
}

function AppStackNavigator () {
  return(
    <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    <AppStack.Screen name="Home" component={MyDrawer} />
    <AppStack.Screen name="Categories" component={Categories} />
    <AppStack.Screen name="Report" component={Report} />
    <AppStack.Screen name="ReportingDone" component={ReportingDone} />
  </AppStack.Navigator>
  )
}

const MainNavigation = () => {

  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: {background: "#fff"} }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AuthStackNavigator"
          options={{ headerShown: false }}
          component={AuthStackNavigator}
        />
            <Stack.Screen
            name="AppStackNavigator"
            options={{ headerShown: false }}
            component={AppStackNavigator}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
