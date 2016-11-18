import {
	ADD_BOOK, 
	DELETE_BOOK,
	UPDATE_BOOK,
	ADD_RESERVATION, 
	DELETE_RESERVATION} from './constants';

let nextBookId = 0
export const addBook = (book) => ({
    type: ADD_BOOK,
    payload : {
    	id : nextBookId++,
    	book : book
    }
})

export const deleteBook = (id) => ({
	type: DELETE_BOOK,
	payload : {
		id : id
	}
})

export const updateBook = (id, book) => ({
	type: UPDATE_BOOK,
	payload : {
		id : id,
		book : book
	}
});

let nextReservationId = 0;
export const addReservation = (reservation) => ({
  type: ADD_RESERVATION,
  payload : {
  	id : nextReservationId++,
  	reservation : reservation
  }
})

export const deleteReservation = (id) => ({
	type: DELETE_RESERVATION,
	payload : {
		id : id
	}
}) 