import {combineReducers} from 'redux';
import {clientReducers} from './clientReducers';

export default combineReducers({
  clients: clientReducers
});
