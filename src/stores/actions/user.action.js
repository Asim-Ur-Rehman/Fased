import { getUser } from '../../api/fakeApiUser'
import {
  SIGNUP_SUCCESS,
  SIGNUP,
  LOGIN,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  REPORT_INCIDENT_LOCATION_FLOOR_DATA,
  REPORT_INCIDENT_ALL_DATA,
  CONT_AS_GUEST
} from './actionType'
import { Login_User } from '../../utils/queries'
import { Add_User } from '../../utils/mutation'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation
} from '@apollo/client'
export const SignUpAction = (userData, navigation) => {

  // const [addUser, { data, loading, error }] = useMutation(Add_User);
  // addUser({
  //   variables: {
  //     email: userData.email,
  //     name: userData.fullName,
  //     password: userData.password
  //   }
  // })
  // , {
  //   variables: {
  //     email: userData.email,
  //     name: userData.fullName,
  //     password: userData.password
  //   },
  // }

  // if (data) {
  //   console.log('data from query', data)
  // }
  return dispatch => {
    dispatch({ type: SIGNUP })

    dispatch({ type: SIGNUP_SUCCESS, payload: userData });
    // navigation.navigate('AppStackNavigator')
  }
}
export const SignInAction = (data, navigation) => {
  return dispatch => {
    dispatch({ type: LOGIN })

    dispatch({ type: LOGIN_SUCCESS, payload: data })
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home'
    // })
  }
}

export const ForgotPasswordAction = (data, navigation) => {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD })
    navigation.navigate('ChangePassword')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })
  }
}
export const ChangePasswordAction = (data, navigation) => {
  return dispatch => {
    dispatch({ type: CHANGE_PASSWORD })
    navigation.navigate('SignIn')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })
  }
}

export const ReportIncidentLocationFloorData = (data, navigation) => {
  // console.log('REPORT_INCIDENT_LOCATION_FLOOR_DATA', data)
  return dispatch => {
    dispatch({ type: REPORT_INCIDENT_LOCATION_FLOOR_DATA, payload: data })
    navigation.navigate('ReportIncidentB')
    // navigation.navigate('SignIn')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })
  }
}

export const ReportIncidentAllData = (data, navigation) => {
  // console.log('REPORT_INCIDENT_ALL_DATA', data)
  return dispatch => {
    dispatch({ type: REPORT_INCIDENT_ALL_DATA, payload: data })
    navigation.navigate('ReportIncidentC')
    // navigation.navigate('SignIn')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })
  }
}

export const continueAsGuest = (data) => {
  console.log('data of guest', data)
  return dispatch => {
    dispatch({ type: CONT_AS_GUEST,payload:data })
  }
}
