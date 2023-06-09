import { createSlice } from "@reduxjs/toolkit";

const darkmodeStatus =
  typeof window !== "undefined" ? localStorage.getItem("theme") : null;

interface ThemeAction {
  payload: string;
  type: string;
}
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: darkmodeStatus,
  },
  reducers: {
    setTheme: (state, action: ThemeAction) => {
      if (typeof state.value != null) {
        state.value = action.payload;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
