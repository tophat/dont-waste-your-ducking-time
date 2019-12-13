import { createStore } from 'redux'

import rootReducer from './duck'

function configureStore() {
    return createStore(rootReducer)
}

export default configureStore
