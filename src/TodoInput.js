import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { addTodo, addDelayedTodo } from './duck'

function TodoInput({ onSubmit, onDelayedSubmit }) {
    const [value, setValue] = useState('')

    const onAddClick = useCallback(() => {
        onSubmit(value)
        setValue('')
    }, [onSubmit, value])

    const onDelayedAddClick = useCallback(() => {
        onDelayedSubmit(value)
        setValue('')
    }, [onDelayedSubmit, value])

    const onChange = useCallback(
        event => {
            setValue(event.target.value)
        },
        [setValue],
    )

    return (
        <div className="TodoInput">
            <input type="text" value={value} onChange={onChange} />
            <button onClick={onAddClick}>Add</button>
            <button onClick={onDelayedAddClick}>Add with delay</button>
        </div>
    )
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    onSubmit: addTodo,
    onDelayedSubmit: addDelayedTodo,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoInput)
