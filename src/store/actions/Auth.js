import * as actionTypes from './actionTypes';
import { Axios } from '../../axios-instance';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (email, univKor) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        univ: univKor
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
export const auth = (email, univKor) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email
        };
        Axios.post('/email', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess)
                    dispatch(authSuccess(email, univKor));
                else {
                    const errCode = res.data.code;
                    dispatch(authFail(errCode));
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
export const authConfirmSuccess = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_SUCCESS,
    }
}
export const authConfirmInit = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_INIT,
    }
}

export const authConfirm = (email, code) => {
    return dispatch => {
        dispatch(authConfirmStart());
        const authData = {
            email,
            code, 
        };
        Axios.post('/check/email', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(authConfirmSuccess());
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
export const loginSuccess = (displayName) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        displayName,
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
        console.log(authData);
        Axios.post('/login', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(loginSuccess(displayName));
                }else {
                    const errCode = res.data.data;
                    console.log(errCode);
                    dispatch(loginFail(errCode));
                    if(errCode === 455) {
                        alert("존재하지 않는 별명입니다.");
                    }else if(errCode === 456) {
                        alert("올바른 비밀번호를 입력해주세요.")
                    }else {
                        console.log('잘못된 에러코드입니다.');
                    }
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
        console.log(authData);
        Axios.post('/find/info', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(findAuthSuccess());
                }else {
                    const errCode = res.data.data;
                    console.log(errCode);
                    dispatch(findAuthFail(errCode));
                    if(errCode === 457) {
                        alert("가입되지 않은 이메일입니다.");
                    }else if(errCode === 451) {
                        console.log('이메일 전송실패.')
                        alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
                    }else {
                        console.log('잘못된 에러코드입니다.');
                    }
                }
            })
            .catch(err => {
                const errCode = err;
                dispatch(findAuthFail());
                dispatch(findAuthInit());
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
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
        console.log(authData);
        Axios.post('/check/name', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(joinSuccess(displayName, wpd, phoneNumber));
                }
                else {
                    const errCode = res.data.data;
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

