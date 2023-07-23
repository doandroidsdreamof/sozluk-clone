import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    navbarState: false,
    navigationState: false,
  },
  reducers: {
    navbarToggle: (state) => {
      state.navbarState = !state.navbarState;
    },
  },
});

export const { navbarToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
