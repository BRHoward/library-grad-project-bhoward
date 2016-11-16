import React from 'react';
import BookForm from './BookForm';

class BookListItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			updating: false
		}
		this.toggleExpand = this.toggleExpand.bind(this);
		this.toggleUpdating = this.toggleUpdating.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
	}

	toggleExpand () {
		let newState = !(this.state.expanded);
		this.setState({
			expanded : newState
		});
	}

	toggleUpdating () {
		let newState = !(this.state.updating);
		this.setState({
			updating : newState
		});
	}

	deleteBook () {
		this.props.deleteBook(this.props.book.Id);
	}

	updateBook(newBook) {
		this.toggleUpdating();
		this.props.updateBook(this.props.book.Id, newBook)
	}

	render () {
	return (
		<div>
		<li>
		{this.props.book.title} 
		<button onClick={this.toggleExpand}>Expand</button>
		<button onClick={this.deleteBook}>Delete</button>
		<button onClick={this.toggleUpdating}>Update</button>
		{this.state.expanded &&
			<ul>
				<li>Author - {this.props.book.author}</li>
				<li>Publish Date - {this.props.book.publishDate}</li>
				<li>ISBN - {this.props.book.isbn}</li>
			</ul>
		}
		</li>
		{this.state.updating && 
			<BookForm onSubmit={this.updateBook} book={this.props.book}/>
		}
		</div>
		);
	}
}

export default BookListItem;