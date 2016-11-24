import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import ReservationSelector from '../../components/ReservationSelector';
import SelectField from 'material-ui/SelectField';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe('<ReservationSelector />', () => {

	const testBook = {
		Id : 1,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN"
	}

	const testReservation1 = {
		Id : 0,
		bookId : 5,
		startDate : "01-01-2001 00:00:00",
		endDate : "01-03-2001 00:00:00"
	}

	const testReservation2 = {
		Id : 0,
		bookId : 1,
		startDate : "01-03-2001 00:00:00",
		endDate : "01-05-2001 00:00:00"
	}


	const testBooks = {
		isFetching : false,
		items: [testBook]
	};
	const testReservations = {
		isFetching : false,
		items : [testReservation1, testReservation2]
	};


	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	it('renders without crashing', () => {
	  	shallow(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		/>);
	});

	it('renders a <SelectField/>', () => {
	  	const reservationSelector = shallow(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		/>);
		expect(reservationSelector.find(SelectField).length).toBe(1);
	});


	it('correctly sets initial state', () => {
	  	const reservationSelector = shallow(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		/>);
	  	expect(reservationSelector.state().selectedBook).toBe(null);
	});

	it('getRelevantReservations gets the right reservations', ()=> {
	  	const reservationSelector = mount(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		fetchReservations={()=>{}}
	  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		expect(reservationSelector.instance().getRelevantReservations(5)).toEqual([testReservation1])
	});

	it('handleChange sets the correct state field', ()=> {
	  	const reservationSelector = mount(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		fetchReservations={()=>{}}
	  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(reservationSelector.state().selectedBook).toBe(null);
	  	reservationSelector.instance().handleChange({
	  		target: {
	  			id : "author",
	  			value : "new author"
	  		}},
	  		null,
	  		5
	  	);
	  	expect(reservationSelector.state().selectedBook).toBe(5);
	});

	it('calls componentDidMount on render', () => {
		var funcSpy = sinon.spy(ReservationSelector.prototype, 'componentDidMount'); 
	  	const reservationSelector = mount(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		fetchReservations={()=>{}}
	  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(funcSpy.calledOnce).toEqual(true);

	});

	it('calls fetchReservations on render', () => {
	  	const reservationSelector = mount(<ReservationSelector
	  		books={testBooks}
	  		reservations={testReservations}
	  		fetchReservations={sinon.spy()}
	  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(reservationSelector.props().fetchReservations.calledOnce).toEqual(true);

	});
})