import React from 'react';

function ReservationListItem(props) {
	return (
		<li>{props.reservation.bookId} - {props.reservation.startDate} - {props.reservation.endDate}</li>
		);
}

export default ReservationListItem;