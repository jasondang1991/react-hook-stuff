import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Nav from './views/Nav';
import Todo from './views/Todo';

const App = () => {

  // STATE
  // useState sẽ trả ra 1 array chứ 2 biến
  // biến 1: state, biến 2: chỉnh sửa state
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([
    { id: 'todo1', title: 'Watching Youtube', type: 'Jason' },
    { id: 'todo2', title: 'Do Homework', type: 'Quang'},
    { id: 'todo3', title: 'Play Game', type: 'Jason'},
    { id: 'todo4', title: 'Fix Bugs', type: 'Quang' }, 
    { id: 'todo5', title: 'Learn React', type: 'Jason' }, 
  ]);

  /**************************************************************************
  *  + []: array dependency 
  *  + Khi sử dụng hàm useEffect() có [] phía cuối là == componentDidMount()
  *  + Hàm useEffect() được sử dùng nhiều lần và chứa các state khác nhau
  ***************************************************************************/ 
  useEffect(() => {
    console.log('>>>> Run use effect');
  }, [content]) // [] array dependency

  // Function Add New Todo
  const handleAddNewTodo = (e) => {
    // HOOK NOT MERGE STATE
    // Spread Operator ...
    if (!content) {
      alert('Title is required !')
      return;
    }
    let newTodo = { 
      id: Math.floor((Math.random() * 100000) + 1), 
      title: content, 
      type: 'Jason' 
    }
    setTodos([...todos, newTodo]) // Cộng gộp state mới và state cũ
    setContent('');
  }

  // Function Get Data On Change Input
  const handleOnChangeInput = (e) => {
    setContent(e.target.value)
    // console.log(e.target.value);
  }

  // Function Delete Todo
  const deleteDataTodo = (id) => {
    // Không thể dùng biến todos trực tiếp vì ở trên khai const thì sẽ phát sinh lỗi 
    // [ Assignment to constant variable.]
    // todos = todos.filter(item => item.id !== id);

    // Dùng cách gián tiếp
    let currentTodo = todos;
    currentTodo = currentTodo.filter(item => item.id !== id);
    setTodos(currentTodo);
  }

  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='container'>
          <div className='row justify-content-center py-5'>
            <div className='col-4'>
              <h3>-- Add New Todo --</h3>
              <input type="text"
                value={content}
                className="form-control"
                onChange={(e) => handleOnChangeInput(e)} />
              <button
                className='btn btn-sm bg-gradient bg-success text-white w-100'
                onClick={(e) => handleAddNewTodo()}
              >
                Add
              </button>
            </div>
          </div>
          <Todo todos={todos}
                title={'All Todo'}
                deleteDataTodo={deleteDataTodo}
          />
          {/** Reusing Component By Filter Data **/}
          <Todo todos={todos.filter(todo => todo.type === 'Jason')}
                title={`Jason's Todo`}
                deleteDataTodo={deleteDataTodo}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
