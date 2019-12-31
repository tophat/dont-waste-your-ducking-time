import reducer, { addTodo, selectTodos, toggleTodo } from './duck'

// WHAT FOLLOWS ARE THE WORST TESTS YOU HAVE EVER SEEN. DON'T WASTE YOUR
// DUCKING TIME: AVOID UNIT TESTING ACTION CREATORS, REDUCERS, AND SELECTORS

/*
 * I almost died of boredom writing these tests. They are practically useless,
 * each essentially a reimplementation of the action creator being tested.
 * They will fail readily if we change action structure, so they are not
 * resilient to refactoring.
 */
describe('Todos action creators', () => {
    it('creates an add todo action', () => {
        const action = addTodo('Smell a bunny')
        expect(action).toEqual({
            type: 'ADD_TODO',
            value: 'Smell a bunny',
        })
    })

    it('creates a toggle todo action', () => {
        const action = toggleTodo(0)
        expect(action).toEqual({
            type: 'TOGGLE_TODO',
            index: 0,
        })
    })
})

/*
 * These tests are the most valuable "unit tests" we've written, but they test
 * reducer implementation details. We have to consistently mock the state out,
 * and if we change our state shape all these tests will break all too easily.
 * Note how these tests closely mirror the integration tests in good.test.js,
 * but the integration tests succeed in testing the same functionality WITHOUT
 * testing implementation details. The integration tests achieve the same test
 * coverage without even assuming existence of the reducer.
 */
describe('Todos reducer', () => {
    it('updates the state when a todo is added', () => {
        const action = addTodo('Wear some pants')
        const nextState = reducer(undefined, action)
        expect(nextState).toEqual({
            todos: [{ text: 'Wear some pants', completed: false }],
        })
    })

    it('updates the state when a todo is added to an existing list', () => {
        const action = addTodo('Wear some pants')
        const nextState = reducer(
            { todos: [{ text: 'Wear some socks', completed: false }] },
            action,
        )
        expect(nextState).toEqual({
            todos: [
                { text: 'Wear some socks', completed: false },
                { text: 'Wear some pants', completed: false },
            ],
        })
    })

    it('updates the state when a todo is toggled', () => {
        const action = toggleTodo(0)
        const nextState = reducer(
            { todos: [{ text: 'Wear some pants', completed: false }] },
            action,
        )
        expect(nextState).toEqual({
            todos: [{ text: 'Wear some pants', completed: true }],
        })
        const nextNextState = reducer(nextState, action)
        expect(nextNextState).toEqual({
            todos: [{ text: 'Wear some pants', completed: false }],
        })
    })

    it('updates the state when a todo is toggled in a list of many', () => {
        const nextState = reducer(
            {
                todos: [
                    { text: 'Wear some pants', completed: false },
                    { text: 'Wear only pants', completed: false },
                ],
            },
            toggleTodo(1),
        )
        expect(nextState).toEqual({
            todos: [
                { text: 'Wear some pants', completed: false },
                { text: 'Wear only pants', completed: true },
            ],
        })
        const nextNextState = reducer(nextState, toggleTodo(0))
        expect(nextNextState).toEqual({
            todos: [
                { text: 'Wear some pants', completed: true },
                { text: 'Wear only pants', completed: true },
            ],
        })
        const nextNextNextState = reducer(nextNextState, toggleTodo(1))
        expect(nextNextNextState).toEqual({
            todos: [
                { text: 'Wear some pants', completed: true },
                { text: 'Wear only pants', completed: false },
            ],
        })
        const nextNextNextNextState = reducer(nextNextNextState, toggleTodo(0))
        expect(nextNextNextNextState).toEqual({
            todos: [
                { text: 'Wear some pants', completed: false },
                { text: 'Wear only pants', completed: false },
            ],
        })
    })
})

/*
 * This test makes me weep in sorrow. It's a complete reimplementation of the
 * selector. We have to mock the state, so the test is only testing that the
 * selector returns the correct thing from the MOCK, not that it returns the
 * real thing from the STATE, which is what we actually want. If we change
 * our state shape, this test won't even fail!
 */
describe('Todos duck selectors', () => {
    it('selects a list of todos from the state', () => {
        const state = {
            todos: [
                { text: 'Eat some salami', completed: false },
                { text: 'Eat more salami', completed: false },
            ],
        }
        expect(selectTodos(state)).toEqual(state.todos)
    })
})
