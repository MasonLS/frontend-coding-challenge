import React, { PropTypes } from 'react';

const Event = ({
  event
}) => (
  <div className="panel panel-primary">
    <div className="panel-heading">
    <h2>{event.title} <a href={event.url} className="btn btn-default btn-md" role="button">Link to event</a></h2>
    </div>
    <div className="panel-body">
    <p>{event.description}</p>
    <p>{event.start_time}</p>
    </div>
  </div>
)

Event.propTypes = {
  event: PropTypes.object.isRequired
};

export default Event;
