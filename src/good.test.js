import configureStore from './configureStore'
import { addTodo, selectTodos, toggleTodo } from './duck'

/*
 * These tests all test the ENTIRE duck. Actions are dispatched to the store,
 * and assertions are made on the return values of selectors. There's no
 * mocking of state required. We test the entire action->reducer->selector
 * contract. We avoid testing implementation details. Our tests are easy to
 * write, descriptive, resilient to refactoring, and give us confidence that
 * everything in our duck works end-to-end. These tests treat the actions and
 * selectors as a "public interface" to the duck, and only conduct tests using
 * that public interface. The test operate on REAL state, the exact state
 * that your app will be using in production, not some mock state that
 * you've encoded into the test.
 */
describe('Todos duck', () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    it('adds a todo', () => {
        store.dispatch(addTodo('Buy milk'))
        const todos = selectTodos(store.getState())
        expect(todos).toEqual([{ text: 'Buy milk', completed: false }])
    })

    it('adds todos to an existing list', () => {
        store.dispatch(addTodo('Buy milk'))
        store.dispatch(addTodo('Walk the dog'))
        const todos = selectTodos(store.getState())
        expect(todos).toEqual([
            { text: 'Buy milk', completed: false },
            { text: 'Walk the dog', completed: false },
        ])
    })

    it('toggles a todo', () => {
        store.dispatch(addTodo('Buy milk'))

        store.dispatch(toggleTodo(0))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: true },
        ])

        store.dispatch(toggleTodo(0))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: false },
        ])
    })

    it('toggles todos in a list of many', () => {
        store.dispatch(addTodo('Buy milk'))
        store.dispatch(addTodo('Ride a donkey'))

        store.dispatch(toggleTodo(1))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: false },
            { text: 'Ride a donkey', completed: true },
        ])

        store.dispatch(toggleTodo(0))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: true },
            { text: 'Ride a donkey', completed: true },
        ])

        store.dispatch(toggleTodo(1))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: true },
            { text: 'Ride a donkey', completed: false },
        ])

        store.dispatch(toggleTodo(0))
        expect(selectTodos(store.getState())).toEqual([
            { text: 'Buy milk', completed: false },
            { text: 'Ride a donkey', completed: false },
        ])
    })
})
