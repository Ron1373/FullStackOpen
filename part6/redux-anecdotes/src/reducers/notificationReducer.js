import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Notification",
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "Notification";
    },
  },
});

export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, timeInSeconds) => {
  const timeInMilliseconds = Number(timeInSeconds) * 1000;
  return async (dispatch) => {
    dispatch(addNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeInMilliseconds);
  };
};
