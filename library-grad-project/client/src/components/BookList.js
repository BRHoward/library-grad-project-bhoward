import React from 'react';
import BookListItem from './BookListItem';
import BookForm from './BookForm';

class BookList extends React.Component {

	componentDidMount () {
		this.props.fetchBooks();
	}

	render () {
		return (
		<div>
			<ul>
			{this.props.books.items.map(book => {
				return <BookListItem 
					key={book.Id} 
					book={book} 
					deleteBook={this.props.deleteBook}
					updateBook={this.props.updateBook}
					addReservation={this.props.addReservation}/>
			})}
			</ul>
			<BookForm onSubmit={this.props.addBook}/>
		</div>
			)
	}
}

export default BookList;