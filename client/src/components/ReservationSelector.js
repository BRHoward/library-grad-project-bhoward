import React from 'react'
import ReservationList from './ReservationList';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const margin = {
	margin: 12,
}

class ReservationSelector extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			selectedBook : null
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (event, index, value) {
		this.setState({
			selectedBook : value
		})
	}

	render () {
		return (
			<div>
			<h2 style={margin}> Check reservations </h2>
			<SelectField
				floatingLabelText="Book"
				value={this.state.selectedBook}
				onChange={this.handleChange}
				style={margin}>

				{this.props.books.items.map(book => {
					return <MenuItem key={book.id} value={book.id} primaryText={book.title}/>
				})}
			</SelectField>
			{this.state.selectedBook && 
				<ReservationList
					reservations={this.props.books.items.filter(book => 
						book.id === this.state.selectedBook)[0].reservations}
					deleteReservation={this.props.deleteReservation}
				/>
			}
			</div>
			)
	}
}

export default ReservationSelector;