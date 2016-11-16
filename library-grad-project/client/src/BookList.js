import React from 'react';
import BookListItem from './BookListItem';
import BookForm from './BookForm';

class BookList extends React.Component {
	constructor(props) {
		super(props);

		this.addBook = this.addBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
	}

	addBook(data) {
		this.props.addBook(data);
	}

	deleteBook(id) {
		this.props.deleteBook(id);
	}

	updateBook(id, book) {
		this.props.updateBook(id, book);
	}

	render() {
		return (
			<div>
				<ul>
				{this.props.books.map(book => {
					return <BookListItem 
						key={book.Id} 
						book={book} 
						deleteBook={this.deleteBook}
						updateBook={this.updateBook}/>
				})}
				</ul>
				<BookForm onSubmit={this.addBook}/>
			</div>
		);
	} 
}

export default BookList;