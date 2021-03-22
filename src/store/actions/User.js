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

// ArticleImg Submit to AWS S3
export const submitImgToAWSStart = () => {
    return {
        type: actionTypes.SUBMIT_IMGSRC_TO_AWS_START,
        
    }
}
export const submitImgToAWSSuccess = (imgAwsUrl, payloadType) => {
    return {
        type: actionTypes.SUBMIT_IMGSRC_TO_AWS_SUCCESS,
        imgAwsUrl,
        payloadType,
    }
}
export const submitImgToAWSFail = () => {
    return {
        type: actionTypes.SUBMIT_IMGSRC_TO_AWS_FAIL,
    }
}
export const submitImgToAWSInit = () => {
    return {
        type: actionTypes.SUBMIT_IMG_SRC_TO_AWS_INIT,
    }
}

export const submitImgToAWS = (Img_formData, payloadType) => {
    return dispatch => {
        dispatch(submitImgToAWSStart());

        Axios.post('/img', Img_formData)
            .then(res => {
                console.log(res);
                const imgAwsUrl = res.data.data;
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(submitImgToAWSSuccess(imgAwsUrl, payloadType))
                    dispatch(submitImgToAWSInit());
                }else {
                    dispatch(submitImgToAWSFail())
                    dispatch(submitImgToAWSInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitImgToAWSFail());
                dispatch(submitImgToAWSInit());
            })
    }
}

export const addArticleContents = (articleText, articleInterestArr, articleTagArr) => {
    return {
        type: actionTypes.ADD_ARTICLE_CONTENTS,
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

export const submitToServerSuccess = (resume, workPlace, token) => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_SUCCESS,
        resume,
        workPlace,
        token,
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
export const submitToServer = (phoneNumberInRedux, latitudeInRedux, longitudeInRedux, passwordInRedux, isPublicInRedux, isGraduateInRedux, emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleInterestArrInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, resumeText, workPlaceText) => {
    return dispatch => {
        dispatch(submitToServerStart());
        const userData = {
            gender: genderInRedux, 
            age: ageInRedux,
            adj: adjInRedux, 
            job: jobInRedux, 
            location: locationInRedux, 
            longitude: longitudeInRedux,
            latitude: latitudeInRedux,
            displayName: displayNameInRedux, 
            profileImgSrc: profileImgSrcInRedux, 
            introText: introTextInRedux, 
            interestArr: interestArrInRedux, 
            phoneNumber: phoneNumberInRedux,
            isPublic: isPublicInRedux,
            isGraduate: isGraduateInRedux,
            resume: resumeText,
            workPlace: workPlaceText,
            password: passwordInRedux,
            email: emailInRedux,
            articleImgSrc: articleImgSrcInRedux, 
            articleInterestArr: articleInterestArrInRedux, 
            articleText: articleTextInRedux, 
            articleTag: articleTagInRedux,
        };
        Axios.post('/pre/user', userData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                const token = res.data.data.token;
                if(isSuccess) {
                    dispatch(submitToServerSuccess(resumeText, workPlaceText, token));
                    localStorage.setItem('tk', token);
                }
                else{
                    const errCode = res.data.code;
                    dispatch(submitToServerFail(errCode));
                    dispatch(submitToServerInit());
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitToServerFail());
                dispatch(submitToServerInit());
                alert('Something went wrong.');
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
                    const articleDataArr = res.data.data; // [{articleImgSrc, articleContent}, {articleImgSrc, articleContent}]
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

        for (let value of editedProfileFormData.values()) {
            console.log(value);
        }
        console.log('---------------')
        for (let key of editedProfileFormData.keys()) {
            console.log(key);
        }
        
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