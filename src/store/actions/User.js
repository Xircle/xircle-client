import * as actionTypes from './actionTypes';
import { Axios, AxiosForTest } from '../../axios-instance';
import axios from 'axios';

// GET시 /user/profile를 리덕스에 담기위한 액션.
export const addProfileImgSrc = (profileImgSrc) => {
    return {
        type: actionTypes.ADD_PROFILE_IMG_SRC,
        profileImgSrc,
    }
}
export const addPhoneNumber = (phoneNumber) => {
    return {
        type: actionTypes.ADD_PHONE_NUMBER,
        phoneNumber,
    }
}
export const addIsPublic = (isPublic) => {
    return {
        type: actionTypes.ADD_IS_PUBLIC,
        isPublic,
    }
}
export const addIsGraduate = (isGraduate) => {
    return {
        type: actionTypes.ADD_IS_GRADUATE,
        isGraduate,
    }
}
export const addIsLocationPublic = (isLocationPublic) => {
    return {
        type: actionTypes.ADD_IS_LOCATION_PUBLIC,
        isLocationPublic,
    }
}

export const addDidsplayName = (displayNameInUser) => {
    return {
        type: actionTypes.ADD_DISPLAY_NAME,
        displayNameInUser,
    }
}
export const addGender = (gender) => {
    return {
        type: actionTypes.ADD_GENDER,
        gender,
    }
}
export const addUniv = (univ) => {
    return {
        type: actionTypes.ADD_UNIV,
        univ,
    }
}
export const addAge = (age) => {
    return {
        type: actionTypes.ADD_AGE,
        age,
    }
}
export const addJob = (job) => {
    return {
        type: actionTypes.ADD_JOB,
        job,
    }
}

export const addAdj = (adj) => {
    return {
        type: actionTypes.ADD_ADJ,
        adj,
    }
}
export const addLocation = (location, longitude, latitude) => {
    return {
        type: actionTypes.ADD_LOCATION,
        location,
        longitude, 
        latitude
    }
}
export const addResume = (resume) => {
    return {
        type: actionTypes.ADD_RESUME,
        resume,
    }
}
export const addWorkPlace = (workPlace) => {
    return {
        type: actionTypes.ADD_WORKPLACE,
        workPlace,
    }
}
export const addIntroText = (introText) => {
    return {
        type: actionTypes.ADD_INTRO_TEXT,
        introText,
    }
}
export const addInterest = (interestArr) => {
    return {
        type: actionTypes.ADD_INTEREST,
        interestArr,
    }
}


export const addArticleContents = (articleTitle, articleText, articleInterestArr, articleTagArr) => {
    return {
        type: actionTypes.ADD_ARTICLE_CONTENTS,
        articleTitle,
        articleText,
        articleInterestArr,
        articleTagArr
    }
}
// create new article
export const createNewArticleStart = () => {
    return {
        type: actionTypes.CREATE_NEW_ARTICLE_START,
        
    }
}
export const createNewArticleSuccess = () => {
    return {
        type: actionTypes.CREATE_NEW_ARTICLE_SUCCESS,
    }
}
export const createNewArticleFail = () => {
    return {
        type: actionTypes.CREATE_NEW_ARTICLE_FAIL,
    }
}
export const createNewArticleInit = () => {
    return {
        type: actionTypes.CREATE_NEW_ARTICLE_INIT,
    }
}
export const createNewArticle = (tokenInUser, articleImgSrcFormData) => {
    return dispatch => {
        dispatch(createNewArticleStart());

        AxiosForTest.post(`/post`, articleImgSrcFormData, {
            headers: {
                'access-token': `${tokenInUser}`
            }
        })
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(createNewArticleSuccess());
                    dispatch(createNewArticleInit());
                }else {
                    dispatch(createNewArticleFail())
                    dispatch(createNewArticleInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(createNewArticleFail());
                dispatch(createNewArticleInit());
            })
    }
}

