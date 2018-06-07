import { combineReducers } from 'redux';
import auth from './auth';
import share from './share';

export default combineReducers({
  auth,
  share
});
