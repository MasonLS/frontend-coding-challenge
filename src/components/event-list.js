import React, { Component, PropTypes } from 'react';
import Event from './event';

class EventList extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
        { this.props.events.map(event => <Event event={event} key={event.id} />) }
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default EventList;
