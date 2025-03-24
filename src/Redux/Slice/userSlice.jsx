import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
  recipe: [],
  recipes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    addRecipeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addRecipeSuccess: (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRecipiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRecipesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.currentUser.rest = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  addRecipeStart,
  addRecipeSuccess,
  addRecipeFailure,
  fetchRecipiesStart,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
