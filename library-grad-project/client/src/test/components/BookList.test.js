import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import BookList from '../../components/BookList';
import BookListItem from '../../components/BookListItem';
import BookForm from '../../components/BookForm';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe('<BookList/>', () => {

	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	const testBook = {
		id : 0,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN"
	}

	const testBook2 = {
		id : 1,
		title : "Test Book 2",
		author : "Test Author 2",
		publishDate : "Test Date 2",
		isbn : "Test ISBN 2"
	}

	const initialState = {
		books : {
			isFetching : false,
			items : [testBook, testBook2]
		},
		reservations : {
			isFetching : false,
			items : []
		}
	}



	it('renders without crashing', () => {
	  	shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
	});

	it('renders a <Table/>', () => {
	  	const bookList = shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
		expect(bookList.find(Table).length).toBe(1);
	});

	it('renders a <RaisedButton/> for adding a book', () => {
	  	const bookList = shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
		expect(bookList.find(RaisedButton).length).toBe(1);
	});

	it('renders the correct amount of <BookListItem/>s', () => {
		const bookList = shallow(<BookList 
			books={initialState.books}
	  		reservations={initialState.reservations}/>);
		expect(bookList.find(BookListItem).length).toBe(2);
	});

	it('calls componentDidMount on render', () => {
		var funcSpy = sinon.spy(BookList.prototype, 'componentDidMount'); 
	  	const bookList = mount(
		  		<BookList 
		  		books={initialState.books} 
		  		reservations={initialState.reservations}
		  		fetchBooks={() =>{}}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(funcSpy.calledOnce).toEqual(true);

	});
	it('fetches the book list on render', () => {
		const bookList = mount(
		  		<BookList 
		  		books={initialState.books} 
		  		reservations={initialState.reservations}
		  		fetchBooks={sinon.spy()}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(bookList.props().fetchBooks.calledOnce).toBe(true);
	});

	it('initally sets the addingBook flag to false', () => {
		const bookList = shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
		expect(bookList.state().addingBook).toBe(false);
	});

	it('toggleAdding changes the state of the addingBook flag', () => {
		const bookList = shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
		bookList.instance().toggleAdding();
		expect(bookList.state().addingBook).toBe(true);
		bookList.instance().toggleAdding();
		expect(bookList.state().addingBook).toBe(false);
	});

	it('addBook calls resets flag and adds book', () => {
		const bookList = mount(
		  		<BookList 
		  		books={initialState.books} 
		  		reservations={initialState.reservations}
		  		fetchBooks={() =>{}}
		  		addBook={sinon.spy()}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		var toggleSpy = sinon.spy(bookList.instance(), 'toggleAdding');
		bookList.instance().addBook(testBook);
		expect(toggleSpy.calledOnce).toBe(true);
		expect(bookList.props().addBook.calledWith(testBook)).toBe(true);
	})

	it('sets flag and renders <BookForm/> when the add button is clicked', () => {
	  	const bookList = shallow(<BookList 
	  		books={initialState.books} 
	  		reservations={initialState.reservations}/>);
	  	expect(bookList.find(BookForm).length).toBe(0);
		bookList.find('RaisedButton').simulate('touchTap');
		expect(bookList.state().addingBook).toBe(true);
		expect(bookList.find(BookForm).length).toBe(1);
	});
});
