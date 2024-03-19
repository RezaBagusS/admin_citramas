import { createSlice } from "@reduxjs/toolkit";

const selectSlices = createSlice({
  name: "selectSlices",
  initialState: {
    data: {
        select: "",
    },
  },
  reducers: {
    setSelect: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSelect } = selectSlices.actions;
export default selectSlices.reducer;