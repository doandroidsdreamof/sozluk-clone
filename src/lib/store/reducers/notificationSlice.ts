import { createSlice } from '@reduxjs/toolkit';




interface Notification{
  message: string;
  uid: string;
  
}


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {


  },
});




export default notificationSlice.reducer;
