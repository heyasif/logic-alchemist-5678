import { createStore, combineReducers } from "redux";

// // Import your individual reducers
// import { cartReducer } from './reducers/cartReducer';
// import { userReducer } from './reducers/userReducer';
// import { adminReducer } from './reducers/adminReducer';

// Combine reducers
const rootReducer = combineReducers({
  //   cart: cartReducer,
  //   user: userReducer,
  //   admin: adminReducer
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
