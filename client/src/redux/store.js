import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import patientReducer from "./patientData/patientDataReducer";
import doctorReducer from "./doctorData/doctorDataReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  patientData: patientReducer,
  doctorData:doctorReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
