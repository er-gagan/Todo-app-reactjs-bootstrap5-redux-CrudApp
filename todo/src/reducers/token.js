const initialState = {
    data: '',
}

const token = (state = initialState, action) => {
    switch (action.type) {
        case "TOKEN":
            return {
                data: action.token,
            };
        default:
            return state
    }
}

export default token