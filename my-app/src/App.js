import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
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

  const handleAddNewTodo = (e) => {
    // HOOK NOT MERGE STATE
    // Spread Operator ...
    if (!content) {
      alert('Title is required !')
      return;
    }
    let newTodo = { id: '', title: content, type: 'Jason' }
    setTodos([...todos, newTodo]) // Cộng gộp state mới và state cũ
    setContent('');
  }

  const handleOnChangeInput = (e) => {
    setContent(e.target.value)
    // console.log(e.target.value);
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
          />
          <Todo todos={todos.filter(todo => todo.type === 'Jason')}
                title={`Jason's Todo`}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
