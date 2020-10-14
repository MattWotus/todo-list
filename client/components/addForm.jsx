import React from 'react';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: '', date: '', isCompleted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.singleTodo.task !== prevProps.singleTodo.task) {
      this.setState({
        task: this.props.singleTodo.task,
        date: this.props.singleTodo.date,
        isCompleted: this.props.singleTodo.isCompleted
      });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      task: this.state.task,
      date: this.state.date,
      isCompleted: this.state.isCompleted
    };
    this.props.onSubmit(newTodo);
    this.handleReset();
  }

  handleUpdate(event) {
    event.preventDefault();
    const newTodo = {
      task: this.state.task,
      date: this.state.date,
      isCompleted: this.state.isCompleted
    };
    this.props.updateTodo(newTodo);
    this.handleReset();
  }

  handleReset() {
    this.setState({ task: '', date: '', isCompleted: false });
    event.target.reset();
    this.props.resetSingleTodo();
    const element = document.getElementById('modalOverlayOne');
    element.classList.add('d-none');
  }

  render() {
    const inputWidth = {
      maxWidth: '95%'
    };
    const buttonColor = {
      backgroundColor: 'rgba(108, 170, 243, 0.0)',
      color: 'rgb(108, 170, 243)'
    };
    if (this.props.singleTodo.task === '') {
      return (
        <div id="modalOverlayOne" className='addModalOverlay d-none'>
          <div className='addModalContent'>
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
              <div className='row'>
                <div className='col-12'>
                  <label htmlFor='todo' className='mt-3 mb-2'>Add a New Task</label>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center'>
                  <input required autoFocus type='text' id='todo' className='form-control mb-2' style={inputWidth} placeholder='Add New Task' name='task' defaultValue={this.props.singleTodo.task} onChange={this.handleChange} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <label htmlFor="date" className='mb-2'>Date</label>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center'>
                  <input required type="date" id="date" className="form-control mb-2" name="date" style={inputWidth} defaultValue={this.props.singleTodo.date} onChange={this.handleChange} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center mb-3'>
                  <button type="submit" className="btn btn-primary pl-3 pr-3 mr-2">Add</button>
                  <button type="reset" className="btn btn-primary pl-3 pr-3" style={buttonColor}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div id="modalOverlayOne" className='addModalOverlay d-none'>
          <div className='addModalContent'>
            <form onSubmit={this.handleUpdate} onReset={this.handleReset}>
              <div className='row'>
                <div className='col-12'>
                  <label htmlFor='todo' className='mt-3 mb-2'>Add a New Task</label>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center'>
                  <input autoFocus type='text' id='todo' className='form-control mb-2' style={inputWidth} placeholder='Add New Task' name='task' defaultValue={this.props.singleTodo.task} onChange={this.handleChange} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <label htmlFor="date" className='mb-2'>Date</label>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center'>
                  <input type="date" id="date" className="form-control mb-2" name="date" style={inputWidth} defaultValue={this.props.singleTodo.date} onChange={this.handleChange} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center mb-3'>
                  <button type="submit" className="btn btn-primary pl-3 pr-3 mr-2">Update</button>
                  <button type="reset" className="btn btn-primary pl-3 pr-3" style={buttonColor}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AddForm;
