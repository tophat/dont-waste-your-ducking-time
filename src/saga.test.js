import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import { call } from 'redux-saga/effects'

import configureStore from './configureStore'
import reducer, {
    fetchTodos,
    fetchTodosFromServer,
    fetchTodosSaga,
    selectIsFetchingTodos,
    selectTodos,
    selectTodosFetchError,
} from './duck'

describe('fetch todos saga', () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    it('populates the state with todos on success', async () => {
        const mockTodos = [{ text: 'Yeet a totodile', completed: false }]

        store.dispatch(fetchTodos())
        expect(selectIsFetchingTodos(store.getState())).toBe(true)

        const { storeState } = await expectSaga(fetchTodosSaga)
            .withReducer(reducer, store.getState())
            .provide([[call(fetchTodosFromServer), mockTodos]])
            .run()

        expect(selectTodos(storeState)).toEqual(mockTodos)
        expect(selectIsFetchingTodos(storeState)).toBe(false)
    })

    it('populates the state with an error on failure', async () => {
        const mockError = new Error()

        store.dispatch(fetchTodos())
        expect(selectIsFetchingTodos(store.getState())).toBe(true)

        const { storeState } = await expectSaga(fetchTodosSaga)
            .withReducer(reducer, store.getState())
            .provide([[call(fetchTodosFromServer), throwError(mockError)]])
            .run()

        expect(selectIsFetchingTodos(storeState)).toBe(false)
        expect(selectTodosFetchError(storeState)).toBe(mockError)
    })
})
