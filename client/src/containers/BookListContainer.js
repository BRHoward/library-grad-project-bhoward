import {connect} from 'react-redux';
import BookList from '../components/BookList';
import {addBook, deleteBook, updateBook, addReservation, fetchBooks} from '../actions/actions';


const mapStateToProps = (state) => ({
	books : state.books
})

const mapDispatchToProps = (dispatch) => ({
	addBook(book) {
		dispatch(addBook(book));
	},
	deleteBook(id) {
		dispatch(deleteBook(id));
	},
	updateBook(id, book) {
		dispatch(updateBook(id, book));
	},
	addReservation(reservation) {
		console.log("sending");
		console.log(reservation);
		dispatch(addReservation(reservation));
	},
	fetchBooks() {
		dispatch(fetchBooks());
	}
})

const BookListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(BookList)

export default BookListContainer;