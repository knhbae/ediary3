import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import items from "./items";
import weeklygoals from "./weeklygoals";
import dailygoals from "./dailygoals";

const rootReducer = combineReducers({
  counter,
  todos,
  items,
  weeklygoals,
  dailygoals
});

export default rootReducer;
