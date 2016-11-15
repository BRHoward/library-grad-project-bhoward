import React from 'react';

function ReservationListItem(props) {
	return (
		<li>{props.reservation.bookId} - {props.reservation.StartDate} - {props.reservation.EndDate}</li>
		);
}

export default ReservationListItem;