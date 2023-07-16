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
    setReceiverName: (state, action) => {
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
    chatBoxOpen: (state) => {
      state.chatboxState = true;
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
  setReceiverName,
  resetReciever,
  chatInterfaceClose,
  chatInterfaceToggle,
  chatBoxClose,
  chatBoxToggle,
  chatBoxOpen,
} = messageSlice.actions;

export default messageSlice.reducer;
