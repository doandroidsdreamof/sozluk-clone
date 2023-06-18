import { createSlice } from "@reduxjs/toolkit";

const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    topic: false,
    entry: false,
    user: false,
  },
  reducers: {
    refetchTopic: (state) => {
      state.topic = !state.topic;
    },
  },
});

export const { refetchTopic } = refetchSlice.actions;

export default refetchSlice.reducer;
