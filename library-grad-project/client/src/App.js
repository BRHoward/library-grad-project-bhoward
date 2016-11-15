import React, { Component } from 'react';
import BookList from './BookList';
import ReservationList from './ReservationList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books : [],
      reservations : []
    }
  }
  componentDidMount() {
    fetch('/api/books')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          books : data
        })
      });
    fetch('/api/reservations')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          reservations : data
        })
      });
  }
  render() {
    return (
      <div>
        <BookList books={this.state.books}/>
        <ReservationList reservations={this.state.reservations}/>
      </div>
    );
  }
}

export default App;
