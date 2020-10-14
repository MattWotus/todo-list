import React from 'react';

function AddButton(props) {
  return (
    <div className='row ml-1 mb-3'>
      <button onClick={() => props.removeClassNone()} type="button" className="btn btn-primary btn-lg"><i className="fas fa-plus mr-3"></i>Add Task</button>
    </div>
  );

}

export default AddButton;
