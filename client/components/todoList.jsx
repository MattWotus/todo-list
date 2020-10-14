import React from 'react';

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Todo(props) {
  const task = props.task;
  const date = props.date;
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const day = newDate.getUTCDate();
  const month = monthNames[newDate.getUTCMonth()];
  const formattedDate = month + ' ' + day + ',' + ' ' + year;
  if (props.isCompleted === false) {
    return (
      <li className="list-group-item d-flex justify-content-between mb-2">
        <div className='d-flex align-items-center'>
          <i onClick={() => props.completeTodo(props.id)} className="far fa-check-circle fa-2x mr-3"></i>
          {task}
        </div>
        <div className='d-flex align-items-center'>
          {formattedDate}
          <i className="fas fa-sort fa-2x ml-3"></i>
          <i onClick={() => props.updateTodo(props.id)} className="far fa-edit fa-2x ml-3"></i>
          <i onClick={() => props.deleteTodo(props.id)} className="fas fa-times fa-2x ml-3"></i>
        </div>
      </li>
    );
  } else {
    return (
      <li className="list-group-item d-flex justify-content-between mb-2 green">
        <div className='d-flex align-items-center'>
          <i onClick={() => props.completeTodo(props.id)} className="far fa-check-circle fullOpacity fa-2x mr-3"></i>
          {task}
        </div>
        <div className='d-flex align-items-center'>
          {formattedDate}
          <i className="fas fa-sort fa-2x ml-3"></i>
          <i onClick={() => props.updateTodo(props.id)} className="far fa-edit fa-2x ml-3"></i>
          <i onClick={() => props.deleteTodo(props.id)} className="fas fa-times fa-2x ml-3"></i>
        </div>
      </li>
    );
  }
}

function TodoList(props) {
  if (props.todos.length === 0) {
    return (
      <h3>No Tasks</h3>
    );
  } else {
    return (
      <ul className='list-group'>
        {
          props.todos.map(todo => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                date={todo.date}
                isCompleted={todo.isCompleted}
                deleteTodo={props.onDelete}
                completeTodo={props.onComplete}
                updateTodo={props.onUpdate} />
            );
          })
        }
      </ul>
    );
  }
}

export default TodoList;
