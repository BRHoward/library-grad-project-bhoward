import {connect} from 'react-redux';
import ReservationSelector from '../components/ReservationSelector';
import {deleteReservation, fetchBooks} from '../actions/actions';

const mapStateToProps = (state) => ({
	books: state.books,
})

const mapDispatchToProps = (dispatch) => ({
	fetchBooks() {
		dispatch(fetchBooks());
	},
	deleteReservation(id) {
		dispatch(deleteReservation(id));
	}
})

const ReservationListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(ReservationSelector)

export default ReservationListContainer;