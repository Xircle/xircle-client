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
                    dispatch(authFail());
                    alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
                }
            })
            .catch(err => {
                console.log(err);
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
                dispatch(authFail(err));
            })
    }
}

// auth Confirm
export const authConfirmStart = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_START,
    }
}
export const authConfirmFail = () => {
    return {
        type: actionTypes.AUTH_CONFIRM_FAIL,
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

export const authConfirm = (email) => {
    return dispatch => {
        dispatch(authConfirmStart());
        const authData = {
            email: email
        };
        Axios.post('/check/email', authData)
            .then(res => {
                console.log(res);
                const isSuccess = res.data.success;
                if(isSuccess) {
                    dispatch(authConfirmSuccess());
                    dispatch(authConfirmInit());
                }
                else {
                    dispatch(authConfirmFail());
                    dispatch(authConfirmInit());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authConfirmFail());
                dispatch(authConfirmInit());
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
            })
    }
}

