import {combineReducers} from 'redux';
import {
	ADD_BOOK, 
	DELETE_BOOK,
	UPDATE_BOOK,
	ADD_RESERVATION, 
	DELETE_RESERVATION,
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
	REQUEST_RESERVATIONS,
	RECEIVE_RESERVATIONS} from '../actions/constants';

function books(state = {
	isFetching: false,
	items : []
}, action) {
	switch (action.type) {
		case ADD_BOOK :
			return [
				...state,
				{
					Id : action.payload.id,
					title : action.payload.book.title,
					author : action.payload.book.author,
					publishDate : action.payload.book.publishDate,
					isbn : action.payload.book.isbn
				}
			]
		case DELETE_BOOK :
			const bookToDeleteIdx = state.findIndex(book => book.Id === action.payload.id);
			return [
				...state.slice(0,bookToDeleteIdx),
				...state.slice(bookToDeleteIdx+1)
			]
		case UPDATE_BOOK : 
			const bookToUpdateIdx = state.findIndex(book => book.Id === action.payload.id);
			return [
				...state.slice(0,bookToUpdateIdx),
				Object.assign({}, action.payload.book, {
					Id : state[bookToUpdateIdx].Id
				}),
				...state.slice(bookToUpdateIdx+1)
			] 
		case REQUEST_BOOKS :
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_BOOKS :
			return Object.assign({}, state, {
				isFetching: false,
				items : action.payload.books,
				lastUpdated : action.receivedAt
			})
		default :
			return state
	}
}

function reservations(state = {
		isFetching : false,
		items : []
}, action) {
	switch (action.type) {
		case ADD_RESERVATION :
			return [
				...state,
				{
					Id: action.payload.id,
					bookId : action.payload.reservation.bookId,
					startDate : action.payload.reservation.startDate,
					endDate : action.payload.reservation.endDate
				}
			]
		case DELETE_RESERVATION :
			const reservationToDeleteIdx = state.findIndex(reservation => reservation.Id === action.payload.id);
			return [
				...state.slice(0,reservationToDeleteIdx),
				...state.slice(reservationToDeleteIdx+1)
			]
		case REQUEST_RESERVATIONS :
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_RESERVATIONS :
			return Object.assign({}, state, {
				isFetching: false,
				items : action.payload.reservations,
				lastUpdated : action.receivedAt
			})
		default :
			return state
	}
}

const libraryApp = combineReducers({
	books: books,
	reservations : reservations,
})

export default libraryApp;