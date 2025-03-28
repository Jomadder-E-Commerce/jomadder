import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const searchByImageProductsSlice = createSlice({
  name: 'searchByImageProducts',
  initialState,
  reducers: {
    setSearchByImageProducts: (state, action) => {
      state.products = action.payload;
    }
  },
});


export const { setSearchByImageProducts } = searchByImageProductsSlice.actions;
export default searchByImageProductsSlice.reducer;
