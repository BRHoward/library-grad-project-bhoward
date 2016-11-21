import {combineReducers} from 'redux';
import {
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
	REQUEST_RESERVATIONS,
	RECEIVE_RESERVATIONS} from '../actions/constants';

function books(state = {
	isFetching: false,
	items : []
}, action) {
	switch (action.type) {
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