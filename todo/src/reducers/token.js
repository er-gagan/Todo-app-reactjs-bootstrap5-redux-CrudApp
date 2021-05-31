const initialState = {
    data: null,
}

const token = (state = initialState, action) => {
    switch (action.type) {
        case "TOKEN":
            return {
                // ...state, // spread operator
                data: action.token,
            };
        default:
            return state
    }
}

export default token