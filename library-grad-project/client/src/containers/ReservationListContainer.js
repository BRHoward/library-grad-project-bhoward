import {connect} from 'react-redux';
import ReservationList from '../components/ReservationList';
import {deleteReservation, fetchReservations} from '../actions/actions';

const mapStateToProps = (state) => ({
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
	)(ReservationList)

export default ReservationListContainer;