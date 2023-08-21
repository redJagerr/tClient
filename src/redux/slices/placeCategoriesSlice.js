import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	categories: [],
	loadStatus: 'loading',
};
export const fetchPlaceCategories = createAsyncThunk(
	'placeCategories/fetchPlaceCategories',
	async () => {
		const response = await axios.get(
			`https://travel-app-server-njn4.onrender.com/filters/categories`
		);
		return response.data;
	}
);
const placeCategoriesSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		toggleCategory: (state, action) => {
			const currentCategory = state.categories.find(
				i => i.category === action.payload
			);
			currentCategory.isActive = !currentCategory.isActive;
		},
	},
	extraReducers: {
		[fetchPlaceCategories.pending]: state => {
			state.loadStatus = 'loading';
		},
		[fetchPlaceCategories.fulfilled]: (state, action) => {
			state.loadStatus = 'idle';
			state.categories = action.payload;
		},
		[fetchPlaceCategories.rejected]: state => {
			state.loadStatus = 'error';
		},
	},
});
export const { toggleCategory } = placeCategoriesSlice.actions;
export default placeCategoriesSlice.reducer;
