const initialState = {
    data: [],
}

const todos = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state, // spread operator
                data: [...state.data, action.todoItem],
            };
        case "DELETE_TODO":
            return {
                ...state,
                data: [...state.data.filter((todo) => todo.id !== action.id)],
            };
        case "UPDATE_TODO":
            return {
                ...state,
                data: [...state.data.filter((todo) => todo.id !== action.id),
                { id: action.id, Title: action.Title, Description: action.Description, Date: action.Date },
                ],
            };
        default:
            return state
    }
};

export default todos