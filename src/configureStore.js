import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer, { todosSagaWatcher } from './duck'

function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
    const sagaTask = sagaMiddleware.run(todosSagaWatcher)
    store.selectFromEndState = async selector => {
        store.dispatch(END)
        await sagaTask.toPromise()
        return selector(store.getState())
    }
    return store
}

export default configureStore
