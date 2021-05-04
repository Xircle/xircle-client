import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import * as AuthAPI from '../../lib/api/auth';
import { addUniv } from './profile';


type PreJoinUserResponse = {
    token: string,
    userId: string
}

// Thunk actionCreator
export const preUserJoinThunk = createAsyncThunk<
    PreJoinUserResponse,
    FormData
>(
    'auth/join',
    async (form) => {
        try {
            const res = await AuthAPI.userJoin(form);
            if(!res.data.success) {
                const errorMsg = res.data.message;
                alert(errorMsg);
                throw new Error(errorMsg);
            }
            return {
                token: res.data.token,
                userId: res.data.userId
            }
        }catch(err) {
            throw err
        }
    }
);

export const sendEmailThunk = createAsyncThunk<
    string,
    string
>(
    'auth/sendEmail',
    async (email) => {
        try {
            const res = await AuthAPI.sendEmail(email);
            if(res.data.success) {
                return email // success
            }else {
                const errCode: number = res.data.code;
                if(errCode === 451) 
                    alert("이메일 전송을 실패했습니다 다시 보내주세요.");
                else 
                    alert("이미 가입된 이메일입니다 로그인해주세요.");
                throw new Error(res.data.message);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            throw new Error(err);
        }
    }
)

export const checkEmailThunk = createAsyncThunk<
    void,
    { email: string, code: number, univKor: string},
    { rejectValue: number }
>(
    'auth/checkEmail',
    async ({ email, code, univKor }, thunkAPi) => {
        try {
            const res = await AuthAPI.checkEmail(email, code);
            if(res.data.success) {
                thunkAPi.dispatch(addUniv(univKor));
            }else {
                const errCode: number = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            throw err;
        }
    }
)

export const findAuthThunk = createAsyncThunk<
    void,
    string
>(
    'auth/findAuth',
    async (email, thunkAPi) => {
        try {
            const res = await AuthAPI.findInfo(email);
            if(!res.data.success) {
                const errCode: number = res.data.code;
                if(errCode == 457) {
                    alert("가입되지 않은 이메일입니다.")
                }else if(errCode === 451) {
                    alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 잠시 후에 다시 시도해주세요');
                }
                throw new Error(res.data.message);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            throw err;
        }
    }
)

export const checkNameThunk = createAsyncThunk<
    void,
    { displayName: string, pwd: string, phoneNumber: string},
    { rejectValue: number }
>(
    'auth/checkName',
    async ({ displayName, pwd, phoneNumber }, thunkAPi) => {
        try {
            const res = await AuthAPI.checkName(displayName);
            if(res.data.success) {
                thunkAPi.dispatch(preUserSlice.actions.saveAuthData({ 
                    displayName,
                    pwd,
                    phoneNumber
                }))
            }else {
                const errCode: number = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            throw err;
        }
    }
)

export const loginThunk = createAsyncThunk<
    { displayName: string, password: string},
    { displayName: string, password: string },
    { rejectValue: number }
>(
    'auth/login',
    async ({ displayName, password }, thunkAPi) => {
        try {
            const res = await AuthAPI.login(displayName, password);
            if(res.data.success) {
                const token = res.data.data.token;
                const userId = res.data.data.userId;
                localStorage.setItem('tk', token);
                localStorage.setItem('_UID', userId);
                return {
                    displayName,
                    password
                }
            }else {
                const errCode: number = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            throw err;
        }
    }
)

// Store & Reducer, with createSlice
type Auth = {
    status: 'idle' | 'pending',
    error_code: number | null | undefined,
    data: {
        email: string | null,
        displayName: string | null,
        password: string | null,
        phoneNumber: string | null,
        token: string | null,
        userId: string | null,
    }
}
const initialState: Auth = {
    status: 'idle',
    error_code: null,
    data: {
        email: null,
        displayName: null,
        password: null,
        phoneNumber: null,
        token: null,
        userId: null,
    }
}
const preUserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveAuthData(state, action: PayloadAction<{ displayName: string, pwd: string, phoneNumber: string }>) {
            state.data = {
                ...state.data,
                displayName: action.payload.displayName,
                password: action.payload.pwd,
                phoneNumber: action.payload.phoneNumber
            }
        }
    },
    extraReducers: builder => builder
    // Join pre user
        .addCase(preUserJoinThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(preUserJoinThunk.fulfilled, (state, { payload }) => {
            state.status = 'idle';

            localStorage.setItem('tk', payload.token);
            state.data.token = payload.token;
            state.data.userId = payload.userId;
        })
        .addCase(preUserJoinThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Send email
        .addCase(sendEmailThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(sendEmailThunk.fulfilled, (state, { payload }) => {
            state.status = 'idle';
            state.data.email = payload
        })
        .addCase(sendEmailThunk.rejected, (state) => {
            state.status = 'pending';
        })
    // Check email
        .addCase(checkEmailThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(checkEmailThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(checkEmailThunk.rejected, (state, { payload }) => {
            state.status = 'idle';
            state.error_code = payload;
        })
    // Find auth info
        .addCase(findAuthThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(findAuthThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(findAuthThunk.rejected, (state) => {
            state.status = 'pending';
        })
    // Check displayName
        .addCase(checkNameThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(checkNameThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(checkNameThunk.rejected, (state, { payload }) => {
            state.status = 'pending';
            state.error_code = payload;
        })
    // Login thunk
        .addCase(loginThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.status = 'pending';
            state.data.displayName = payload.displayName;
            state.data.password = payload.password;
        })
        .addCase(loginThunk.rejected, (state) => {
            state.status = 'pending';
        })
})

export default preUserSlice.reducer;
export const { saveAuthData } = preUserSlice.actions;