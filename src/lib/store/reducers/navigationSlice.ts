import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    navigationState: false,
    magicLinkEmail: "",
  },
  reducers: {
    setNavigation: (state, action) => {
      if (action.payload === true) {
        state.navigationState = true;
      } else {
        state.navigationState = false;
      }
    },
    setMagicLinkEmail: (state, action) => {
      if (typeof action.payload === "string") {
        state.magicLinkEmail = action.payload;
      }
    },
  },
});

export const { setNavigation, setMagicLinkEmail } = navigationSlice.actions;

export default navigationSlice.reducer;
