import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { debug } from "console";
import { nanoid } from "nanoid";

interface Notification {
  message: string;
  uid: string;
  alertType: string;
}

const notificationMsg: Notification[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationMsg,
  reducers: {
    insertNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);


    },
    removeNotification: (state, action) => {
      return state.filter((items) => items.uid !== action.payload);
    },
  },
});



export const { insertNotification,removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
