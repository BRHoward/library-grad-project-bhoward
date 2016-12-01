import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {shallow, mount} from 'enzyme';
import BookForm from '../../components/BookForm';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe('<BookForm />', () => {

	const muiTheme = getMuiTheme();
	injectTapEventPlugin();

	const testBook = {
		id : 0,
		title : "Test Book",
		author : "Test Author",
		publishDate : "Test Date",
		isbn : "Test ISBN"
	}


	it('renders without crashing', () => {
	  	shallow(<BookForm
	  		open={true}/>);
	});

	it('renders a <Dialog/>', () => {
	  	const bookForm = shallow(<BookForm
	  		open={true}/>);
		expect(bookForm.find(Dialog).length).toBe(1);
	});

	it('renders four <TextField/>s', () => {
	  	const bookForm = shallow(<BookForm
	  		open={true}/>);
		expect(bookForm.find(TextField).length).toBe(4);
	});

	it('correctly sets state based on props', () => {
	  	const bookForm = shallow(<BookForm
	  		open={true}
	  		book={testBook}/>);
	  	expect(bookForm.state().title).toBe(testBook.title);
	  	expect(bookForm.state().author).toBe(testBook.author);
	  	expect(bookForm.state().publishDate).toBe(testBook.publishDate);
	  	expect(bookForm.state().isbn).toBe(testBook.isbn);
	});

	it('correctly sets state to blank if no prop given', () => {
	  	const bookForm = shallow(<BookForm
	  		open={true}/>);
	  	expect(bookForm.state().title).toBe("");
	  	expect(bookForm.state().author).toBe("");
	  	expect(bookForm.state().publishDate).toBe("");
	  	expect(bookForm.state().isbn).toBe("");
	});


	it('handleSubmit calls correct callback and resets the state', ()=> {
		const bookForm = mount(
		  		<BookForm 
		  		open={true} 
		  		book={testBook}
		  		onSubmit={sinon.spy()}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		expect(bookForm.props().onSubmit.calledOnce).toBe(false);
	  	expect(bookForm.state().title).toBe(testBook.title);
	  	expect(bookForm.state().author).toBe(testBook.author);
	  	expect(bookForm.state().publishDate).toBe(testBook.publishDate);
	  	expect(bookForm.state().isbn).toBe(testBook.isbn);
	  	bookForm.instance().handleSubmit({
	  		preventDefault : () => {}
	  	});
	  	expect(bookForm.props().onSubmit.calledOnce).toBe(true);
	  	expect(bookForm.state().title).toBe("");
	  	expect(bookForm.state().author).toBe("");
	  	expect(bookForm.state().publishDate).toBe("");
	  	expect(bookForm.state().isbn).toBe("");
	});

	it('handleChange only sets the correct state field', ()=> {
		const bookForm = mount(
		  		<BookForm 
		  		open={true} 
		  		book={testBook}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
	  	expect(bookForm.state().title).toBe(testBook.title);
	  	expect(bookForm.state().author).toBe(testBook.author);
	  	expect(bookForm.state().publishDate).toBe(testBook.publishDate);
	  	expect(bookForm.state().isbn).toBe(testBook.isbn);
	  	bookForm.instance().handleChange({
	  		target: {
	  			id : "author",
	  			value : "new author"
	  		}
	  	});
	  	expect(bookForm.state().title).toBe(testBook.title);
	  	expect(bookForm.state().author).toBe("new author");
	  	expect(bookForm.state().publishDate).toBe(testBook.publishDate);
	  	expect(bookForm.state().isbn).toBe(testBook.isbn);
	});

	it('handleClose calls the correct callback', () => {
		const bookForm = mount(
		  		<BookForm 
		  		open={true} 
		  		book={testBook}
		  		toggle={sinon.spy()}
		  		/>, {
		  			context: {muiTheme},
		  			childContextTypes:{muiTheme: React.PropTypes.object}
		  		}
	  		);
		expect(bookForm.props().toggle.calledOnce).toBe(false);
	  	bookForm.instance().handleClose();
		expect(bookForm.props().toggle.calledOnce).toBe(true);
	});


})