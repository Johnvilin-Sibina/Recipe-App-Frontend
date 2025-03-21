import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
  recipe:[],
  recipes:[]
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
    addRecipeStart:(state)=>{
      state.loading = true;
      state.error = null;
    },
    addRecipeSuccess:(state,action)=>{
      state.recipe = action.payload;
      state.loading = false;
      state.error = null
    },
    addRecipeFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload
    },
    fetchRecipiesStart:(state)=>{
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess:(state,action)=>{
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRecipesFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, addRecipeStart, addRecipeSuccess, addRecipeFailure, fetchRecipiesStart, fetchRecipesSuccess, fetchRecipesFailure } = userSlice.actions;

export default userSlice.reducer;
