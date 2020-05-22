function fetchTodosFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    text: 'Be a llama',
                    completed: false,
                },
                {
                    text: 'Kick a donkey',
                    completed: true,
                },
            ])
        }, 1000)
    })
}

export default {
    fetchTodosFromServer,
}
