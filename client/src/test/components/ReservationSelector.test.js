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
		id : 1,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN",
		reservations : [{
			id : 1,
			startDate : "01-01-2001 00:00:00",
			endDate : "01-03-2001 00:00:00"
		},{
			id : 2,
			startDate : "01-04-2001 00:00:00",
			endDate : "01-06-2001 00:00:00"
		}]
	}

	const testBooks = {
		isFetching : false,
		items: [testBook]
	};


	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	it('renders without crashing', () => {
	  	shallow(<ReservationSelector
	  		books={testBooks}
	  		/>);
	});

	it('renders a <SelectField/>', () => {
	  	const reservationSelector = shallow(<ReservationSelector
	  		books={testBooks}
	  		/>);
		expect(reservationSelector.find(SelectField).length).toBe(1);
	});


	it('correctly sets initial state', () => {
	  	const reservationSelector = shallow(<ReservationSelector
	  		books={testBooks}
	  		/>);
	  	expect(reservationSelector.state().selectedBook).toBe(null);
	});

	it('handleChange sets the correct state field', ()=> {
	  	const reservationSelector = mount(<ReservationSelector
	  		books={testBooks}
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
	  		1
	  	);
	  	expect(reservationSelector.state().selectedBook).toBe(1);
	});
});