import { createSlice } from "@reduxjs/toolkit"

interface StateType {
  chatPrompt: string
}

const initialState: StateType = {
  chatPrompt: ""
}

export const chatAISlice = createSlice({
  name: "chatAI",
  initialState,
  reducers: {
    setChatPrompt(state, action) {
      state.chatPrompt = action.payload
    }
  }
})

export const chatAIState = (state: { chatAI: StateType }) => state.chatAI
export const { setChatPrompt } = chatAISlice.actions
export default chatAISlice.reducer
