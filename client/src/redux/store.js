import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import customerReducer from "./customerData/customerDataReducer";
import bankReducer from "./bankData/bankDataReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  customerData: customerReducer,
  bankData:bankReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
