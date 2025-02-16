import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {},
    isFormValid: false,
    message: '',
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setFormValid: (state, action) => {
            state.isFormValid = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setFormData: (state, action) => {  
            state.formData = action.payload;
        }
    },
});

export const { setFormValid, setMessage, setFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
