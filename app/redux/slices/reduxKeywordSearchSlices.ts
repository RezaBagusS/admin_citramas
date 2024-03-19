import { createSlice } from "@reduxjs/toolkit";

const keywordSearchSlices = createSlice({
  name: "keywordSearch",
  initialState: {
    data: {
        keyword: "",
    },
  },
  reducers: {
    setKeyword: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setKeyword } = keywordSearchSlices.actions;
export default keywordSearchSlices.reducer;