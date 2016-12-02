import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import ReservationList from '../../components/ReservationList';
import ReservationListItem from '../../components/ReservationListItem';

describe("<ReservationList/>", () => {

	const testReservations = [
		{
			id : 0,
			bookId : 5,
			startDate : "01-01-2001",
			endDate  : "02-01-2001"
		},
		{
			id : 1,
			bookId : 7,
			startDate : "01-01-2001",
			endDate  : "02-01-2001"
		}
	]

	it('renders without crashing', () => {
	  	shallow(<ReservationList 
	  		reservations={testReservations}/>);
	});

	it('renders a <ul/>', () => {
	  	const reservationList = shallow(<ReservationList 
	  		reservations={testReservations}/>);
		expect(reservationList.find('ul').length).toBe(1);
	});

	it('renders the correct amount of <ReservationListItem/>s', () => {
	  	const reservationList = shallow(<ReservationList 
	  		reservations={testReservations}/>);
		expect(reservationList.find(ReservationListItem).length).toBe(2);
	});

});