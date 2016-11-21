import React from 'react';
import BookForm from './BookForm';
import ReservationForm from './ReservationForm';

class BookListItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			updating: false,
			reserving: false
		}
		this.toggleExpand = this.toggleExpand.bind(this);
		this.toggleUpdating = this.toggleUpdating.bind(this);
		this.toggleReserving = this.toggleReserving.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.addReservation = this.addReservation.bind(this);
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

	toggleReserving () {
		let newState = !(this.state.reserving);
		this.setState({
			reserving : newState
		});
	}

	deleteBook () {
		this.props.deleteBook(this.props.book.Id); 
	}

	updateBook(newBook) {
		this.toggleUpdating();
		this.props.updateBook(this.props.book.Id, newBook)
	}

	addReservation(reservation) {
		this.props.addReservation(reservation);
	}

	render () {
	return (
		<div>
		<li>
		{this.props.book.title} - {this.props.book.Id}
		<button onClick={this.toggleExpand}>Expand</button>
		<button onClick={this.deleteBook}>Delete</button>
		<button onClick={this.toggleUpdating}>Update</button>
		<button onClick={this.toggleReserving}>Reserve</button>
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
		{this.state.reserving &&
			<ReservationForm onSubmit={this.addReservation} bookId={this.props.book.Id}/>
		}
		</div>
		);
	}
}

export default BookListItem;