import {
  PAGINATE_RESPONSE,
  CHAT_LIST,
  CREATE_CHAT_API_RESP,
  CHAT_HISTORY_API_RESP,
  CHAT_HISTORY_OBJ,
  DELETE_CHAT_API_RESP,
  DELETE_CHAT_API_PAYLOAD,
  FEEDBACK_API_PAYLOAD,
  FEEDBACK_API_RESP,
  RENAME_CHAT_API_PAYLOAD,
  FETCH_CHAT_API_PAYLOAD,
  SEARCH_CHAT_API_PAYLOAD
} from "@/types/"
import { omit, flatMap, orderBy } from "lodash"
import { commonApi } from "../common.api"
//utils
import { groupChatsByDate, generateChatGroupObject } from "@/common/utils"

export const chatAIApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchChats: build.query<PAGINATE_RESPONSE<CHAT_LIST>, FETCH_CHAT_API_PAYLOAD | undefined>({
      query: (payload) => `chat?page=${payload?.page ?? 1}&limit=50&type=${payload?.type}`,
      transformResponse: (response: PAGINATE_RESPONSE<CHAT_LIST>) => {
        //perform grouping at the time of data received from API to optimise performance as everytime grouping will be applied to 50 data at max (LIMIT) and then merged in the existing cache

        //group chats based on date
        const groupedData = groupChatsByDate(response.result.results)
        //flatten data for react-virtualised List
        const flattenedData = flatMap(groupedData, (items, groupName) => {
          const groupObject = generateChatGroupObject(groupName, items[0])
          return [groupObject, ...items.map((item) => ({ ...item, group: groupName }))]
        })
        //sort data again based on created_at as objects will not come in sorting order after grouping. Replace the actual API response with the grouped data
        response.result.results = orderBy(flattenedData, "created_at", "desc")
        return response
      },
      providesTags: (data) =>
        data
          ? [
              ...data.result.results.map(({ id }) => ({ type: "Chats" as const, id: id })),
              { type: "Chats", id: "PARTIAL-LIST" }
            ]
          : [{ type: "Chats", id: "PARTIAL-LIST" }],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        //create single cache key irrespective of no. of pages
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.page === 1) {
          return newItems
        } else {
          currentCache.result.results.push(...newItems.result.results)
        }
      },
      // Refetch when the page and type arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
    createChat: build.mutation<CREATE_CHAT_API_RESP, Partial<CHAT_LIST>>({
      query: (body) => ({
        url: `chat/new`,
        method: "POST",
        body: omit(body, "index")
      }),
      //pessimistic manual cache update to avoid extra API calls
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          chatAIApi.util.updateQueryData(
            "fetchChats",
            undefined,
            (draft: PAGINATE_RESPONSE<CHAT_LIST>) => {
              //create Today group if already not exists
              const todayGroupIndex = draft.result.results.findIndex(
                (_chat) => _chat.name === "Today" && _chat.type === "group"
              )
              if (todayGroupIndex === -1) {
                const todayGroup = generateChatGroupObject("Today", data.result)
                draft.result.results.unshift(todayGroup)
                draft.result.results.splice(1, 0, data.result)
              } else {
                //inject newly created data at index 1
                draft.result.results.splice(1, 0, data.result)
              }
            }
          )
        )
      }
    }),
    fetchChatHistory: build.query<CHAT_HISTORY_OBJ, string>({
      query: (chat_id) => `chat/history/chatAI/${chat_id}`,
      transformResponse: (response: CHAT_HISTORY_API_RESP) => response.result.data
    }),
    deleteChat: build.mutation<DELETE_CHAT_API_RESP, DELETE_CHAT_API_PAYLOAD>({
      query: (body) => {
        return {
          url: `chat/delete`,
          method: "POST",
          body: omit(body, "group")
        }
      },
      //pessimistic manual cache update to avoid extra API calls
      async onQueryStarted({ index, group }, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(
          chatAIApi.util.updateQueryData(
            "fetchChats",
            undefined,
            (draft: PAGINATE_RESPONSE<CHAT_LIST>) => {
              //delete selected chat from cache
              draft.result.results.splice(index, 1)
              //delete parent group if no chat exists under that group
              const _index = draft.result.results.findIndex(
                (_chat) => _chat.group === group && _chat.type !== "group"
              )
              if (_index === -1) {
                const groupIndex = draft.result.results.findIndex(
                  (_chat) => _chat.name === group && _chat.type === "group"
                )
                if (groupIndex > -1) {
                  draft.result.results.splice(groupIndex, 1)
                }
              }
            }
          )
        )
      }
    }),
    submitFeedback: build.mutation<FEEDBACK_API_RESP, FEEDBACK_API_PAYLOAD>({
      query: (body) => ({
        url: `chat/prompt/feedback`,
        method: "POST",
        body
      })
    }),
    searchChats: build.query<{ result: CHAT_LIST }, SEARCH_CHAT_API_PAYLOAD>({
      query: ({ searchKey = "", type }) =>
        `chat/search/${type}/${searchKey}`
    }),
    renameChat: build.mutation<DELETE_CHAT_API_RESP, RENAME_CHAT_API_PAYLOAD>({
      query: (body) => ({
        url: `chat/rename`,
        method: "POST",
        body: omit(body, "index")
      }),
      //optimistic manual cache update to avoid extra API calls
      onQueryStarted({ index, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          chatAIApi.util.updateQueryData(
            "fetchChats",
            undefined,
            (draft: PAGINATE_RESPONSE<CHAT_LIST>) => {
              //update name of the chat from cache
              draft.result.results[index].name = name
            }
          )
        )
        //revert back change in case of API failure
        queryFulfilled.catch(patchResult.undo)
      }
    })
  }),
  overrideExisting: false
})
