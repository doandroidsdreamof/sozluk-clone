import { configureStore} from '@reduxjs/toolkit';
import themeSlice from './reducers/themeSlice';
import notificationSlice from './reducers/notificationSlice';


export const store = configureStore({
  reducer: {
   theme: themeSlice,
   notification: notificationSlice,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;