import { createSlice } from '@reduxjs/toolkit';

const dataUserSlice = createSlice({
    name: 'datauser',
    initialState: {
        datauser: {},
        loading: false,
        error: null,
        imageCamara:null
    },
    reducers: {
        fetchDataUserRequest: (state) => {
            state.loading = true;
        },
        fetchDataUserSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchDataUserRequest,
    fetchDataUserSuccess,
    fetchDataUserFailure,
    setCameraImage,
} = dataUserSlice.actions;

export default dataUserSlice.reducer;

