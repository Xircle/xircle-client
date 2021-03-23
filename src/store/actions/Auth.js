import * as actionTypes from './actionTypes';
import { addProfileImgSrc, addIsPublic, addIsGraduate, addIsLocationPublic, addDidsplayName, addAge, addGender, addJob, addAdj, addLocation, addResume, addWorkPlace, addInterest, addUniv, addIntroText, }  from '../actions/User';
import { Axios, AxiosForTest } from '../../axios-instance';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
    }
}

export const errorInit = () => {
    return {
        type: actionTypes.ERROR_INIT
    }
}
// Auth page, 이메일 보내기
export const auth = (email) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email
        };
        AxiosForTest.post('/email', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess)
                    dispatch(authSuccess(email));
                else {
                    const errCode = res.data.code;
                    if(errCode === 451) {
                        alert("이메일 전송을 실패했습니다 다시 보내주세요.");
                    }else if(errCode === 450) {
                        alert("이미 가입된 이메일입니다 로그인해주세요.");
                    }
                    dispatch(authFail());
                    dispatch(errorInit());
                }
            })
            .catch(err => {
                console.log(err);
                const errorMsg = err.data.message;
                alert(errorMsg);
                dispatch(authFail(err));
                dispatch(errorInit());
            })
    }
}

// Auth page, Confirm 하기
export const authConfirmStart = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_START,
    }
}
export const authConfirmFail = (errCode) => {
    return {
        type: actionTypes.AUTH_CONFIRM_FAIL,
        errCode,
    }
}
export const authConfirmSuccess = (univKor) => {
    return {
        type: actionTypes.AUTH_CONFIRM_SUCCESS,
        univ: univKor,
    }
}
export const authConfirmInit = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_INIT,
    }
}

export const authConfirm = (email, code, univKor) => {
    return dispatch => {
        dispatch(authConfirmStart());
        const authData = {
            email,
            code, 
        };
        AxiosForTest.post('/check/email', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(authConfirmSuccess(univKor));
                    dispatch(authConfirmInit());
                }else {
                    const errCode = res.data.code;
                    console.log(errCode);
                    dispatch(authConfirmFail(errCode));
                    dispatch(authConfirmInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authConfirmFail(err.code));
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
            })
    }
}

// 닉네임/비번찾기 페이지.
export const findAuthStart = () => {
    return {
        type: actionTypes.FIND_AUTH_START,
    }
}
export const findAuthSuccess = () => {
    return {
        type: actionTypes.FIND_AUTH_SUCCESS,
    }
}
export const findAuthFail = (errCode) => {
    return {
        type: actionTypes.FIND_AUTH_FAIL,
        errCode,
    }
}
export const findAuthInit = () => {
    return {
        type: actionTypes.FIND_AUTH_INIT,
    }
}
export const findAuth = (email) => {
    return dispatch => {
        dispatch(findAuthStart());
        const authData = {
            email,
        };
        AxiosForTest.post('/find/info', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(findAuthSuccess());
                }else {
                    const errCode = res.data.code;
                    console.log(errCode);
                    dispatch(findAuthFail(errCode));
                    dispatch(findAuthInit());
                    if(errCode == 457) {
                        alert("가입되지 않은 이메일입니다.")
                    }else if(errCode === 451) {
                        alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 잠시 후에 다시 시도해주세요');
                    }
                }
            })
            .catch(err => {
                const errCode = err.data.code;
                dispatch(findAuthFail(errCode));
                dispatch(findAuthInit());
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 잠시 후에 다시 시도해주세요');
            })
    }
}

// Start 페이지. 첫 회원가입 
export const joinStart = () => {
    return {
        type: actionTypes.JOIN_START,
    }
}
export const joinSuccess = (displayName, pwd, phoneNumber) => {
    return {
        type: actionTypes.JOIN_SUCCESS,
        displayName,
        pwd,
        phoneNumber,
    }
}
export const joinFail = (errCode) => {
    return {
        type: actionTypes.JOIN_FAIL,
        errCode,
    }
}
export const joinInit = () => {
    return {
        type: actionTypes.JOIN_INIT,
    }
}
export const joinSubmit = (displayName, wpd, phoneNumber) => {
    return dispatch => {
        dispatch(joinStart());
        const authData = {
            displayName,
        };
        AxiosForTest.post('/check/name', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(joinSuccess(displayName, wpd, phoneNumber));
                }
                else {
                    const errCode = res.data.code;
                    console.log(errCode);
                    dispatch(joinFail(errCode));
                    dispatch(joinInit());
                }
            })
            .catch(err => {
                const errCode = err;
                dispatch(joinFail(errCode));
                dispatch(joinInit());
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
            })
    }
}

// Login 페이지, submit 하기
export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START,
    }
}
export const loginFail = (errCode) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        errCode,
    }
}
export const loginSuccess = (displayName, token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        displayName,
        token,
    }
}
export const loginInit = () => {
    return {
        type: actionTypes.LOGIN_INIT,
    }
}
export const loginSubmit = (displayName, password) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            displayName,
            password,
        };
        AxiosForTest.post('/login', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    const token = res.data.data.token;
                    dispatch(loginSuccess(displayName, token));
                    localStorage.setItem('tk', token);
                    dispatch(getUser(token));
                }else {
                    const errCode = res.data.code;
                    console.log(errCode);
                    dispatch(loginFail(errCode));
                    dispatch(loginInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(loginFail(err));
                dispatch(loginInit());
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
            })
    }
}

// (** User 스토어의 액션들) 
// /my-profile 페이지. 토큰받아서 GET /user/profile 
export const getUserStart = () => {
    return {
        type: actionTypes.GET_USER_START,
    }
}
export const getUserSuccess = (token, profileImgSrc, adj, job, displayNameInUser, gender, university, isGraduate, isPublic, isLocationPublic, location, age, resume, workPlace, introText, interestArr, longitude, latitude ) => {
    return dispatch => {
        dispatch(addProfileImgSrc(profileImgSrc));
        dispatch(addIsGraduate(isGraduate));
        dispatch(addIsPublic(isPublic));
        dispatch(addIsLocationPublic(isLocationPublic));
        dispatch(addAdj(adj));
        dispatch(addJob(job));
        dispatch(addGender(gender));
        dispatch(addDidsplayName(displayNameInUser));
        dispatch(addUniv(university));
        dispatch(addLocation(location, longitude, latitude));
        dispatch(addAge(age));
        dispatch(addResume(resume));
        dispatch(addWorkPlace(workPlace));
        dispatch(addIntroText(introText));
        dispatch(addInterest(interestArr));
        dispatch({type: actionTypes.GET_USER_SUCCESS, token: token});
    }
}
export const getUserFail = () => {
    return {
        type: actionTypes.GET_USER_FAIL,
    }
}
export const getUser = (token) => {
    return dispatch => {
        dispatch(getUserStart());

        AxiosForTest.get('/user/profile', {
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const { profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, isLocationPublic, location, age, resume, workPlace,  introText, interestArr, longitude, latitude } = res.data.data;
                dispatch(getUserSuccess(token, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, isLocationPublic, location, age, resume, workPlace, introText, interestArr, longitude, latitude));
            }else {
                dispatch(getUserFail());
                alert(res.data.message);
                window.location.href = 'auth';
            }
        })
        .catch(err => {
            console.log(err);
            alert("네트워크 오류입니다.");
        })
    }
}

