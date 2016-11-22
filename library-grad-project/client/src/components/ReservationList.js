import React from 'react';
import ReservationListItem from './ReservationListItem';

class ReservationList extends React.Component {
		render () {
			return (
			<div>
				<ul>
				{this.props.reservations.map(reservation => {
					return <ReservationListItem 
						key={reservation.Id} 
						reservation={reservation}
						deleteReservation={this.props.deleteReservation}/>
				})}
				</ul>
			</div>
				)
		}
}

export default ReservationList;