'use strict';

import { combineReducers } from 'redux'
import nav from './navigation'
import authorized from './authorized'

const appReducers = combineReducers({
  authorized,
  nav,
});

export default appReducers;
