const Todo = (props) => {
    
    const{ todos, title, deleteDataTodo} = props
    // console.log('>>> Check props: ', props);
    const handleDeleteTodo = (id) => {
        deleteDataTodo(id);
    }
    return (
        <div className='row justify-content-center py-5'>
            <div className="title">
                {title}
            </div>
            <hr/>
            {todos.map(todo => {
                return (
                    <div className="col-7" key={todo.id}>        
                        <div className="todo-item text-center">
                            {todo.title} - <span><button className='btn btn-sm text-white bg-gradient bg-danger' onClick={() => handleDeleteTodo(todo.id)}>Delete</button></span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Todo;