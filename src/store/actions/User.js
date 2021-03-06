import * as actionTypes from './actionTypes';
import { Axios } from '../../axios-instance';


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
export const addGender = (gender) => {
    return {
        type: actionTypes.ADD_GENDER,
        gender,
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

export const addLocation = (location, lng, lat) => {
    return {
        type: actionTypes.ADD_LOCATION,
        location,
        lng,
        lat
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

export const submitArticleImgToAWS = (articleImg_formData, payloadType) => {
    return dispatch => {
        dispatch(submitImgToAWSStart());

        Axios.post('/img', articleImg_formData)
            .then(res => {
                console.log(res);
                const imgAwsUrl = res.data.data;
                const isSuccess = res.data.success;
                if(isSuccess) {
                    console.log(payloadType)
                    dispatch(submitImgToAWSSuccess(imgAwsUrl, payloadType))
                    dispatch(submitImgToAWSInit())
                }else {
                    dispatch(submitImgToAWSFail())
                    dispatch(submitImgToAWSInit())
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitImgToAWSFail());
                dispatch(submitImgToAWSInit())
            })
    }
}
// ----

// Submit proflieImgSrc to AWS S3
export const submitProfileImgToAWS = (profileImg_formData, type) => {
    return dispatch => {
        dispatch(submitImgToAWSStart());

        Axios.post('/img', profileImg_formData)
            .then(res => {
                console.log(res);
                const imgAwsUrl = res.data.data;
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(submitImgToAWSSuccess(imgAwsUrl, type))
                    dispatch(submitImgToAWSInit())
                }else {
                    dispatch(submitImgToAWSFail())
                    dispatch(submitImgToAWSInit())
                }
            })
            .catch(err => {{
                console.log(err);
                dispatch(submitImgToAWSFail())
            }})
    }
}
// -----

export const addArticleText = (articleText) => {
    return {
        type: actionTypes.ADD_ARTICLE_TEXT,
        articleText,
    }
}
export const addArticleTag = (articleTag) => {
    return {
        type: actionTypes.ADD_ARTICLE_HASHTAG,
        articleTag,
    }
}

export const addInterest = (interestArr) => {
    return {
        type: actionTypes.ADD_INTEREST,
        interestArr,
    }
}


export const addIntroText = (introText) => {
    return {
        type: actionTypes.ADD_INTRO_TEXT,
        introText,
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
export const submitToServerFail = () => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_FAIL,
    }
}
export const submitToServerInit = () => {
    return {
        type: actionTypes.SUBMIT_TO_SERVER_FAIL,
    }
}
export const submitToServer = (phoneNumberInRedux, latitudeInRedux, longitudeInRedux, passwordInRedux, isPublicInRedux, isGraduateInRedux, emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, resumeText, workPlaceText) => {
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
            articleText: articleTextInRedux, 
            articleTag: articleTagInRedux,
        };
        Axios.post('/pre/user', userData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess)
                    dispatch(submitToServerSuccess());
                else {
                    dispatch(submitToServerFail());
                    dispatch(submitToServerInit());
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitToServerFail());
                dispatch(submitToServerInit());
                alert('일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
            })
    }
}


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
