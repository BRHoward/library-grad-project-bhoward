import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const margin = {
	margin: 12,
}

const ReservationListItem = ({reservation, deleteReservation}) => {

	const handleDelete = () => {
		deleteReservation(reservation.id)
	}

	return (
		<li>
		{new Date(reservation.startDate).toDateString() + " - "} 
		{new Date(reservation.endDate).toDateString()}
		<FlatButton 
			label="Delete" 
			secondary={true} 
			onClick={handleDelete}
			style={margin}/>
		</li>
		);
}

export default ReservationListItem;