import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reducers/themeSlice";
import notificationSlice from "./reducers/notificationSlice";
import toggleSlice from "./reducers/toggleSlice";
import refetchSlice from "./reducers/refetchSlice";
import followersSlice from "./reducers/followersSlice";
import filterSlice from "./reducers/filterSlice";
import messageSlice from "./reducers/messageSlice";
import navigationSlice from "./reducers/navigationSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    notification: notificationSlice,
    toggle: toggleSlice,
    refetch: refetchSlice,
    activeFollowers: followersSlice,
    filter: filterSlice,
    message: messageSlice,
    navigation: navigationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
