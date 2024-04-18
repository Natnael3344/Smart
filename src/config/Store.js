// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { login } from '../containers/Auth/Login';
import { otp } from '../containers/Auth/OTP';
import { complaintList } from '../containers/Complaint/TrackComplaint/TrackComplaintReducer';
// defaults to localStorage for web and AsyncStorage for react-native

import storage from 'redux-persist/lib/storage';
import { pincode, fileComplaint} from '../containers/Complaint/FileComplaint/FileComplaint.reducer';
import languageReducer from '../translations/languageReducer';


// All reducers assigns to single reducer
const rootReducer = {
    form                :   formReducer,
    login               :   login,    
    otp                 :   otp,
    complaintList       :   complaintList,
    pincode             :   pincode,
    fileComplaint        :    fileComplaint,
    language             :  languageReducer
}    

// Preiststore Config
const persistConfig = {
    timeout: null,
    key: 'root',
    storage,    
    whitelist: ['login','otp']
}

// Combaning all reducer into single reducer 
const allReducer         =  combineReducers(rootReducer);

const rootReducer1 = (state, action) => {
  
    if (action.type === 'USER_LOGOUT' || action.type === 'LOGOUT_SUCCESS') {
        //state = undefined
    }
  
    return allReducer(state, action)
  }

// Combaning presistReducer with all reducer & prestistConfig variable
const allPersistReducer =   persistReducer(persistConfig, rootReducer1);

const initial_state = {};

// Creating Store 
let store               =   createStore(allPersistReducer, initial_state, applyMiddleware(thunk))

// Exporting presistor
export let persistor = persistStore(store)

// Exporting Store
export default store;