import { createSlice } from "@reduxjs/toolkit";

// TODO refactoring

const messageSlice = createSlice({
  name: "message",
  initialState: {
    receiverName: "",
    reset: false,
    chatboxState: false,
    chatInterface: false,
  },
  reducers: {
    setReceiverName: (state, action) => {
      if (typeof action.payload === "string") {
        state.receiverName = action.payload;
      }
    },
    resetReceiver: (state) => {
      state.reset = !state.reset;
      state.receiverName = "";
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
  resetReceiver,
  chatInterfaceClose,
  chatInterfaceToggle,
  chatBoxClose,
  chatBoxToggle,
  chatBoxOpen,
} = messageSlice.actions;

export default messageSlice.reducer;
