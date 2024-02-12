import { combineReducers } from "redux"
import chatReducer from "./chatAI/chat.slice"
import { commonApi } from "./common.api"

const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
  chatAI: chatReducer,
})
export default rootReducer
