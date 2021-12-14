import { getUser } from '../../api/fakeApiUser'
import { SIGNUP_SUCCESS, SIGNUP } from './actionType'



export const SignUpAction = (data, navigation) => {
  console.log('data', data)
  return (dispatch) => {

    dispatch({ type: SIGNUP })

    dispatch({ type: SIGNUP_SUCCESS, payload: data });
    navigation.navigate('AppStackNavigator')


  };
}




