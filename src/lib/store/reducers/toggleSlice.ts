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
    navbarClose: (state) => {
      state.navbarState = false;
    },
  },
});

export const { navbarToggle, navbarClose } = toggleSlice.actions;

export default toggleSlice.reducer;
