import React from 'react'
import { connect } from 'react-redux'

import { fetchTodos, selectIsFetchingTodos } from './duck'

function FetchTodosButton({ isFetchingTodos, fetchTodos }) {
    return (
        <button disabled={isFetchingTodos} onClick={fetchTodos}>
            {isFetchingTodos ? 'Fetching...' : 'Fetch Todos'}
        </button>
    )
}

const mapStateToProps = state => ({
    isFetchingTodos: selectIsFetchingTodos(state),
})

const mapDispatchToProps = {
    fetchTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchTodosButton)
