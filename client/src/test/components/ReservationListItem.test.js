import React from 'react';
import {shallow, mount} from 'enzyme';
import ReservationListItem from '../../components/ReservationListItem';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';

describe ('<ReservationListItem/>', () => {

	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	const testReservation = {
		bookId : 5,
		startDate : "01-01-2001 00:00:00",
		endDate : "01-03-2001 00:00:00"
	}

	it('renders without crashing', () => {
	  	shallow(<ReservationListItem 
	  		reservation={testReservation}/>);
	});

	it('renders a list item', () => {
	  	const reservationListItem = shallow(<ReservationListItem 
	  		reservation={testReservation}/>);
	  	expect(reservationListItem.find('li').length).toBe(1);
	});

	it('renders a flat button', () => {
	  	const reservationListItem = shallow(<ReservationListItem 
	  		reservation={testReservation}/>);
	  	expect(reservationListItem.find(FlatButton).length).toBe(1);
	});

	it('renders a list item with correct text', () => {
	  	const reservationListItem = shallow(<ReservationListItem 
	  		reservation={testReservation}/>);
	  	expect(reservationListItem.find('li').text()).toMatch(/Mon Jan 01 2001 - Wed Jan 03 2001/);
	});

	it('clicking the delete button calls the delete prop', () => {
		const reservationListItem = mount(<ReservationListItem 
	  		reservation={testReservation}
	  		deleteReservation={sinon.spy()}/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  	});
		reservationListItem.find(FlatButton).simulate('click');
		expect(reservationListItem.props().deleteReservation.calledOnce).toBe(true);
	});
});