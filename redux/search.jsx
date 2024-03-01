import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "Search",
  initialState: [],
  reducers: {
    addSearch: (state, action) => {
      if (state.includes(action.payload)) {
        const index = state.indexOf(action.payload);
        state.splice(index, 1);
      }

      state.splice(9, 1);
      state.unshift(action.payload);
    },
    removeSearch: (state, action) => {
      return state.filter((item) => item !== action.payload);
    },
    removeAllSearch: (state) => {
      return [];
    },
  },
});

export const { addSearch, removeSearch, removeAllSearch } = searchSlice.actions;
export default searchSlice.reducer;
