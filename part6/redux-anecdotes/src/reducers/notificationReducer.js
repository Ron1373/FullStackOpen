import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Notification",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
  },
});

export default notificationSlice.reducer;
