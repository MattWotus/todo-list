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
      todos: []
    };
    this.setView = this.setView.bind(this);
    this.getAllTodos = this.getAllTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  setView(name) {
    this.setState({ view: name });
  }

  componentDidMount() {
    this.getAllTodos();
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

  render() {
    if (this.state.view === 'list') {
      return (
        <div className='container'>
          <Header />
          <AddButton setView={this.setView} />
          <TodoList todos={this.state.todos} onDelete={this.deleteTodo} onComplete={this.completeTodo} />
        </div>
      );
    } else if (this.state.view === 'addForm') {
      return (
        <div className='container'>
          <Header />
          <AddButton setView={this.setView} />
          <AddForm setView={this.setView} onSubmit={this.addTodo} />
          <TodoList todos={this.state.todos} onDelete={this.deleteTodo} onComplete={this.completeTodo} />
        </div>
      );
    }
  }
}

export default App;
