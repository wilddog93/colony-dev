import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// here we are typing the types for the state
export type AuthState = {
    data: any;
    isLogin: boolean;
    pending: boolean;
    error: boolean;
    message: any;
};

const initialState: AuthState = {
    data: {},
    isLogin: false,
    pending: false,
    error: false,
    message: "",
};

interface HeadersConfiguration {
    headers: {
        "Content-Type"?: string;
        "Accept"?: string
        "Authorization"?: string
    }
}

let config: HeadersConfiguration = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const webLogin = createAsyncThunk('login', async (params: any) => {
    let newData = {}
    try {
        const response = await axios.post("auth/web/login", params?.data, config);
        const { data, status } = response
        // console.log(response, "response")
        if (status == 200) {
            toast.success("sukses")
            setCookie('accessToken', data?.accessToken, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { maxAge: 60 * 60 * 24 })
            setCookie('access', data?.access)
            newData = {
                ...data,
                access: data.access
            }
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        console.log(error.message, "error")
        toast.error("error")
        return error.response.data
    }
});

export const authMe = createAsyncThunk('profile', async (params: any) => {
    config = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${params?.token}`
        }
    }
    try {
        const response = await axios.get("auth/web/me", config);
        const { data, status } = response;
        console.log(response, "response")
        if (status == 200) {
            toast.success("sukses")
            return data;
        } else {
            throw response
        }
    } catch (error: any) {
        const { data } = error.response.data
        console.log(data.message[0], "error")
        toast.error(data.message[0] || data.error)
        return data.message[0] || data.error
    }
});

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(webLogin.pending, state => {
                state.pending = true;
            })
            .addCase(webLogin.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload.user,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken,
                        access: payload.access,
                        pathname: payload.pathname
                    },
                }
            })
            .addCase(webLogin.rejected, (state, { payload }) => {
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});

export const profileSlice = createSlice({
    name: 'my-profile',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(authMe.pending, state => {
                state.pending = true;
            })
            .addCase(authMe.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload
                    },
                }
            })
            .addCase(authMe.rejected, (state, { payload }) => {
                state.isLogin  = false;
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});


export const selectLogin = (state: RootState) => state.loginReducers;
export const selectAuth = (state: RootState) => state.profileReducers;

const loginReducers = loginSlice.reducer;
const profileReducers = profileSlice.reducer;

export { loginReducers, profileReducers };