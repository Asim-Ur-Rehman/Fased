import { getUser } from '../../api/fakeApiUser'
import { SIGNUP_SUCCESS, SIGNUP, LOGIN, LOGIN_SUCCESS, FORGOT_PASSWORD, CHANGE_PASSWORD } from './actionType'
import { Login_User } from '../../utils/queries'
import { Add_User } from '../../utils/mutation';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
export const SignUpAction = (userData, navigation) => {

  console.log('data sign up', userData)

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
  return (dispatch) => {

    dispatch({ type: SIGNUP })




    // dispatch({ type: SIGNUP_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator')


  };
}
export const SignInAction = (data, navigation) => {
  console.log('data sign in', data)
  return (dispatch) => {

    dispatch({ type: LOGIN })

    dispatch({ type: LOGIN_SUCCESS, payload: data });
    navigation.navigate('AppStackNavigator', {
      screen: 'Home',
    })


  };
}

export const ForgotPasswordAction = (data, navigation) => {
  console.log('data forgot pass', data)
  return (dispatch) => {

    dispatch({ type: FORGOT_PASSWORD })
    navigation.navigate('ChangePassword')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })


  };
}
export const ChangePasswordAction = (data, navigation) => {
  console.log('data forgot pass', data)
  return (dispatch) => {

    dispatch({ type: CHANGE_PASSWORD })
    navigation.navigate('SignIn')
    // dispatch({ type: LOGIN_SUCCESS, payload: data });
    // navigation.navigate('AppStackNavigator', {
    //   screen: 'Home',
    // })


  };
}





