import {connect} from 'react-redux';
import ReservationSelector from '../components/ReservationSelector';
import {deleteReservation, fetchReservations} from '../actions/actions';

const mapStateToProps = (state) => ({
	books: state.books,
	reservations: state.reservations
})

const mapDispatchToProps = (dispatch) => ({
	fetchReservations() {
		dispatch(fetchReservations());
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