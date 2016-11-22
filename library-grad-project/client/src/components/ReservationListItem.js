import React from 'react';

const ReservationListItem = ({reservation, deleteReservation}) => {

	const handleDelete = () => {
		deleteReservation(reservation.Id)
	}

	return (
		<li>
		{reservation.bookId} 
		- {new Date(reservation.startDate).toDateString()} 
		- {new Date(reservation.endDate).toDateString()}
		<button onClick={handleDelete}>Delete</button>
		</li>
		);
}

export default ReservationListItem;