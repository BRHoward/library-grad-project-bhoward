import React from 'react';

const ReservationListItem = ({reservation, deleteReservation}) => {

	const handleDelete = () => {
		deleteReservation(reservation.Id)
	}

	return (
		<li>
		{reservation.bookId} - {reservation.startDate} - {reservation.endDate}
		<button onClick={handleDelete}>Delete</button>
		</li>
		);
}

export default ReservationListItem;