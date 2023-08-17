import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { clientReducer, createClientReducer, forgotPasswordReducer, getStatusReducer, inquiryReducer, newInquiryReducer, newServiceReducer, sendEmailReducer, serviceReducer, updatetinquiryReducer, userReducer, usersReducer } from './reducers/userReducer';


let initialState = {};

const reducer = combineReducers({
  user: userReducer,
  services: serviceReducer,
  service: newServiceReducer,
  inquirys: inquiryReducer,
  inquiry: newInquiryReducer,
  users: usersReducer,
  status: getStatusReducer,
  updatedData:updatetinquiryReducer,
  email:sendEmailReducer,
  forgotPassword:forgotPasswordReducer,
  clients:clientReducer,
  client:createClientReducer
});

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
