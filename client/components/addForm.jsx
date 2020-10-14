import React from 'react';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: '', date: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
      isCompleted: false
    };
    this.props.onSubmit(newTodo);
    this.handleReset();
  }

  handleReset() {
    this.setState({ task: '', date: '' });
    this.props.setView('list');
  }

  render() {
    const value = this.state.task;
    const date = this.state.date;
    const inputWidth = {
      maxWidth: '95%'
    };
    return (
      <div className='addModalOverlay'>
        <div className='addModalContent'>
          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <div className='row'>
              <div className='col-12'>
                <label htmlFor='todo' className='mt-3 mb-2'>Add a New Task</label>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <input required autoFocus type='text' id='todo' className='form-control mb-2' style={inputWidth} placeholder='Add New Task' name='task' defaultValue={value} onChange={this.handleChange} />
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <label htmlFor="date" className='mb-2'>Date</label>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <input required type="date" id="date" className="form-control mb-2" name="date" aria-label="date"
                  aria-describedby="basic-addon1" style={inputWidth} value={date} onChange={this.handleChange} />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center mb-3'>
                <button type="submit" className="btn btn-primary pl-3 pr-3 mr-2">Add</button>
                <button type="reset" className="btn btn-outline-secondary pl-3 pr-3">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddForm;
