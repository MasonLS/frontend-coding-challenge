import React, { Component, PropTypes } from 'react';

class Search extends Component {

  constructor() {
    super();
    this.state = {
      searchTitle: ''
    }
  }

  handleTitleChange(newSearchTitle) {
    this.setState({ searchTitle: newSearchTitle });
  }

  render() {
    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="col-lg-6 panel-body">
            <div className="input-group">
            <input type="text" className="form-control" placeholder="Search events..." onChange={(e) => this.handleTitleChange(e.target.value)} value={this.state.searchTitle} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={() => this.props.setSearchTitle(this.state.searchTitle)}>Search</button>
            </span>
            </div>
          </div>
          <div className="col-lg-4 panel-body">
            <div className="input-group">
              <div className="row">
                <div className="col-lg-4">
                  <label>Sort by</label>
                </div>
                <div className="col-lg-8">
                  <select className="form-control" defaultValue={'time'} onChange={(e) => this.props.setSortBy(e.target.value)}>
                    <option value={'time'}>Start time</option>
                    <option value={'title'}>Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  setSearchTitle: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default Search;
