import {
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    REQUEST_RESERVATIONS,
    RECEIVE_RESERVATIONS} from './constants';

export const requestBooks = () => ({
    type: REQUEST_BOOKS 
})

export const receiveBooks = (json) => ({
    type: RECEIVE_BOOKS,
    payload : {
        books : json.map(child => JSON.parse(JSON.stringify(child)))
    },
    receivedAt: Date.now()
})

export const fetchBooks = () => {
    return function (dispatch) {
        dispatch(requestBooks())
        return fetch('/api/books')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch(receiveBooks(data));
            });
        }
    }

export const addBook = (book) => {
    return function(dispatch) {
        return fetch('/api/books', {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(book)
            })
            .then((response) => {
                dispatch(fetchBooks());
            });
        }
    }

export const deleteBook = (id) => {
    return function(dispatch) {
        return fetch('/api/books/' + id, {
                method: "DELETE"
            })
            .then((response) => {
                dispatch(fetchBooks());
            });
        }
    }

export const updateBook = (id, book) => {
    return function(dispatch) {
        return fetch('/api/books/' + id, {
                method: "PUT",
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(book)
            })
            .then((response) => {
                dispatch(fetchBooks());
            });
        }
    }


export const requestReservations = () => ({
    type: REQUEST_RESERVATIONS
})

export const receiveReservations = (json) => ({
    type: RECEIVE_RESERVATIONS,
    payload : {
        reservations : json.map(child => JSON.parse(JSON.stringify(child)))
    },
    receivedAt: Date.now()
})


export const fetchReservations = () => {
    return function (dispatch) {
        dispatch(requestBooks())
        return fetch('/api/reservations')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch(receiveReservations(data));
            });
        }
    }

export const addReservation = (reservation) => {
    return function(dispatch) {
        return fetch('/api/reservations', {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/JSON'
                }),
                body: JSON.stringify(reservation)
            })
            .then((response) => {
                if(response.ok) {
                    dispatch(fetchReservations());
                } else {
                    response.json().then((json) => {
                        console.log(json.Message);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

export const deleteReservation = (id) => {
    return function(dispatch) {
        return fetch('/api/reservations/' + id, {
                method: "DELETE"
            })
            .then((response) => {
                dispatch(fetchReservations());
            });
        }
    }
