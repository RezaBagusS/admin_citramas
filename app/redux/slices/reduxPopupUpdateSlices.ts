import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    data: {
      show: false,
      id_activity: 0,
      id_activityList: 0,
      id_image: 0,
      url_image: "",
      activityList: "",
      activity: "",
      dataNews: {
        id: 0,
        title: "",
        description: "",
        date: new Date(),
        note: "",
        path: "",
      }
    },
  },
  reducers: {
    setPopup: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;