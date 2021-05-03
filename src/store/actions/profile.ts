import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getUser } from '../../lib/api/profile';
import { 
    getFriendInterestArticleDetailStart, 
    getFriendInterestArticleDetailSuccess, 
    getFriendInterestArticleDetailFail, 
    getFriendInterestArticleDetailInit
} from './Friend';

// Store type
interface UserState {
    status: 'idle' | 'pending',
    error: string | null | undefined,
    data: {
        profileImgSrc: string,
        isGraduate: boolean | null,
        isPublic: boolean | null,
        isLocationPublic: boolean | null,
        adj: string,
        job: string,
        gender: string,
        displayNameInUser: string,
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
    error: null,
    data: {
        profileImgSrc: '',
        isGraduate: null,
        isPublic: null,
        isLocationPublic: null,
        adj: '',
        job: '',
        gender: '',
        displayNameInUser: '',
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

const getUserSlice = createSlice({
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
        addDidsplayName(state, action: PayloadAction<string>) {
            state.data.displayNameInUser = action.payload;
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
        addLocation(state, action: PayloadAction<{ location: string, longitude: number, latitude: number }>) {
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
    }
})

export const { addUniv } = getUserSlice.actions;


// GetInterestArticle
export const getInterestArticleStart = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_START,
    }
}
export const getInterestArticleSuccess = (interest, articleDataArr, myUserId) => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_SUCCESS,
        interest,
        articleDataArr,
        myUserId
    }
}
export const getInterestArticleFail = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_FAIL,
    }
}
export const getInterestArticleInit = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_INIT,
    }
}
export const getInterestArticle = (interest, tokenInUser) => {
    return dispatch => {
        dispatch(getInterestArticleStart());
        
        const userId = localStorage.getItem('_UID');
        AxiosForTest.get(`/user/${userId}/profile/post?interest=${interest}&page=0`, {
            headers: {
                'access-token': `${tokenInUser}`
            }
        })
            .then(res => {
                const isSuccess = res.data.success;
                if(isSuccess) {
                    const articleDataArr = res.data.data.post;
                    const myUserId = res.data.data.userId;
                    if(articleDataArr.length === 0) { // 해당 관심사에 대한 게시글이 없으면 
                        dispatch(getInterestArticleSuccess(interest, null, myUserId));
                        dispatch(getInterestArticleInit());
                    }else {
                        dispatch(getInterestArticleSuccess(interest, articleDataArr, myUserId));
                        dispatch(getInterestArticleInit());
                    }
                }
                else{
                    const errCode = res.data.code;
                    dispatch(getInterestArticleFail());
                    dispatch(getInterestArticleInit());
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(getInterestArticleFail());
                dispatch(getInterestArticleInit());
                alert('Something went wrong.');
            })
    }
}
// -------

// Get Article Detail
export const getInterestArticleDetailStart = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_DETAIL_START,
    }
}
export const getInterestArticleDetailSuccess = (interest, articleDataArr, hasMoreArticle) => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_DETAIL_SUCCESS,
        interest,
        articleDataArr,
        hasMoreArticle
    }
}
export const getInterestArticleDetailFail = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_DETAIL_FAIL,
    }
}
export const getInterestArticleDetailInit = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_DETAIL_INIT,
    }
}
export const getInterestArticleDetail = (token, interest, page, userId, type) => {
    return dispatch => {
        if(type === 'my') { // 나의 세부 게시글 볼 때
            dispatch(getInterestArticleDetailStart());
            AxiosForTest.get(`/post/user/${userId}?interest=${interest}&page=0`, {
                headers: {
                    'access-token': `${token}`
                }
            })
                .then(res => {
                    const isSuccess = res.data.success;
                    if(isSuccess) {
                        const articleDataArr = res.data.data;
                        let hasMoreArticle = true;
                        if(articleDataArr.length === 0)
                            hasMoreArticle = false;
                        dispatch(getInterestArticleDetailSuccess(interest, articleDataArr, hasMoreArticle));
                        dispatch(getInterestArticleDetailInit());
                    }
                    else{
                        dispatch(getInterestArticleDetailFail());
                        dispatch(getInterestArticleDetailInit());
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                    dispatch(getInterestArticleDetailFail());
                    dispatch(getInterestArticleDetailInit());
                    alert('Something went wrong.');
                })
        }else { // 친구 세부 게시글 볼때
            dispatch(getFriendInterestArticleDetailStart());
            AxiosForTest.get(`/post/user/${userId}?interest=${interest}&page=0`, {
                headers: {
                    'access-token': `${token}`
                }
            })
                .then(res => {
                    const isSuccess = res.data.success;
                    if(isSuccess) {
                        const articleDataArr = res.data.data;
                        let hasMoreArticle = true;
                        if(articleDataArr.length === 0)
                            hasMoreArticle = false;
                        dispatch(getFriendInterestArticleDetailSuccess(interest, articleDataArr, hasMoreArticle));
                        dispatch(getFriendInterestArticleDetailInit());
                    }
                    else{
                        dispatch(getFriendInterestArticleDetailFail());
                        dispatch(getFriendInterestArticleDetailInit());
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                    dispatch(getFriendInterestArticleDetailFail());
                    dispatch(getFriendInterestArticleDetailInit());
                    alert('Something went wrong.');
                })
        }
    }
}
// ------

export const updateProfileImg = (updatedProfileImg) => {
    return {
        type: actionTypes.UPDATE_PROFILE_IMG,
        updatedProfileImg,
    }
}

export const updateProfileImgToServer = (updatedProfileImg) => {
    return dispatch => {
        dispatch(updateProfileImg(updatedProfileImg));
        // 서버에 보내기
    }
}


// 프로필 수정
export const updateProfileStart = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_START,
    }
}
export const updateProfileSuccess = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
    }
}
export const updateProfileFail = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_FAIL,
    }
}
export const updateProfileInit = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_INIT,
    }
}
export const updateProfile = (token, editedProfileFormData) => {
    return dispatch => {
        dispatch(updateProfileStart());

        AxiosForTest.put(`/user/profile`, editedProfileFormData, {
            headers: {
                'access-token': `${token}`
            }
        })
            .then(res => {
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(updateProfileSuccess());
                    dispatch(updateProfileInit());
                }
                else{
                    dispatch(updateProfileFail());
                    dispatch(updateProfileInit());
                    alert(res.data.message);
                    window.location.href = '/my-profile';
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(updateProfileFail());
                dispatch(updateProfileInit());
                alert('Something went wrong.');
                window.location.href = '/my-profile';
            })
    }
}
// 게시글 삭제
export const deleteMyArticleStart = () => {
    return {
        type: actionTypes.DELETE_MY_ARTICLE_START,
    }
}
export const deleteMyArticleSuccess = (interest, postId) => {
    return {
        type: actionTypes.DELETE_MY_ARTICLE_SUCCESS,
        interest,
        postId,
    }
}
export const deleteMyArticleFail = () => {
    return {
        type: actionTypes.DELETE_MY_ARTICLE_FAIL,
    }
}
export const deleteMyArticleInit = () => {
    return {
        type: actionTypes.DELETE_MY_ARTICLE_INIT,
    }
}
export const deleteMyArticle = (token, interest, postId) => {
    return dispatch => {
        dispatch(deleteMyArticleStart());

        AxiosForTest.delete(`/post/${postId}`, {
            headers: {
                'access-token': `${token}`
            }
        })
            .then(res => {
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(deleteMyArticleSuccess(interest, postId));
                    dispatch(deleteMyArticleInit());
                }
                else{
                    dispatch(deleteMyArticleFail());
                    dispatch(deleteMyArticleInit());
                    alert(res.data.message);
                    window.location.href = '/my-profile';
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(deleteMyArticleFail());
                dispatch(deleteMyArticleInit());
                alert('Something went wrong.');
                window.location.href = '/my-profile';
            })
    }
}
// Edit article

