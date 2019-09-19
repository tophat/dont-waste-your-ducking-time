import React from 'react'
import { Provider } from 'react-redux'

import './App.css'

import TodoList from './TodoList'
import TodoInput from './TodoInput'
import configureStore from './configureStore'

function App() {
    return (
        <Provider store={configureStore()}>
            <div className="App">
                <h1>Todos</h1>
                <TodoList />
                <hr />
                <TodoInput />
            </div>
        </Provider>
    )
}

export default App
