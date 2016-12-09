import React, { Component, PropTypes } from 'react';

function BlankEvent () {
  this.title = 'Your event\'s title',
  this.start_time = 'ex. 2016-12-31T23:30',
  this.end_time = 'ex. 2016-12-31T23:30'
}

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
      event: new BlankEvent()
    }
  }

  handleChange(updatedField) {
    this.setState({
      event: Object.assign(this.state.event, updatedField)
    });
  }

  handleSubmit() {
    if (this.state.event.title === '' || this.state.event.title === 'Your event\'s title') {
      return;
    }

    if (Date.parse(this.state.event.start_time) > Date.parse(this.state.event.end_time)) {
      return;
    }
    this.props.addEvent(this.state.event);
    this.setState({ event: new BlankEvent() });
  }

  render() {
    return (
      <div className="row">
        <div className="panel panel-default">
            <form className="form-inline">
              <div className="form-group panel-body">
                <label className="control-label">Title</label>
                <input type="text" className="form-control" onChange={(e) => this.handleChange({ title: e.target.value })} value={this.state.event.title} />
              </div>
              <div className="form-group panel-body">
                <label className="control-label">Start date-time</label>
                <input type="text" className="form-control" onChange={(e) => this.handleChange({ start_time: e.target.value })} value={this.state.event.start_time} />
              </div>
              <div className="form-group panel-body">
                <label className="control-label">End date-time</label>
                <input type="text" className="form-control" onChange={(e) => this.handleChange({ end_time: e.target.value })} value={this.state.event.end_time} />
              </div>
            </form>
            <div className="panel-body">
              <button className="btn btn-default" onClick={this.handleSubmit.bind(this)}>+ Add event</button>
            </div>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
}

export default EventForm;
