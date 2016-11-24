import * as actions from '../../actions/actions';
import * as types from '../../actions/constants';


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


describe("Synchronous reservation actions", () => {

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
		expect(actions.receiveBooks([testBook1,testBook2])).toEqual(expectedAction);
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
		expect(actions.receiveReservations([testReservation1,testReservation2])).toEqual(expectedAction);
	});
});