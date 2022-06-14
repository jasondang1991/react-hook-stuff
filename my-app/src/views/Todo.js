const Todo = (props) => {
    const todos = props.todos
    console.log('>>> Check props: ', props);
    return (
        <div className='row justify-content-center py-5'>
            <div className="title">
                {props.title}
            </div>
            <hr/>
            {todos.map(todo => {
                return (
                    <div className="col-7" key={todo.id}>        
                        <div className="todo-item text-center">
                            {todo.title} - <span><button className='btn btn-sm btn-danger'>X</button></span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Todo;