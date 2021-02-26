import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: null,
    isEmailSent: null,
    isConfirmed: null,
    univ: null,
    error: null,
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
                error: false,
                isEmailSent: true
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            }
        case actionTypes.AUTH_CONFIRM_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AUTH_CONFIRM_FAIL:
            return {
                ...state,
                loading: false,
                isConfirmed: false,
            }
        case actionTypes.AUTH_CONFIRM_SUCCESS:
            return {
                ...state,
                loading: false,
                isConfirmed: true,
            }
        case actionTypes.AUTH_CONFIRM_INIT:
            return {
                ...state,
                isConfirmed: null
            }
            
        case actionTypes.ERROR_INIT:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default reducer;