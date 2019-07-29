import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';

export default combineReducers({
  auth,
  loading
});
