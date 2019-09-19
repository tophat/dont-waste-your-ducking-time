const ADD_TODO = 'ADD_TODO'

export function addTodo(value) {
    return { type: ADD_TODO, value }
}

const TOGGLE_TODO = 'TOGGLE_TODO'

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

export function selectTodos(state) {
    return state.todos
}

function reducer(
    state = {
        todos: [],
    },
    action,
) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: state.todos.concat({
                    text: action.value,
                    completed: false,
                }),
            }
        case TOGGLE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, action.index),
                    {
                        ...state.todos[action.index],
                        completed: !state.todos[action.index].completed,
                    },
                    ...state.todos.slice(action.index + 1),
                ],
            }
        default:
            return state
    }
}

export default reducer