// SubmitToServer
export const submitToServerStart = () => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_START,
    }
}

export const submitToServerSuccess = () => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_SUCCESS,
    }
}
export const submitToServerFail = (errCode) => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_FAIL,
        errCode,
    }
}
export const submitToServerInit = () => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_FAIL,
    }
}
export const submitToServer = (userDataFormData) => {
    return dispatch => {
        dispatch(submitToServerStart());
        

        AxiosForTest.post('/user', userDataFormData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                const token = res.data.data.token;
                if(isSuccess) {
                    localStorage.setItem('tk', token);
                    dispatch(submitToServerSuccess());
                    dispatch(submitToServerInit());
                }else{
                    const errCode = res.data.code;
                    dispatch(submitToServerFail(errCode));
                    dispatch(submitToServerInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitToServerFail());
                dispatch(submitToServerInit());
                alert("Something went wrong.");
            })
    }
}

// GetInterestArticle
export const getInterestArticleStart = () => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_START,
    }
}
export const getInterestArticleSuccess = (interest, articleDataArr) => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_SUCCESS,
        interest,
        articleDataArr,
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
        
        let realInterest;
        if(interest === '술_맛집탐방')
            realInterest = '술/맛집탐방';
        else 
            realInterest = interest;
        
        AxiosForTest.get(`/user/profile/post?interest=${realInterest}`, {
            headers: {
                'access-token': `${tokenInUser}`
            }
        })
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    const articleDataArr = res.data.data;
                    if(articleDataArr.length === 0) { // 해당 관심사에 대한 게시글이 없으면 
                        dispatch(getInterestArticleSuccess(interest, null));
                        dispatch(getInterestArticleInit());
                    }else {
                        dispatch(getInterestArticleSuccess(interest, articleDataArr));
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
export const getInterestArticleDetailSuccess = (interest, articleDataArr) => {
    return {
        type: actionTypes.GET_INTEREST_ARTICLE_DETAIL_SUCCESS,
        interest,
        articleDataArr,
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
export const getInterestArticleDetail = (token, interest) => {
    return dispatch => {
        dispatch(getInterestArticleDetailStart());
        
        setTimeout(() => {
            const articleDataArr = [
                {
                    postId: 'a1', 
                    createdAt: "2021/03/21", 
                    articleImgSrcs: ["https://api.xircle.org/1616523233781.png", "hi"], 
                    articleTitle: "해방촌에서", 
                    extraHashtags: ['@독서', '@빅데이터']
                }, 
                {
                    postId: 'a2', 
                    createdAt: "2021/03/22", 
                    articleImgSrcs: ["https://api.xircle.org/1616588060318.png", "hello"], 
                    articleTitle: "카페에서 책읽기", 
                    extraHashtags: ['@카페', '@독서']
                }
            ];
            dispatch(getInterestArticleDetailSuccess(interest, articleDataArr));
            dispatch(getInterestArticleDetailInit());
        }, 2000);

        // AxiosForTest.get(`/post?interest=${interest}`, {
        //     headers: {
        //         'access-token': `${token}`
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //         const isSuccess = res.data.success;
        //         if(isSuccess) {
        //             const articleDataArr = res.data.data;
        //             dispatch(getInterestArticleDetailSuccess(interest, articleDataArr));
        //             dispatch(getInterestArticleDetailInit());
        //         }
        //         else{
        //             dispatch(getInterestArticleDetailFail());
        //             dispatch(getInterestArticleDetailInit());
        //             alert(res.data.message);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         dispatch(getInterestArticleDetailFail());
        //         dispatch(getInterestArticleDetailInit());
        //         alert('Something went wrong.');
        //     })
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
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(updateProfileSuccess());
                    dispatch(updateProfileInit());
                }
                else{
                    dispatch(updateProfileFail());
                    dispatch(updateProfileInit());
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(updateProfileFail());
                dispatch(updateProfileInit());
                alert('Something went wrong.');
            })
    }
}