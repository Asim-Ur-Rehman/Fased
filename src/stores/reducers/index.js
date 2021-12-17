import { combineReducers } from 'redux'
import { userReducer } from './user.reducer'
//insert another reducers here to be combined

export const reducers = combineReducers({
  userReducer
})

