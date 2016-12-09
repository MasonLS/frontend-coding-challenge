import React, { Component } from 'react';
import Search from './components/search';
import EventForm from './components/event-form';
import EventList from './components/event-list';


const headers = new Headers();
headers.append('Authorization', 'Token 7761e7e3b25a1d6d315901fcd7180d971f77ea2e');

const init = {
  method: 'GET',
  headers
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      sortBy: 'time',
      searchTitle: ''
    };
  }

  componentDidMount() {
    fetch('https://api.eventable.com/v1/events/', init)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ events: responseData.results });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  setSearchTitle(searchTitle) {
    this.setState({ searchTitle: searchTitle });
  }

  setSortBy(sortBy) {
    this.setState({ sortBy: sortBy });
  }

  addEvent(eventObj) {
    let newEvents = this.state.events.slice();
    newEvents.push(eventObj);

    this.setState({ events: newEvents });
  }

  render() {

    let filteredEvents = this.state.events.filter(event => {
      return filterByTitle(event, this.state.searchTitle);
    });

    console.log(this.state);

    filteredEvents = sortEventsBy(filteredEvents, this.state.sortBy);

    return (
      <div className="App container">
        <EventForm addEvent={this.addEvent.bind(this)} />
        <Search setSearchTitle={this.setSearchTitle.bind(this)} setSortBy={this.setSortBy.bind(this)} />
        <EventList events={filteredEvents} />
      </div>
    );
  }
}

export default App;


//non-destructive sorting/filtering helper functions

function sortByTitle(events) {
  return events.slice().sort((eA, eB) => {
    const titleA = eA.title.toUpperCase();
    const titleB = eB.title.toUpperCase();

    let index = 0;
    while (titleA.charCodeAt(index) - titleB.charCodeAt(index) === 0) {
      index++;
    }
    return titleA.charCodeAt(index) - titleB.charCodeAt(index);
  });
}

function sortByTime(events) {
  return events.slice().sort((eA, eB) => {
    return Date.parse(eA.start_time) - Date.parse(eB.start_time);
  });
}

function sortEventsBy(events, sortBy) {
  let sortedEvents;

  if (sortBy === 'time') {
    sortedEvents = sortByTime(events);
  }

  if (sortBy === 'title') {
    sortedEvents = sortByTitle(events);
  }

  return sortedEvents;
}

function filterByTitle(event, searchTitle) {
  if (searchTitle === '') {
    return true;
  };

  const searchTitleWords = searchTitle.toLowerCase().split(' ');
  const eventTitleWords = event.title.toLowerCase().split(' ');

  return eventTitleWords.some(word => {
    return searchTitleWords.indexOf(word) >= 0;
  });
}
