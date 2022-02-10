import {
  SIGNUP_SUCCESS,
  SIGNUP,
  LOGIN,
  LOGIN_SUCCESS,
  REPORT_INCIDENT_LOCATION_FLOOR_DATA,
  REPORT_INCIDENT_ALL_DATA,
  CONT_AS_GUEST,
  LOGOUT
} from '../actions/actionType'

const initialState = {
  users: null,
  isGuest: false,
  isLoading: false,
  reportIncidentLocationFloorData: {},
  reportIncidentAllData: {}
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
        isGuest: false,
        isLoading: false
      }

    case LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      // console.log('sign IN data in reducer', payload)
      return {
        ...state,
        users: payload,
        isGuest: false,
        isLoading: false
      }
    case REPORT_INCIDENT_LOCATION_FLOOR_DATA:
      // console.log('reportIncidentLocationFloorData', payload)
      return {
        ...state,
        reportIncidentLocationFloorData: payload
      }
    case REPORT_INCIDENT_ALL_DATA:
      // console.log('reportIncidentAllData', payload)
      return {
        ...state,
        reportIncidentAllData: payload
      }
    case CONT_AS_GUEST:
      console.log('guest in reducer', payload)
      return {
        ...state,
        isGuest: true,
        users:payload
      }
    case LOGOUT:
      return {
        ...state,
        users: null
      }

    default:
      return state
  }
}
