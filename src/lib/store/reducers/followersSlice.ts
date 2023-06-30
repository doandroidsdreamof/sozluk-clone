import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followersActive",
  initialState: {
    followers: false,
  },
  reducers: {
    setFollowers: (state, action) => {
      if (action.payload === "followers") {
        state.followers = true;
      }
      if (action.payload === "following") {
        state.followers = false;
      }
    },
  },
});

export const { setFollowers } = followersSlice.actions;

export default followersSlice.reducer;
