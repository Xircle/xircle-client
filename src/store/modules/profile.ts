import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { displayPartsToString } from 'typescript';
import * as ProfileAPI from '../../lib/api/profile';
import { addInterestArr } from './articles';

// Thunk, actionCreator
export const getUserProfileThunk = createAsyncThunk(
    'profile/getProfile',
    async (_, { dispatch }) => {
        try {
            const res = await ProfileAPI.getUser();
            if(res.data.success) {
                const { profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, isLocationPublic, location, age, resume, workPlace,  introText, interestArr, longitude, latitude } = res.data.data;
                const {
                    addAdj,
                    addAge,
                    addDisplayName,
                    addGender,
                    addIntroText,
                    addIsGraduate,
                    addIsLocationPublic,
                    addIsPublic,
                    addWorkPlace,
                    addJob,
                    addLocation,
                    addProfileImgSrc,
                    addResume,
                    addUniv
                } = profileSlice.actions;

                dispatch(addProfileImgSrc(profileImgSrc));
                dispatch(addIsGraduate(isGraduate));
                dispatch(addIsPublic(isPublic));
                dispatch(addIsLocationPublic(isLocationPublic));
                dispatch(addAdj(adj));
                dispatch(addJob(job));
                dispatch(addGender(gender));
                dispatch(addDisplayName(displayName));
                dispatch(addUniv(university));
                dispatch(addLocation({ location, longitude, latitude }));
                dispatch(addAge(age));
                dispatch(addResume(resume));
                dispatch(addWorkPlace(workPlace));
                dispatch(addIntroText(introText));
                dispatch(addInterestArr(interestArr));
            }else {
                alert(res.data.message);
                window.location.href = 'auth';
                throw new Error(res.data.message);
            }
        }catch(err) {
            alert("Something went wrong");
            window.location.href = 'auth';
            throw err;
        }
    }
)

// Store type
export interface UserState {
    status: 'idle' | 'pending',
    data: {
        profileImgSrc: string,
        isGraduate: boolean | null,
        isPublic: boolean | null,
        isLocationPublic: boolean | null,
        adj: string,
        job: string,
        gender: string,
        displayName: string,
        univ: string,
        location: string,
        latitude: number | null,
        longitude: number | null,
        age: number | null,
        resume: string,
        workPlace: string,
        introText: string,
        interestArr: null,
        token: string | null
    }
}

const initialState = {
    status: 'idle',
    data: {
        profileImgSrc: '',
        isGraduate: null,
        isPublic: null,
        isLocationPublic: null,
        adj: '',
        job: '',
        gender: '',
        displayName: '',
        univ: '',
        location: '',
        latitude: null,
        longitude: null,
        age: null,
        resume: '',
        workPlace: '',
        introText: '',
        interestArr: null,
        token: null
    }
} as UserState;

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addProfileImgSrc(state, action: PayloadAction<string>) {
            state.data.profileImgSrc = action.payload;
        },
        addIsPublic(state, action: PayloadAction<boolean>) {
            state.data.isPublic = action.payload;
        },
        addIsGraduate(state, action: PayloadAction<boolean>) {
            state.data.isGraduate = action.payload;
        },
        addIsLocationPublic(state, action: PayloadAction<boolean>) {
            state.data.isLocationPublic = action.payload;
        },
        addDisplayName(state, action: PayloadAction<string>) {
            state.data.displayName = action.payload;
        },
        addGender(state, action: PayloadAction<string>) {
            state.data.gender = action.payload;
        },
        addUniv(state, action: PayloadAction<string>) {
            state.data.univ = action.payload;
        },
        addAge(state, action: PayloadAction<number>) {
            state.data.age = action.payload;
        },
        addJob(state, action: PayloadAction<string>) {
            state.data.job = action.payload;
        },
        addAdj(state, action: PayloadAction<string>) {
            state.data.adj = action.payload;
        },
        addLocation(state, action: PayloadAction<{ location: string, longitude: number | null, latitude: number | null }>) {
            state.data.location = action.payload.location;
            state.data.longitude = action.payload.longitude;
            state.data.latitude = action.payload.latitude;
        },
        addResume(state, action: PayloadAction<string>) {
            state.data.resume = action.payload;
        },
        addWorkPlace(state, action: PayloadAction<string>) {
            state.data.workPlace = action.payload;
        },
        addIntroText(state, action: PayloadAction<string>) {
            state.data.introText = action.payload;
        },
        // addInterest(state, action: PayloadAction<string[]>) {
        //     state
        // }
    }
})

export const {
    addGender,
    addIntroText,
    addIsGraduate,
    addIsLocationPublic,
    addIsPublic,
    addWorkPlace,
    addJob,
    addLocation,
    addProfileImgSrc,
    addResume,
    addUniv,
    addAge,
    addAdj,
    addDisplayName,
} = profileSlice.actions;
export default profileSlice.reducer;