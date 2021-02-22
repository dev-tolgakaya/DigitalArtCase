import initialState from "./initialState";

const TodoReducer = (state = initialState.todos, action) => {
    switch (action.type) {
        case 'SET_TODOS' : {
            return action.payload
        }
        case 'ADD_TODO' : {
            const newState = [...state,action.payload]
            return newState
        }
        case 'DELETE_TODO': {
            const newState = state.filter((todo) => todo.key !== action.payload)
            return newState
        }
        case 'UPDATE_TODO': {
            const newState = state.map((todo) => todo.key === action.payload.key ? action.payload : todo)
            return newState
        }
        default:
            return state
    }
}

export default TodoReducer;
