import React from 'react';
import BookListItem from './BookListItem';
import AddBookForm from './AddBookForm';

class BookList extends React.Component {
	constructor() {
		super();

		this.addBook = this.addBook.bind(this);
	}

	addBook(data) {
		this.props.addBook(data);
	}

	render() {
		return (
			<div>
				<ul>
				{this.props.books.map(book => {
					return <BookListItem key={book.Id} book={book}/>
				})}
				</ul>
				<AddBookForm onSubmit={this.addBook}/>
			</div>
		);
	} 
}

export default BookList;