import {connect} from 'react-redux';
import BookList from '../components/BookList';
import {addBook, deleteBook, updateBook, addReservation} from '../actions/actions';

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
		dispatch(addReservation(reservation));
	}
})

const BookListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(BookList)

export default BookListContainer;