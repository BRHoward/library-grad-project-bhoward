import React from 'react';

function BookListItem(props) {
	return (
		<li>{props.book.Title} - {props.book.Author} - {props.book.PublishDate} - {props.book.ISBN}</li>
		);
}

export default BookListItem;