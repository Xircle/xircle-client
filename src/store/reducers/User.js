const initialState = {
    users: [
        {
            displayName: 니콜라스
        }
    ]
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;