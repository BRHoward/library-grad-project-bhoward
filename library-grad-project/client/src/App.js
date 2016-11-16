import React, { Component } from 'react';
import BookList from './BookList';
import ReservationList from './ReservationList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            reservations: []
        }

        this.addBook = this.addBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.addReservation = this.addReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.updateReservation = this.updateReservation.bind(this);

    }

    getBooks() {
        fetch('/api/books')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    books: data
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
                    reservations: data
                })
            });
    }

    addBook(book) {
        fetch('/api/books', {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(book)
            })
            .then((response) => {
                this.getBooks();
            });
    }

    deleteBook(id) {
        fetch('api/books/' + id, {
                method: "DELETE"
            })
            .then((response) => {
                this.getBooks();
            })
    }

    updateBook(id, book) {
        fetch('api/books/' + id, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(book)
            })
            .then((response) => {
                this.getBooks();
            })
    }

    addReservation(reservation) {
        fetch('/api/reservations', {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(reservation)
            })
            .then((response) => {
                this.getReservations();
            });
    }

    deleteReservation(id) {
        fetch('api/reservations/' + id, {
                method: "DELETE"
            })
            .then((response) => {
                this.getReservations();
            })
    }

    updateReservation(id, reservation) {
        fetch('api/reservations/' + id, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(reservation)
            })
            .then((response) => {
                this.getReservations();
            })
    }

    componentDidMount() {
        this.getBooks();
        this.getReservations();
    }


    render() {
        return ( 
            <div>
            <BookList 
            books={this.state.books}
            addBook={this.addBook}
            deleteBook={this.deleteBook}
            updateBook={this.updateBook}
            addReservation={this.addReservation}/> 

            <ReservationList reservations={this.state.reservations}/> 
            </div>
        );
    }
}

export default App;