import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    navigationState: false,
    parsed: "",
  },
  reducers: {
    setNavigation: (state, action) => {
      if (action.payload === true) {
        state.navigationState = true;
      } else {
        state.navigationState = false;
      }
    },
    setParsed: (state, action) => {
      if (typeof action.payload === "string") {
        state.parsed = action.payload;
      }
    },
  },
});

export const { setNavigation, setParsed } = navigationSlice.actions;

export default navigationSlice.reducer;
