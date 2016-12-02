import {books, reservations} from '../../reducers/reducers';
import * as types from '../../actions/constants';


const testBook1 = {
	id : 1,
	title : "Test Book",
	author : "Test Author",
	publishDate : "Test Date",
	isbn : "Test ISBN"
}

const testBook2 = {
	id : 2,
	title : "Test Book 2",
	author : "Test Author 2",
	publishDate : "Test Date 2",
	isbn : "Test ISBN 2"
}

const testReservation1 = {
	id : 0,
	bookId : 5,
	startDate : "01-01-2001",
	endDate  : "01-02-2001"
}
const testReservation2 = {
	id : 1,
	bookId : 6,
	startDate : "01-05-2001",
	endDate  : "01-06-2001"
}

describe('book reducer', () => {
	it('should return the initial state if no action', () => {
		expect (
			books(undefined, {})
			).toEqual({
				isFetching :false,
				items:[]
			});
	});
	it('should update flag on request books', () => {
		expect (
			books({
				isFetching : false,
				items : [testBook1, testBook2]
			}, {
				type : types.REQUEST_BOOKS
			})
			).toEqual({
				isFetching :true,
				items:[testBook1, testBook2]
			});
	});
	it('should update flag and books on recieve books', () => {
		expect (
			books({
				isFetching : true,
				items : [testBook1]
			}, {
				type : types.RECEIVE_BOOKS,
				payload : {
					books : [testBook2]
				},
				receivedAt : new Date("01-01-2001")
			})
			).toEqual({
				isFetching :false,
				items:[testBook2],
				lastUpdated : new Date("01-01-2001")
			});
	});
});

describe('reservation reducer', () => {
	it('should return the initial state if no action', () => {
		expect (
			reservations(undefined, {})
			).toEqual({
				isFetching :false,
				items:[]
			});
	});
	it('should update flag on request reservations', () => {
		expect (
			reservations({
				isFetching : false,
				items : [testReservation1, testReservation2]
			}, {
				type : types.REQUEST_RESERVATIONS
			})
			).toEqual({
				isFetching :true,
				items:[testReservation1, testReservation2]
			});
	});
	it('should update flag and reservations on receive reservations', () => {
		expect (
			reservations({
				isFetching : true,
				items : [testReservation1]
			}, {
				type : types.RECEIVE_RESERVATIONS,
				payload : {
					reservations : [testReservation2]
				},
				receivedAt : new Date("01-01-2001")
			})
			).toEqual({
				isFetching :false,
				items:[testReservation2],
				lastUpdated : new Date("01-01-2001")
			});
	});
});