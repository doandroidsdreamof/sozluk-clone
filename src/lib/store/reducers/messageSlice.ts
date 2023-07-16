import { createSlice } from "@reduxjs/toolkit";

// TODO refactoring

const messageSlice = createSlice({
  name: "message",
  initialState: {
    recieverName: "",
    reset: false,
    chatboxState: false,
    chatInterface: false,
  },
  reducers: {
    setRecieverName: (state, action) => {
      if (typeof action.payload === "string") {
        state.recieverName = action.payload;
      }
    },
    resetReciever: (state) => {
      state.reset = !state.reset;
      state.recieverName = "";
    },
    chatBoxToggle: (state) => {
      state.chatboxState = !state.chatboxState;
    },
    chatBoxClose: (state) => {
      state.chatboxState = false;
    },
    chatInterfaceToggle: (state) => {
      state.chatInterface = !state.chatInterface;
    },
    chatInterfaceClose: (state) => {
      state.chatInterface = false;
    },
  },
});

export const {
  setRecieverName,
  resetReciever,
  chatInterfaceClose,
  chatInterfaceToggle,
  chatBoxClose,
  chatBoxToggle,
} = messageSlice.actions;

export default messageSlice.reducer;
