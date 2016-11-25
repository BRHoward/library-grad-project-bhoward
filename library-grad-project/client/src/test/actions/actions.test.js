import * as actions from '../../actions/actions';
import * as types from '../../actions/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testBook1 = {
	Id : 0,
	title : "Test Book",
	author : "Test Author",
	publishDate : "Test Date",
	isbn : "Test ISBN"
}

const testBook2 = {
	Id : 1,
	title : "Test Book 2",
	author : "Test Author 2",
	publishDate : "Test Date 2",
	isbn : "Test ISBN 2"
}

const testReservation1 = {
	Id : 0,
	bookId : 5,
	startDate : "01-01-2001",
	endDate  : "01-03-2001"
}
	
const testReservation2 = {
	Id : 1,
	bookId : 6,
	startDate : "01-01-2001",
	endDate  : "01-03-2001"
}


describe("Synchronous book actions", () => {

	it('should create an actions to request book', () => {
		const expectedAction = {
			type : types.REQUEST_BOOKS
		}
		expect(actions.requestBooks()).toEqual(expectedAction);
	});

	it('should create an action to recieve books', () => {
		const expectedAction = {
			type : types.RECEIVE_BOOKS,
			payload : {
				books : [
					testBook1,
					testBook2
				]
			},
			receivedAt : Date.now()
		}
		expect(actions.receiveBooks([testBook1,testBook2]).type).toEqual(expectedAction.type);
		expect(actions.receiveBooks([testBook1,testBook2]).payload).toEqual(expectedAction.payload);
	});
});

describe("Async book actions", () => {

	afterEach(() => {
		fetchMock.restore();
	});

	beforeEach(() => {
		fetchMock.get('/api/books', [testBook1, testBook2]);
	});

	it('creates a RECEIVE_BOOKS action when fetching books has been done', () => {
		
		const expectedActions = [
			{type : types.REQUEST_BOOKS},
   			{
   				type : types.RECEIVE_BOOKS, 
   				payload: {books:[testBook1, testBook2]},
   				receivedAt: Date.now()
  			}
		]

		const store = mockStore({});

		return store.dispatch(actions.fetchBooks())
			.then(() => {
				expect(store.getActions()[0]).toEqual(expectedActions[0]);
				expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
				expect(store.getActions()[1].payload).toEqual(expectedActions[1].payload);
			});
		});

	it('creates a REQUEST_BOOKS action when adding a book', () => {
		fetchMock.post('/api/books', {});

		const expectedActions = [
			{type : types.REQUEST_BOOKS},
		]

		const store = mockStore({});

		return store.dispatch(actions.addBook(testBook1))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});

	it('creates a REQUEST_BOOKS action when deleting a book', () => {
		fetchMock.delete('/api/books/0', {});

		const expectedActions = [
			{type : types.REQUEST_BOOKS},
		]

		const store = mockStore({});

		return store.dispatch(actions.deleteBook(0))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});

	it('creates a REQUEST_BOOKS action when updating a book', () => {
		fetchMock.put('/api/books/0', {});

		const expectedActions = [
			{type : types.REQUEST_BOOKS},
		]

		const store = mockStore({});

		return store.dispatch(actions.updateBook(0, testBook1))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});
});

describe("Synchronous reservation actions", () => {

	it('should create an actions to request reservation', () => {
		const expectedAction = {
			type : types.REQUEST_RESERVATIONS
		}
		expect(actions.requestReservations()).toEqual(expectedAction);
	});

	it('should create an action to recieve reservations', () => {
		const expectedAction = {
			type : types.RECEIVE_RESERVATIONS,
			payload : {
				reservations : [
					testReservation1,
					testReservation2
				]
			},
			receivedAt : Date.now()
		}
		expect(actions.receiveReservations([testReservation1,testReservation2]).type).toEqual(expectedAction.type);
		expect(actions.receiveReservations([testReservation1,testReservation2]).payload).toEqual(expectedAction.payload);
	});
});

describe("Async reservation actions", () => {

	afterEach(() => {
		fetchMock.restore();
	});

	beforeEach(() => {
		fetchMock.get('/api/reservations', [testReservation1, testReservation2]);
	});

	it('creates a RECEIVE_RESERVATIONS action when fetching reservations has been done', () => {
		const expectedActions = [
			{type : types.REQUEST_RESERVATIONS},
   			{
   				type : types.RECEIVE_RESERVATIONS, 
   				payload: {reservations:[testReservation1, testReservation2]},
   				receivedAt: Date.now()
  			}
		]

		const store = mockStore({});

		return store.dispatch(actions.fetchReservations())
			.then(() => {
				expect(store.getActions()[0]).toEqual(expectedActions[0]);
				expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
				expect(store.getActions()[1].payload).toEqual(expectedActions[1].payload);
			});
		});

	it('creates a REQUEST_RESERVATIONS action when adding a reservation', () => {
		fetchMock.post('/api/reservations', {});

		const expectedActions = [
			{type : types.REQUEST_RESERVATIONS},
		]

		const store = mockStore({});

		return store.dispatch(actions.addReservation(testReservation1))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});

	it('creates no actions when adding invalid reservation', () => {
		fetchMock.post('/api/reservations', 400);

		const expectedActions = [];

		const store = mockStore({});

		return store.dispatch(actions.addReservation(testReservation1))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});


	it('creates a REQUEST_RESERVATIONS action when deleting a reservation', () => {
		fetchMock.delete('/api/reservations/0', {});

		const expectedActions = [
			{type : types.REQUEST_RESERVATIONS},
		]

		const store = mockStore({});

		return store.dispatch(actions.deleteReservation(0))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			})
		});
});