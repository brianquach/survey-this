import { combineReducers } from 'redux'
import nav from './navigation'
import signin from './signin'

const appReducers = combineReducers({
  nav,
  signin
});

export default appReducers;
