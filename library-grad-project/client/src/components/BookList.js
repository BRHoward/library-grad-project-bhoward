import React from 'react';
import BookListItem from './BookListItem';
import BookForm from './BookForm';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

const margin = {
	margin: 12,
}


class BookList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addingBook: false
		}
		
		this.toggleAdding = this.toggleAdding.bind(this);
		this.addBook = this.addBook.bind(this);
	}

	componentDidMount () {
		this.props.fetchBooks();
	}

	toggleAdding() {
		let newState = !(this.state.addingBook);
		this.setState({
			addingBook : newState
		});
	}

	addBook(book) {
		this.toggleAdding();
		this.props.addBook(book);
	}


	render () {
		return (
		<div>
			<h1 style={margin}> LibraryApp </h1>
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn>Title</TableHeaderColumn>
						<TableHeaderColumn>Author</TableHeaderColumn>
						<TableHeaderColumn>Publish Date</TableHeaderColumn>
						<TableHeaderColumn>ISBN</TableHeaderColumn>
						<TableHeaderColumn></TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{this.props.books.items.map(book => {
						return <BookListItem 
							key={book.id} 
							book={book} 
							deleteBook={this.props.deleteBook}
							updateBook={this.props.updateBook}
							addReservation={this.props.addReservation}
							reservations={this.props.reservations}/>
					})}
				</TableBody>
			</Table>
			<RaisedButton 
				label="Add a new Book" 
				onTouchTap={this.toggleAdding}
				primary={true} 
				style={margin}/>
			{this.state.addingBook &&
				<BookForm
					open={this.state.addingBook}
					toggle={this.toggleAdding}
					onSubmit={this.addBook}/>
			}
		</div>
		)
	}
}

export default BookList;