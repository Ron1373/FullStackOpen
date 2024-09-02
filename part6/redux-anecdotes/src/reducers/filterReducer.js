const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};
export default reducer;

export const filterChange = (filter) => ({
  type: "SET_FILTER",
  payload: filter,
});
