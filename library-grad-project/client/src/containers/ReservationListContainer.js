import {connect} from 'react-redux';
import ReservationList from '../components/ReservationList';
import {deleteReservation} from '../actions/actions';

const mapStateToProps = (state) => ({
	reservations: state.reservations
})

const mapDispatchToProps = (dispatch) => ({
	deleteReservation(id) {
		dispatch(deleteReservation(id));
	}
})

const ReservationListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(ReservationList)

export default ReservationListContainer;