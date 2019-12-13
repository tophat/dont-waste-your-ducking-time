import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'

import { addTodo } from './duck'

function TodoInput({ onSubmit }) {
    const [value, setValue] = useState('')

    const onAddClick = useCallback(() => {
        onSubmit(value)
        setValue('')
    }, [onSubmit, value])

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
        </div>
    )
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    onSubmit: addTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)
