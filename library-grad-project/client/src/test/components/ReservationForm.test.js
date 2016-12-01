import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {shallow, mount} from 'enzyme';
import ReservationForm from '../../components/ReservationForm';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe('<ReservationForm />', () => {

	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	const testBook = {
		id : 0,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN"
	}

	const testReservationsItems = [
		{
			id : 0,
			bookId : 5,
			startDate : "01-01-2001",
			endDate  : "01-03-2001"
		},
		{
			id : 1,
			bookId : 6,
			startDate : "01-01-2001",
			endDate  : "01-03-2001"
		}
	]

	const testReservations = {
		isFetching :false,
		items : testReservationsItems
	}


	it('renders without crashing', () => {
	  	shallow(<ReservationForm
	  		open={true}/>);
	});

	it('renders a <Dialog/>', () => {
	  	const reservationForm = shallow(<ReservationForm
	  		open={true}/>);
		expect(reservationForm.find(Dialog).length).toBe(1);
	});

	it('renders two <DatePicker/>s', () => {
	  	const reservationForm = shallow(<ReservationForm
	  		open={true}/>);
		expect(reservationForm.find(DatePicker).length).toBe(2);
	});

	it('correctly sets state based on props', () => {
	  	const reservationForm = shallow(<ReservationForm
	  		open={true}
	  		bookId={2}/>);
	  	expect(reservationForm.state().bookId).toBe(2);
	  	expect(reservationForm.state().startDate).toBe("");
	  	expect(reservationForm.state().endDate).toBe("");
	  	expect(reservationForm.state().invalidInput).toBe(false);
	});

	it('handleSubmit calls correct callback and resets the state', ()=> {
		const reservationForm = mount(
		  		<ReservationForm 
		  		open={true} 
		  		bookId={0}
		  		onSubmit={sinon.spy()}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		const datesToSet = {
			startDate : new Date("01-01-2001"),
			endDate : new Date("01-02-2001")
		}

		reservationForm.setState(datesToSet);
		expect(reservationForm.props().onSubmit.calledOnce).toBe(false);
	  	reservationForm.instance().handleSubmit({
	  		preventDefault : () => {}
	  	});
	  	expect(reservationForm.props().onSubmit.calledWith({
	  		bookId: 0,
	  		startDate: datesToSet.startDate,
	  		endDate: datesToSet.endDate,
	  		invalidInput: false
	  	})).toBe(true);
	  	expect(reservationForm.state().startDate).toBe("");
	  	expect(reservationForm.state().endDate).toBe("");
	});

	it('handleStartDateChange only sets the correct state field', ()=> {
		const reservationForm = mount(
		  		<ReservationForm 
		  			open={true} 
		  			bookId={0}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(reservationForm.state().startDate).toBe("");
	  	reservationForm.instance().handleStartDateChange({
	  		target: {
	  			id : "author",
	  			value : "new author"
	  		}
	  	},
	  	"01-01-2001");
	  	expect(reservationForm.state().startDate).toBe("01-01-2001");
	});

	it('handleEndDateChange only sets the correct state field', ()=> {
		const reservationForm = mount(
		  		<ReservationForm 
		  			open={true} 
		  			bookId={0}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(reservationForm.state().endDate).toBe("");
	  	reservationForm.instance().handleEndDateChange({
	  		target: {
	  			id : "author",
	  			value : "new author"
	  		}
	  	},
	  	"01-02-2001");
	  	expect(reservationForm.state().endDate).toBe("01-02-2001");
	});

	it('invalid date returns true if already reserved at that time', () => {
		const reservationForm = mount(
		  		<ReservationForm 
		  			open={true} 
		  			bookId={5}
		  			toggle={sinon.spy()}
		  			reservations={testReservations}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);

	  	expect(reservationForm.instance().invalidDate(new Date("01-02-2001"))).toBe(true);
		expect(reservationForm.instance().invalidDate(new Date("01-05-2001"))).toBe(false);
	});


	it('handleClose calls the correct callback', () => {
		const reservationForm = mount(
		  		<ReservationForm 
		  			open={true} 
		  			bookId={5}
		  			toggle={sinon.spy()}
		  			reservations={testReservations}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		expect(reservationForm.props().toggle.calledOnce).toBe(false);
	  	reservationForm.instance().handleClose();
		expect(reservationForm.props().toggle.calledOnce).toBe(true);
	});


})