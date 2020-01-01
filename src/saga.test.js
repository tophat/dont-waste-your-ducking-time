import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import { END } from 'redux-saga'
import { call } from 'redux-saga/effects'

import configureStore from './configureStore'
import client from './client'
import reducer, {
    fetchTodos,
    fetchTodosSaga,
    selectIsFetchingTodos,
    selectTodos,
    selectTodosFetchError,
} from './duck'

/*
 * We can apply the same philosophy of "test the whole duck" when testing sagas
 * as well. They're trickier to set up since they run async, but don't forget
 * the following rules of thumb and you should be fine:
 * - Use REAL state from a REAL store
 * - Don't test saga implementation details or reducer implementation details;
 *   make assertions on values returned by selectors
 * - Mock as little as possible; usually only network requests need to be
 *   mocked
 */
describe('fetch todos saga', () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    /*
     * We're using redux-saga-test-plan to make it easier to test sagas. Its
     * API is rich and you should NOT use everything available to you if you
     * want to write tests that are resilient to refactoring:
     * - Always use expectSaga, and never use testSaga, to avoid testing saga
     *   implementation details
     * - Always use withReducer; we want the saga to operate on a REAL state
     *   from a REAL store
     * - Use `.provide(...)` as little as possible; you should only be mocking
     *   network requests - if you're using a real state from a real store you
     *   shouldn't have to mock selectors used in your saga
     * - Never use `.put(...)`, `.hasFinalState(...)`, or other assertions that
     *   test saga or reducer implementation details. Make assertions on values
     *   returned by selectors instead.
     */
    it('populates the state with todos on success', async () => {
        const mockTodos = [{ text: 'Yeet a totodile', completed: false }]

        store.dispatch(fetchTodos())
        expect(selectIsFetchingTodos(store.getState())).toBe(true)

        const { storeState } = await expectSaga(fetchTodosSaga)
            .withReducer(reducer, store.getState())
            .provide([[call(client.fetchTodosFromServer), mockTodos]])
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
            .provide([
                [call(client.fetchTodosFromServer), throwError(mockError)],
            ])
            .run()

        expect(selectIsFetchingTodos(storeState)).toBe(false)
        expect(selectTodosFetchError(storeState)).toBe(mockError)
    })

    /*
     * If we want to write tests that assume sagas don't exist, we can! We need
     * access to the saga middleware root task, so we've lopped it onto the
     * store in the configureStore function. You can imagine abstracting this
     * pattern into a function you can reuse across tests.
     */
    it('fetches todos when fetchTodos is dispatched', async () => {
        const mockTodos = [{ text: 'Yeet a totodile', completed: false }]
        jest.spyOn(client, 'fetchTodosFromServer').mockImplementation(() =>
            Promise.resolve(mockTodos),
        )

        store.dispatch(fetchTodos())

        // The next two lines stop the sagas and wait for them to finish
        // running so we can make assertions on the final state of the store.
        // (TODO: how can we restart the sagas so we can dispatch more actions
        // and make more assertions on the same store?)
        store.dispatch(END)
        await store.sagaTask.toPromise()

        expect(selectTodos(store.getState())).toEqual(mockTodos)
    })
})
