import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "zod";

type EndTypes = "user" | "entry" | "topic";

// TODO refactor

const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    topic: false,
    entry: false,
    user: false,
  },
  reducers: {
    refetchData: (state, action) => {
      if (Object.keys(state)[0] == action.payload) {
        state.user = !state.user;
      }
      if (Object.keys(state)[1] == action.payload) {
        state.entry = !state.entry;
      }
      if (Object.keys(state)[2] == action.payload) {
        state.topic = !state.topic;
      }
    },
  },
});

export const { refetchData } = refetchSlice.actions;

export default refetchSlice.reducer;
