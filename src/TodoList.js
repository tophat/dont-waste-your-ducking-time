import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { selectTodos, toggleTodo } from './duck'

function Todo({ index, text, completed, onClick }) {
    const styles = {}
    if (completed) {
        styles.textDecorationLine = 'line-through'
    }
    const onTodoClick = useCallback(() => {
        onClick(index)
    }, [index, onClick])
    return (
        <div style={styles} onClick={onTodoClick}>
            {index + 1}. {text}
        </div>
    )
}

function TodoList({ todos, onClick }) {
    return (
        <div className="TodoList">
            {todos.length === 0 && 'No todos!'}
            {todos.map((todo, i) => (
                <Todo
                    index={i}
                    text={todo.text}
                    completed={todo.completed}
                    key={i}
                    onClick={onClick}
                />
            ))}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        todos: selectTodos(state),
    }
}

const mapDispatchToProps = {
    onClick: toggleTodo,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList)
