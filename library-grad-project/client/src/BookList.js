import React from 'react';
import BookListItem from './BookListItem';

class BookList extends React.Component {
	render() {
		return (
			<ul>
			{this.props.books.map(book => {
				return <BookListItem key={book.Id} book={book}/>
			})}
			</ul>
		);
	} 
}

export default BookList;