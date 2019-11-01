import { put, delay, takeEvery } from 'redux-saga/effects'

const ADD_TODO = 'ADD_TODO'

export function addTodo(value) {
    return { type: ADD_TODO, value }
}

const TOGGLE_TODO = 'TOGGLE_TODO'

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

const ADD_DELAYED_TODO = 'ADD_DELAYED_TODO'

export function addDelayedTodo(value) {
    return { type: ADD_DELAYED_TODO, value }
}

function* addDelayedTodoSaga(action) {
    yield delay(1000)
    yield put(addTodo(action.value))
}

export function selectTodos(state) {
    return state.todos
}

export function* todosSagaWatcher() {
    yield takeEvery(ADD_DELAYED_TODO, addDelayedTodoSaga)
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
