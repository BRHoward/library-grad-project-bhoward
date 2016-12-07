import {combineReducers} from 'redux';
import {
    REQUEST_BOOKS,
    RECEIVE_BOOKS} from '../actions/constants';

export function books(state = {
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

const libraryApp = combineReducers({
	books: books,
});

export default libraryApp;