import React from 'react';
import BookListItem from './BookListItem';
import AddBookForm from './AddBookForm';

class BookList extends React.Component {
	constructor(props) {
		super(props);

		this.addBook = this.addBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	addBook(data) {
		this.props.addBook(data);
	}

	deleteBook(id) {
		this.props.deleteBook(id);
	}

	render() {
		return (
			<div>
				<ul>
				{this.props.books.map(book => {
					return <BookListItem key={book.Id} book={book} deleteBook={this.deleteBook}/>
				})}
				</ul>
				<AddBookForm onSubmit={this.addBook}/>
			</div>
		);
	} 
}

export default BookList;