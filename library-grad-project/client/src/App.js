import React, { Component } from 'react';
import BookList from './BookList';
import ReservationList from './ReservationList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      reservations : []
    }

    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }
  getBooks() {
    fetch('/api/books')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          books : data
        })
    });
  }
  getReservations() {
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

  addBook(book) {
    fetch('/api/books', {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/JSON'
        }),
        body : JSON.stringify(book)
    })
        .then((response) => {
            this.getBooks();
        });
  }

  deleteBook(id) {
    fetch('api/books/' + id, {
        method : "DELETE"
    })
        .then ((response) => {
            this.getBooks();
        })
  }

  componentDidMount() {
    this.getBooks();
    this.getReservations();
  }
  
  render() {
    return (
      <div>
        <BookList books={this.state.books} addBook={this.addBook} deleteBook={this.deleteBook}/>
        <ReservationList reservations={this.state.reservations}/>
      </div>
    );
  }
}

export default App;
