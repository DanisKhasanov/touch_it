import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";
import { getProducts } from "../api";

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 8,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilteredItems: (state, action: PayloadAction<Product[]>) => {
      state.filteredItems = action.payload;
      state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);

      if (state.currentPage > state.totalPages) {
        state.currentPage = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.filteredItems = action.payload;
          state.totalPages = Math.ceil(
            action.payload.length / state.itemsPerPage
          );
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch products";
      });
  },
});

export const { setPage, setFilteredItems } = productsSlice.actions;

export default productsSlice.reducer;
