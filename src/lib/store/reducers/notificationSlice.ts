import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "DANGER" | "SUCCESS" | "ALERT" | "WARNING";

interface INotification {
  message: string;
  uid: string;
  alertType: AlertType;
}

const notificationMsg: INotification[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationMsg,
  reducers: {
    insertNotification: (state, action: PayloadAction<INotification>) => {
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
