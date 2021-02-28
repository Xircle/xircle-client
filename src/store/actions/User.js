import * as actionTypes from './actionTypes';
import { Axios } from '../../axios-instance';

export const addAge = (age) => {
    return {
        type: actionTypes.ADD_AGE,
        age,
    }
}
export const addGender = (gender) => {
    return {
        type: actionTypes.ADD_GENDER,
        gender,
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

export const addLocation = (location) => {
    return {
        type: actionTypes.ADD_LOCATION,
        location,
    }
}

// ArticleImg Submit to AWS S3
export const submitArticleImgToAWSStart = () => {
    return {
        type: actionTypes.SUBMIT_ARTICLE_IMGSRC_TO_AWS_START,
    }
}
export const submitArticleImgToAWSSuccess = (imgAwsUrl) => {
    return {
        type: actionTypes.SUBMIT_ARTICLE_IMGSRC_TO_AWS_SUCCESS,
        imgAwsUrl,
    }
}
export const submitArticleImgToAWSFail = () => {
    return {
        type: actionTypes.SUBMIT_ARTICLE_IMGSRC_TO_AWS_FAIL,
    }
}
export const submitImgToAWSInit = () => {
    return {
        type: actionTypes.SUBMIT_IMG_SRC_TO_AWS_INIT,
    }
}

export const submitArticleImgToAWS = (articleImg_formData) => {
    return dispatch => {
        dispatch(submitArticleImgToAWSStart());
        
        console.log(articleImg_formData);

        Axios.post('/img', articleImg_formData)
            .then(res => {
                console.log(res);
                const imgAwsUrl = res.data.data;
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(submitArticleImgToAWSSuccess(imgAwsUrl))
                    dispatch(submitImgToAWSInit())
                }else {
                    dispatch(submitArticleImgToAWSFail())
                    dispatch(submitImgToAWSInit())
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(submitArticleImgToAWSFail());
                dispatch(submitImgToAWSInit())
            })
    }
}
// ----

export const addArticleText = (articleText) => {
    return {
        type: actionTypes.ADD_ARTICLE_TEXT,
        articleText,
    }
}

export const addInterest = (interestArr) => {
    return {
        type: actionTypes.ADD_INTEREST,
        interestArr,
    }
}

// displayName check
export const displayNameStart = () => {
    return {
        type: actionTypes.DISPLAYNAME_START,
    }
}
export const displayNameSuccess = (displayName) => {
    return {
        type: actionTypes.DISPLAYNAME_SUCCESS,
        displayName,
    }
}
export const displayNameFail = () => {
    return {
        type: actionTypes.DISPLAYNAME_FAIL,
    }
}
export const displayNameInit = () => {
    return {
        type: actionTypes.DISPLAYNAME_INIT,
    }
}

export const displayName = (displayName) => {
    return dispatch => {
        dispatch(displayNameStart());

        const data = {
            displayName
        }
        Axios.post('/check/name', data)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess){ 
                    dispatch(displayNameSuccess(displayName));
                }else {
                    dispatch(displayNameFail());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(displayNameFail());
            })
    }
}
// -----

export const addIntroText = (introText) => {
    return {
        type: actionTypes.ADD_INTRO_TEXT,
        introText,
    }
}

// Submit proflieImgSrc to AWS S3
export const submitProfileImgToAWSStart = () => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMGSRC_TO_AWS_START,
    }
}
export const submitProfileImgToAWSSuccess = (imgAwsUrl) => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMGSRC_TO_AWS_SUCCESS,
        imgAwsUrl,
    }
}
export const submitProfileImgToAWSFail = () => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMGSRC_TO_AWS_FAIL,
    }
}

export const submitProfileImgToAWS = (profileImg_formData) => {
    return dispatch => {
        dispatch(submitProfileImgToAWSStart());

        Axios.post('/img', profileImg_formData)
            .then(res => {
                console.log(res);
                const imgAwsUrl = res.data.data;
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(submitProfileImgToAWSSuccess(imgAwsUrl))
                }else {
                    dispatch(submitProfileImgToAWSFail())
                }
            })
            .catch(err => {{
                console.log(err);
                dispatch(submitProfileImgToAWSFail())
            }})
    }
}
// -----

export const addInstagramId = (instagramId) => {
    return {
        type: actionTypes.ADD_INSTA_ID,
        instagramId
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

export const submitToServer = (emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, instagramIdInRedux) => {
    return dispatch => {
        dispatch(submitToServerStart());
        const userData = {
            email: emailInRedux,
            gender: genderInRedux, 
            age: ageInRedux,
            job: jobInRedux, 
            adj: adjInRedux, 
            location: locationInRedux, 
            articleImgSrc: articleImgSrcInRedux, 
            articleText: articleTextInRedux, 
            displayName: displayNameInRedux, 
            interestArr: interestArrInRedux, 
            introText: introTextInRedux, 
            profileImgSrc: profileImgSrcInRedux, 
            instagramId: instagramIdInRedux
        };
        console.log(userData);
        Axios.post('/pre/user', userData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess)
                    dispatch(submitToServerSuccess());
                else
                    dispatch(submitToServerFail());
            })
            .catch(err => {
                console.log(err);
                dispatch(submitToServerFail());
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
