import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProduct = createAsyncThunk("product/fetchProductStatus", async ({category, sorting, search}) => {
    const response = await axios
    .get(
      `https://67992179be2191d708b21876.mockapi.io/api/main/items?${category}&sortBy=${sorting}&order=desc${search}`
    )
    .then((response) => {
      const arr = response.data;
      setItems(Array.isArray(arr) ? arr : []);
    })
    .catch(() => {
      setItems([]);
    })
  return response;
});

export const initialState = {
  items: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  
});

export const { setItems,  } = productSlice.actions;

export default productSlice.reducer;
