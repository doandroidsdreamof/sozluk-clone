import { createSlice, Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import { debug } from "console";
import { nanoid } from "nanoid";
import { string, unknown } from "zod";

export type AlertType = "DANGER" | "SUCCESS" | "ALERT" | "WARNING";

interface Notification {
  message: string;
  uid: string;
  alertType: AlertType;
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

export const { insertNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
