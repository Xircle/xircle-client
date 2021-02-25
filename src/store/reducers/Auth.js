import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: null,
    isEmailSent: null,
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
                univ: action.univ
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                email: action.email,
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