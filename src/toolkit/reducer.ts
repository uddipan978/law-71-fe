import { combineReducers } from "redux"
import { commonApi } from "./common.api"

const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer
})
export default rootReducer
