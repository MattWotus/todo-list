import React from 'react';
import Header from './header';
import AddButton from './addButton';
import AddForm from './addForm';
import TodoList from './todoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'list',
      todos: [],
      singleTodo:
      {
        task: '',
        date: '',
        isCompleted: false,
        id: ''
      }
    };
    this.removeClassNoneOne = this.removeClassNoneOne.bind(this);
    this.getAllTodos = this.getAllTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.getSingleTodo = this.getSingleTodo.bind(this);
    this.resetSingleTodo = this.resetSingleTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.getAllTodos();
  }

  removeClassNoneOne() {
    const element = document.getElementById('modalOverlayOne');
    element.classList.remove('d-none');
  }

  getAllTodos() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  addTodo(newTodo) {
    const newArray = this.state.todos.slice(0, this.state.todos.length);
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        newArray.push(data);
      })
      .then(() => this.setState({ todos: newArray }));
  }

  deleteTodo(id) {
    const newArray = this.state.todos.slice(0, this.state.todos.length);
    const updatedTodos = [];
    fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        for (let i = 0; i < newArray.length; i++) {
          const todo = { ...newArray[i] };
          if (todo.id !== id) {
            updatedTodos.push(todo);
          }
        }
      })
      .then(() => this.setState({ todos: updatedTodos }));
  }

  completeTodo(id) {
    const newObj = {};
    const newArray = this.state.todos.slice(0, this.state.todos.length);
    const updatedTodos = [];
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === id) {
        if (newArray[i].isCompleted === true) {
          newObj.isCompleted = false;
        } else if (newArray[i].isCompleted === false) {
          newObj.isCompleted = true;
        }
      }
    }
    fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        for (let i = 0; i < newArray.length; i++) {
          const todo = { ...newArray[i] };
          if (todo.id === id) {
            todo.isCompleted = data.isCompleted;
          }
          updatedTodos.push(todo);
        }
      })
      .then(() => this.setState({ todos: updatedTodos }));
  }

  getSingleTodo(id) {
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].id === id) {
        this.setState({
          singleTodo: {
            task: this.state.todos[i].task,
            date: this.state.todos[i].date,
            isCompleted: this.state.todos[i].isCompleted,
            id: id
          }
        });
      }
    }
    this.removeClassNoneOne();
  }

  resetSingleTodo() {
    this.setState({
      singleTodo:
      {
        task: '',
        date: '',
        isCompleted: '',
        id: ''
      }
    });
  }

  updateTodo(newTodo) {
    const updatedTodos = [];
    const newArray = this.state.todos.slice(0, this.state.todos.length);
    fetch(`/api/todos/${this.state.singleTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        for (let i = 0; i < newArray.length; i++) {
          let todo = { ...newArray[i] };
          if (data.id === newArray[i].id) {
            todo = data;
          }
          updatedTodos.push(todo);
        }
      })
      .then(() => this.setState({
        todos: updatedTodos,
        singleTodo:
        {
          task: '',
          date: '',
          isCompleted: '',
          id: ''
        }
      }));
  }

  render() {
    if (this.state.view === 'list') {
      return (
        <div className='container'>
          <Header />
          <AddButton removeClassNone={this.removeClassNoneOne} />
          <AddForm onSubmit={this.addTodo} singleTodo={this.state.singleTodo} resetSingleTodo={this.resetSingleTodo} updateTodo={this.updateTodo} />
          <TodoList todos={this.state.todos} onDelete={this.deleteTodo} onComplete={this.completeTodo} onUpdate={this.getSingleTodo} />
        </div>
      );
    } else if (this.state.view === 'addForm') {
      return (
        <div className='container'>
          <Header />
          <AddButton />
          <AddForm onSubmit={this.addTodo} singleTodo={this.state.singleTodo} resetSingleTodo={this.resetSingleTodo} updateTodo={this.updateTodo} />
          <TodoList todos={this.state.todos} onDelete={this.deleteTodo} onComplete={this.completeTodo} />
        </div>
      );
    }
  }
}

export default App;
