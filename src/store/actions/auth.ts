import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import * as AuthAPI from '../../lib/api/auth';
import { addUniv } from './profile';

// 원래는 errorCode로 validation 했었는데 이제는 message로 컴포넌트에서 분기해줘야 할듯.
type ErrorRes = {
    errorMessage: string
}

type PreJoinUserResponse = {
    token: string,
    userId: string
}

export const preUserJoinThunk = createAsyncThunk<
    PreJoinUserResponse,
    FormData,
    { rejectValue: string }
>(
    'auth/join',
    async (form, thunkAPi) => {
        try {
            const res = await AuthAPI.userJoin(form);
            if(!res.data.success) thunkAPi.rejectWithValue(res.data.message);
            return {
                token: res.data.token,
                userId: res.data.userId
            }
        }catch(err) {
            let error: AxiosError<ErrorRes> = err;
            if(!error.response) throw err;
            return thunkAPi.rejectWithValue(error.response.data.errorMessage);
        }
    }
);
export const sendEmailThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'auth/sendEmail',
    async (email, thunkAPi) => {
        try {
            const res = await AuthAPI.sendEmail(email);
            if(res.data.success) {
                return email // success
            }else {
                const errCode = res.data.code;
                if(errCode === 451) 
                    alert("이메일 전송을 실패했습니다 다시 보내주세요.");
                else 
                    alert("이미 가입된 이메일입니다 로그인해주세요.");
                return thunkAPi.rejectWithValue('')
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            return thunkAPi.rejectWithValue('');
        }
    }
)

export const checkEmailThunk = createAsyncThunk<
    void,
    { email: string, code: number, univKor: string},
    { rejectValue: number | null }
>(
    'auth/checkEmail',
    async ({ email, code, univKor }, thunkAPi) => {
        try {
            const res = await AuthAPI.checkEmail(email, code);
            if(res.data.success) {
                thunkAPi.dispatch(addUniv(univKor));
            }else {
                const errCode = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            thunkAPi.rejectWithValue(null);
        }
    }
)

export const findAuthThunk = createAsyncThunk<
    void,
    string,
    { rejectValue: null }
>(
    'auth/findAuth',
    async (email, thunkAPi) => {
        try {
            const res = await AuthAPI.findInfo(email);
            if(!res.data.success) {
                const errCode = res.data.code;
                if(errCode == 457) {
                    alert("가입되지 않은 이메일입니다.")
                }else if(errCode === 451) {
                    alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 잠시 후에 다시 시도해주세요');
                }
                thunkAPi.rejectWithValue(null);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            thunkAPi.rejectWithValue(null);
        }
    }
)

export const checkNameThunk = createAsyncThunk<
    void,
    { displayName: string, pwd: string, phoneNumber: string},
    { rejectValue: number | null }
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
                const errCode = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            return thunkAPi.rejectWithValue(null);
        }
    }
)

export const loginThunk = createAsyncThunk<
    void,
    { displayName: string, pwd: string, phoneNumber: string},
    { rejectValue: number | null }
>(
    'auth/login',
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
                const errCode = res.data.code;
                return thunkAPi.rejectWithValue(errCode);
            }
        }catch(err) {
            console.log(err);
            alert('Something went wrong')
            return thunkAPi.rejectWithValue(null);
        }
    }
)

type Auth = {
    status: 'idle' | 'pending',
    error: string | null | undefined,
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
    error: null,
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
        .addCase(preUserJoinThunk.rejected, (state, { payload }) => {
            state.status = 'idle';
            state.error = payload;
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
        .addCase(findAuthThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(findAuthThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(findAuthThunk.rejected, (state) => {
            state.status = 'pending';
        })
})

export default preUserSlice.reducer;