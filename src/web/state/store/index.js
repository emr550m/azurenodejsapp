import { combineReducers } from 'redux';
import { createStore } from 'redux';

import login from '../reducers/login';
import dashboard from '../reducers/dashboard';
import app from '../reducers/app';

var reducersCombined = combineReducers({
  login,
  app,
  dashboard
});
var store = createStore(reducersCombined);
export default store;