

import { SIGNUP_SUCCESS, SIGNUP, LOGIN, LOGIN_SUCCESS } from "../actions/actionType"

const initialState = {
  users: [],
  isGuest: false,
  isLoading: false
}


export const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {

    case SIGNUP:
      return {
        ...state,
        isLoading: true

      }

    case SIGNUP_SUCCESS:
      // console.log('sign up data in reducer', payload)
      return {
        ...state,
        users: payload,
        isLoading: false

      }

    case LOGIN:
      return {
        ...state,
        isLoading: true

      }
    case LOGIN_SUCCESS:
      console.log('sign IN data in reducer', payload)
      return {
        ...state,
        users: payload,
        isLoading: false

      }


    default:
      return state
  }
}

