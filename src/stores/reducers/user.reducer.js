

import { SIGNUP_SUCCESS, SIGNUP } from "../actions/actionType"

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
      console.log('sign up data in reducer', payload)
      return {
        ...state,
        users: payload,
        isLoading: false

      }

    // case 'FETCH_USER_SUCCESS':
    //   return {
    //     ...state,
    //     users: payload,
    //     isLoading: false
    //   }
    // case 'FETCH_USER_FAILED':
    //   return {
    //     ...state,
    //     isLoading: false
    //   }

    default:
      return state
  }
}

