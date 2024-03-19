import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    data: {
      show: false,
      type: "/dashboard",
      id_data: 0,
      title: "Add New Data",
      dataNews: {
        title: "",
        description: "",
        date: new Date(),
        note: "",
        path: "",
      }
    },
  },
  reducers: {
    setPopupAdd: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopupAdd } = popupSlice.actions;
export default popupSlice.reducer;