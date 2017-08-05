import {combineReducers} from 'redux';
import {clientReducers} from './clientReducers';
import {clientReducers as wfmClientReducers} from './wfmClientReducers';
import {clientReducers as xplanClientReducers} from './xplanClientReducers';
import {bglClientReducers} from './bglClientReducers';
import { reducer as reduxFormReducer } from 'redux-form';
import {appReducers} from './appReducers';

export default combineReducers({
  clients: clientReducers,
  wfmClients: wfmClientReducers,
  xplanClients: xplanClientReducers,
  bglClients: bglClientReducers,
  app: appReducers,
  form: reduxFormReducer
});
