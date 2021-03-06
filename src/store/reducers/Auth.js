import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // 첫 인증 auth
    email: null,
    phoneNumber: null,
    isEmailSent: null,
    isConfirmed: null,
    univ: null,
    // 공통(start)
    displayName: null,
    __pwd: null,
    error: null,
    errCode: null,
    loading: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                email: action.email,
                univ: action.univ,
                loading: false,
                isEmailSent: true
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            }
        case actionTypes.ERROR_INIT:
            return {
                ...state,
                error: null,
                loading: null,
                isEmailSent: null
            }
        case actionTypes.AUTH_CONFIRM_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AUTH_CONFIRM_SUCCESS:
            return {
                ...state,
                loading: false,
                isConfirmed: true,
                errCode: 0,
            }
        case actionTypes.AUTH_CONFIRM_FAIL:
            return {
                ...state,
                loading: false,
                isConfirmed: false,
                errCode: action.errCode
            }
        case actionTypes.AUTH_CONFIRM_INIT:
            return {
                ...state,
                isConfirmed: null,
                errCode: null
            }
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isConfirmed: true,
                displayName: action.displayName,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isConfirmed: false,
                errCode: action.errCode
            }
        case actionTypes.LOGIN_INIT:
            return {
                ...state,
                loading: null,
                isConfirmed: null,
                errCode: null
            }
        case actionTypes.FIND_AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FIND_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.FIND_AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errCode: action.errCode
            }
        case actionTypes.FIND_AUTH_INIT:
            return {
                ...state,
                loading: null,
                error: null,
                errCode: null
            }
        case actionTypes.JOIN_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.JOIN_SUCCESS:
            return {
                ...state,
                loading: false,
                displayName: action.displayName,
                phoneNumber: action.phoneNumber,
                __pwd: action.pwd,
                errCode: 0
            }
        case actionTypes.JOIN_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errCode: action.errCode
            }
        case actionTypes.JOIN_INIT:
            return {
                ...state,
                loading: null,
                error: null,
                errCode: null
            }
            
        default:
            return state;
    }
}

export default reducer;