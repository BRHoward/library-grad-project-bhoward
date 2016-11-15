import React from 'react';
import ReservationListItem from './ReservationListItem';

class ReservationList extends React.Component {
	render() {
		return (
			<ul>
			{this.props.reservations.map(reservation => {
				return <ReservationListItem key={reservation.Id} reservation={reservation}/>
			})}
			</ul>
		);
	} 
}

export default ReservationList;