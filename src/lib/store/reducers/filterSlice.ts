import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SelectedTypes =
  | "decrease"
  | "increase"
  | "alphabetical"
  | null
  | string;

interface IFilterData {
  startDate: string | null;
  endDate: string | null;
  author: string;
  keywords: string;
  selected: SelectedTypes;
}

const filterState: IFilterData = {
  startDate: "",
  endDate: "",
  author: "",
  keywords: "",
  selected: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: filterState,
  reducers: {
    setFilterData: (state, action: PayloadAction<IFilterData>) => {
      if (action.payload) {
        return (state = {
          ...state,
          ...action.payload,
        });
      }
    },
    resetFilterData: (state) => {
      return (state = {
        ...filterState,
      });
    },
  },
});

export const { setFilterData, resetFilterData } = filterSlice.actions;

export default filterSlice.reducer;
