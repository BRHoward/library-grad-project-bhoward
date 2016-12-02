import React from 'react';
import BookForm from './BookForm';
import ReservationForm from './ReservationForm';
import FlatButton from 'material-ui/FlatButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';

const margin = {
	margin: 12,
}


class BookListItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			updating: false,
			reserving: false
		};
		this.toggleUpdating = this.toggleUpdating.bind(this);
		this.toggleReserving = this.toggleReserving.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.addReservation = this.addReservation.bind(this);
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
		this.props.deleteBook(this.props.book.id); 
	}

	updateBook(newBook) {
		this.toggleUpdating();
		this.props.updateBook(this.props.book.id, newBook)
	}

	addReservation(reservation) {
		this.toggleReserving();
		this.props.addReservation(reservation);
	}

	render () {
	return (
		<TableRow>
			<TableRowColumn>{this.props.book.title}</TableRowColumn>
			<TableRowColumn>{this.props.book.author}</TableRowColumn>
			<TableRowColumn>{this.props.book.publishDate}</TableRowColumn>
			<TableRowColumn>{this.props.book.isbn}</TableRowColumn>
			<TableRowColumn>
				<FlatButton className="del-btn" label="Delete" secondary={true} onTouchTap={this.deleteBook} style={margin}/>
				<FlatButton label="Update" onTouchTap={this.toggleUpdating} style={margin}/>
				<FlatButton label="Reserve" primary={true} onTouchTap={this.toggleReserving} style={margin}/>
			</TableRowColumn>

			{this.state.updating &&
			<BookForm 
				open={this.state.updating}
				toggle={this.toggleUpdating}
				onSubmit={this.updateBook}
				book={this.props.book}/>
			}

			{this.state.reserving &&
				<ReservationForm 
					open={this.state.reserving}
					toggle={this.toggleReserving}
					onSubmit={this.addReservation} 
					bookId={this.props.book.id}
					reservations={this.props.reservations}/>
			}
		</TableRow>
		);
	}
}

export default BookListItem;