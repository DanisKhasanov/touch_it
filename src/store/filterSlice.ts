import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../api";

interface FilterState {
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  sortOrder: "asc" | "desc" | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const storage = {
  save: (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  load: (key: string, defaultValue: any = null) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  },
};

const savedFilter = storage.load("filter", {});

const initialState: FilterState = {
  categories: [],
  selectedCategory: savedFilter.selectedCategory || "",
  searchQuery: savedFilter.searchQuery || "",
  sortOrder: savedFilter.sortOrder || null,
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "filter/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      saveFilterState(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      saveFilterState(state);
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc" | null>) => {
      state.sortOrder = action.payload;
      saveFilterState(state);
    },
    clearFilters: (state) => {
      state.selectedCategory = "";
      state.searchQuery = "";
      state.sortOrder = null;
      saveFilterState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to fetch categories";
      });
  },
});

const saveFilterState = (state: FilterState) => {
  storage.save("filter", {
    selectedCategory: state.selectedCategory,
    searchQuery: state.searchQuery,
    sortOrder: state.sortOrder,
  });
};

export const { setCategory, setSearchQuery, setSortOrder, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
