import { createSlice } from "@reduxjs/toolkit";

const ToasterSlices = createSlice({
  name: "toaster",
  initialState: {
    data: {
        message: "",
        show: false,
    },
  },
  reducers: {
    setToaster: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setToaster } = ToasterSlices.actions;
export default ToasterSlices.reducer;