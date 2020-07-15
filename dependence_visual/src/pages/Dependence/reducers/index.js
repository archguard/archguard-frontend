import { combineReducers } from "redux";
import config from "./config";
import configVisible from "./configVisible";

export default combineReducers({
  config,
  configVisible,
});
