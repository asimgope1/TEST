import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth'
import { Auth } from './auth';

export default combineReducers({
    authStatus: authReducer,
    cartItems: Auth,
})

// export const mystore=createStore(authReducer)