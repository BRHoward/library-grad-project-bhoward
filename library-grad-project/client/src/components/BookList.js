import React from 'react';
import BookListItem from './BookListItem';
import BookForm from './BookForm';

const BookList = ({books, deleteBook, updateBook, addBook, addReservation}) => (
	<div>
		<ul>
		{books.map(book => {
			return <BookListItem 
				key={book.Id} 
				book={book} 
				deleteBook={deleteBook}
				updateBook={updateBook}
				addReservation={addReservation}/>
		})}
		</ul>
		<BookForm onSubmit={addBook}/>
	</div>
)

export default BookList;