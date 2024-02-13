import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { environment } from "@/common/configs/environment"
export const commonApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    mode: "cors",
    baseUrl: environment.baseUrl,
  }),
  tagTypes: ["Chats", "User"],
  endpoints: () => ({})
})