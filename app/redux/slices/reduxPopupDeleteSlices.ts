import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popupDelete",
  initialState: {
    data: {
      show: false,
      id: 0,
      name: "",
    },
  },
  reducers: {
    setPopupDelete: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopupDelete } = popupSlice.actions;
export default popupSlice.reducer;