import React, { Component } from 'react';
import BookListContainer from '../containers/BookListContainer';
import ReservationListContainer from '../containers/ReservationListContainer';

class App extends Component {
    constructor(props) {
        super(props);
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
        //this.getBooks();
        //this.getReservations();
    }

    render() {
        return ( 
            <div>
            <BookListContainer/>
            <ReservationListContainer/>
            </div>
        )
    }
}

export default App;