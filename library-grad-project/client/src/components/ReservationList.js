import React from 'react';
import ReservationListItem from './ReservationListItem';

const ReservationList = ({reservations, deleteReservation}) => (
	<div>
		<ul>
		{reservations.map(reservation => {
			return <ReservationListItem 
				key={reservation.Id} 
				reservation={reservation}
				deleteReservation={deleteReservation}/>
		})}
		</ul>
	</div>
)

export default ReservationList;