export const editMyArticleStart = () => {
    return {
        type: actionTypes.EDIT_MY_ARTICLE_START,
    }
}
export const editMyArticleSuccess = (data, originalInterest, postId) => {
    return {
        type: actionTypes.EDIT_MY_ARTICLE_SUCCESS,
        data,
        originalInterest,
        postId,
    }
}
export const editMyArticleFail = () => {
    return {
        type: actionTypes.EDIT_MY_ARTICLE_FAIL,
    }
}
export const editMyArticleInit = () => {
    return {
        type: actionTypes.EDIT_MY_ARTICLE_INIT,
    }
}
export const editMyArticle = (token, editedFormData, data, originalInterest, postId) => {
    return dispatch => {
        dispatch(editMyArticleStart());
        AxiosForTest.put(`/post/${postId}`, editedFormData, {
            headers: {
                'access-token': `${token}`
            }
        })
            .then(res => {
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(editMyArticleSuccess(data, originalInterest, postId));
                    dispatch(editMyArticleInit());
                }
                else{
                    dispatch(editMyArticleFail());
                    dispatch(editMyArticleInit());
                    alert(res.data.message);
                    window.location.href = '/my-profile';
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(editMyArticleFail());
                dispatch(editMyArticleInit());
                alert('Something went wrong.');
                window.location.href = '/my-profile';
            })
    }
}
