import attemptReducer from "./attemptReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  attempt: attemptReducer,
});

export default allReducers;
