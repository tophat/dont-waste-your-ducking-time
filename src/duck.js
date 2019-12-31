import { call, put, takeEvery } from 'redux-saga/effects'

const ADD_TODO = 'ADD_TODO'

export function addTodo(value) {
    return { type: ADD_TODO, value }
}

const TOGGLE_TODO = 'TOGGLE_TODO'

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

const FETCH_TODOS = 'FETCH_TODOS'

export function fetchTodos() {
    return { type: FETCH_TODOS }
}

const FETCH_TODOS_SUCCEEDED = 'FETCH_TODOS_SUCCEEDED'

export function fetchTodosSucceeded(todos) {
    return { type: FETCH_TODOS_SUCCEEDED, todos }
}

const FETCH_TODOS_FAILED = 'FETCH_TODOS_FAILED'

export function fetchTodosFailed(error) {
    return { type: FETCH_TODOS_FAILED, error }
}

export function selectTodos(state) {
    return state.todos
}

export function selectIsFetchingTodos(state) {
    return state.isFetchingTodos
}

export function selectTodosFetchError(state) {
    return state.todosFetchError
}

const defaultState = {
    todos: [],
    isFetchingTodos: false,
    todosFetchError: null,
}

function reducer(state = defaultState, action) {
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
        case FETCH_TODOS:
            return {
                ...state,
                isFetchingTodos: true,
                todosFetchError: null,
            }
        case FETCH_TODOS_SUCCEEDED:
            return {
                ...state,
                todos: action.todos,
                isFetchingTodos: false,
                todosFetchError: null,
            }
        case FETCH_TODOS_FAILED:
            return {
                ...state,
                isFetchingTodos: false,
                todosFetchError: action.error,
            }
        default:
            return state
    }
}

export function fetchTodosFromServer() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    text: 'Be a llama',
                    completed: false,
                },
                {
                    text: 'Kick a donkey',
                    completed: true,
                },
            ])
        }, 1000)
    })
}

export function* fetchTodosSaga() {
    try {
        const todos = yield call(fetchTodosFromServer)
        yield put(fetchTodosSucceeded(todos))
    } catch (e) {
        yield put(fetchTodosFailed(e))
    }
}

export function* sagaWatcher() {
    yield takeEvery(FETCH_TODOS, fetchTodosSaga)
}

export default reducer
