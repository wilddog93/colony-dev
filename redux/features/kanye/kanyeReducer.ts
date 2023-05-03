import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// here we are typing the types for the state
export type KanyeState = {
    data: { quote: string };
    pending: boolean;
    error: boolean;
    message: any;
};

const initialState: KanyeState = {
    data: { quote: 'click that button' },
    pending: false,
    error: false,
    message: "",
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const getKanyeQuote = createAsyncThunk('kanye/kanyeQuote', async (params: any) => {
    console.log(params)
    try {
        const response = await axios.get('https://api.kanye.rest/');
        const { data, status } = response
        if (status == 200) {
            toast.success("sukses")
            setCookie('quote', data?.quote, { maxAge: 60 * 60 * 24 })
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        console.log(error.message, "error")
        toast.error("error")
        return error.response.data
    }
});

export const kanyeSlice = createSlice({
    name: 'kanye',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(getKanyeQuote.pending, state => {
                state.pending = true;
            })
            .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
                // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
                state.pending = false;
                state.error = false;
                state.data = payload;
            })
            .addCase(getKanyeQuote.rejected, (state, { payload }) => {
                state.pending = false;
                state.error = true;
            });
    },
});

export const selectKanye = (state: RootState) => state.kanyeQuote;

export default kanyeSlice.reducer;