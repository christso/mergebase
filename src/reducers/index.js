import {combineReducers} from 'redux';
import {clientReducers} from './clientReducers';
import {wfmClientReducers} from './wfmClientReducers';
import {xplanClientReducers} from './xplanClientReducers';
import {bglClientReducers} from './bglClientReducers';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  clients: clientReducers,
  wfmClients: wfmClientReducers,
  xplanClients: xplanClientReducers,
  bglClients: bglClientReducers,
  form: reduxFormReducer
});
