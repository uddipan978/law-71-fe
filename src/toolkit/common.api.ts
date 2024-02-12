import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit"
import { environment } from "@/common/configs/environment"
// import { RootState } from "./store"

// type RejectedAction = {
//   payload?: {
//     status: number
//   }
// }

export const commonApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    mode: "cors",
    baseUrl: environment.baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //   const { token } = (getState() as RootState).auth
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`)
    //   }
    //   return headers
    // }
  }),
  tagTypes: ["Chats", "User"],
  endpoints: () => ({})
})

export const commonApiAuthMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
      // if ((action as RejectedAction)?.payload?.status === 401) {
      //   api.dispatch(logout())
      // }
    }
    return next(action)
  }