import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {shallow, mount} from 'enzyme';
import BookListItem from '../../components/BookListItem';
import BookForm from '../../components/BookForm';
import ReservationForm from '../../components/ReservationForm';
import Flat from 'material-ui/RaisedButton';
import sinon from 'sinon';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableRow, TableRowColumn, TableBody} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe("<BookListItem />", () => {

	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	const testBook = {
		Id : 0,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN"
	}

	const testReservations = [
		{
			Id : 0,
			bookId : 5,
			startDate : "01-01-2001",
			endDate  : "02-01-2001"
		},
		{
			Id : 1,
			bookId : 7,
			startDate : "01-01-2001",
			endDate  : "02-01-2001"
		}
	]

	it('renders without crashing', () => {
	  	shallow(<BookListItem 
	  		book={testBook}/>);
	});

	it('renders a table row', () => {
	  	const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
	  	expect(bookListItem.find(TableRow).length).toBe(1);
	});

	it('renders exactly 5 table columns', () => {
		const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
		expect(bookListItem.find(TableRowColumn).length).toBe(5);
	});

	it('renders exactly 3 flat buttons', () => {
		const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
		expect(bookListItem.find(FlatButton).length).toBe(3);
	});

	it('initally sets the updating and reserving flags to false', () => {
		const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
		expect(bookListItem.state().updating).toBe(false);
		expect(bookListItem.state().reserving).toBe(false);
	});

	it('clicking update button sets state and shows update form', () => {
		const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
		expect(bookListItem.state().updating).toBe(false);
		expect(bookListItem.find(BookForm).length).toBe(0);
	  	bookListItem.find({label:"Update"}).simulate('touchTap');
	  	expect(bookListItem.state().updating).toBe(true);
	  	expect(bookListItem.find(BookForm).length).toBe(1);
	});

	it('clicking reserve button sets state and shows reserve form', () => {
		const bookListItem = shallow(<BookListItem 
	  		book={testBook}/>);
		expect(bookListItem.state().reserving).toBe(false);
		expect(bookListItem.find(ReservationForm).length).toBe(0);
	  	bookListItem.find({label:"Reserve"}).simulate('touchTap');
	  	expect(bookListItem.state().reserving).toBe(true);
	  	expect(bookListItem.find(ReservationForm).length).toBe(1);
	});

	it('clicking delete calls the correct callback', () => {
		const bookListItem = mount(
			<Table>
			<TableBody>
		  	<BookListItem 
		  		book={testBook} 
		  		deleteBook={sinon.spy()}
		  		/>
		  	</TableBody>
		  	</Table>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);

		//enzyme simulate doesn't support touchTap as an event from mount()
		//so need to use react test utils instead
		const domNode = ReactDOM.findDOMNode(
			ReactTestUtils.findRenderedDOMComponentWithClass(
          	bookListItem.instance(), 'del-btn'
        	)
      	);
    	ReactTestUtils.Simulate['touchTap'](domNode);
		expect(bookListItem.find(BookListItem).props().deleteBook.calledOnce).toBe(true);
	});

	// it('updateBook resets flag and calls callback', () => {
	// 	const bookListItem = mount(
	// 	  		<BookListItem 
	// 	  		book={testBook}
	// 	  		updateBook={sinon.spy()}
	// 	  		/>
	// 	  	, {
	// 	  			context: {muiTheme},
	// 	  			childContextTypes:{muiTheme: React.PropTypes.object}
	// 	  		}
	//   		);
	// 	var toggleSpy = sinon.spy(bookListItem.instance(), 'toggleUpdating');
	// 	bookListItem.instance().updateBook(testBook);
	// 	expect(toggleSpy.calledOnce).toBe(true);
	// 	expect(bookListItem.props().updateBook.calledWith(0, testBook)).toBe(true);
	// });

	// it('addReservation resets flag and calls callback', () => {
	// 	const bookListItem = mount(
	// 	  		<BookListItem 
	// 	  		book={testBook}
	// 	  		addReservation={sinon.spy()}
	// 	  		/>
	// 	  	, {
	// 	  			context: {muiTheme},
	// 	  			childContextTypes:{muiTheme: React.PropTypes.object}
	// 	  		}
	//   		);
	// 	var toggleSpy = sinon.spy(bookListItem.instance(), 'toggleReserving');
	// 	bookListItem.instance().addReservation(testReservations[0]);
	// 	expect(toggleSpy.calledOnce).toBe(true);
	// 	expect(bookListItem.props().addReservation.calledWith(testReservations[0])).toBe(true);
	// });

});