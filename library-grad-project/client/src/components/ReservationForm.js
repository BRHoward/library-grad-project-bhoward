import React from 'react';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

const margin = {
	margin: 12,
}


class ReservationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId : this.props.bookId,
			startDate : null,
			endDate : null,
			invalidInput : false
		}
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.invalidDate = this.invalidDate.bind(this);
	}

	invalidDate(date) {
		let invalid = false;
		this.props.reservations.items.forEach((reservation) => {
			if(this.props.bookId === reservation.bookId 
			&& date >= new Date(reservation.startDate)
			&& date <= new Date(reservation.endDate)) {
				invalid = true;
			}
		});
		return invalid;
	}

	handleStartDateChange(event, date) {
		this.setState({startDate : date});
	}
	handleEndDateChange(event, date) {
		this.setState({endDate : date});
	}

	handleSubmit(event) {
		event.preventDefault();
		if(new Date(this.state.endDate) < new Date(this.state.startDate)){
			this.setState({
				invalidInput : true
			})
		} else {
			this.props.onSubmit(this.state);
			this.setState({
				startDate : "",
				endDate : "",
			})
		}
	}

	handleClose() {
		this.props.toggle();
	}

	render () {
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleClose}
	        style={margin}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        onTouchTap={this.handleSubmit}
	        style={margin}
	      />
	    ]

	    return (
	    	<Dialog
	    		title="Enter reservation dates"
	    		actions={actions}
	    		modal={false}
	    		open={this.props.open}
	    		onRequestClose={this.handleClose}>
	    	<DatePicker
	    		hintText="Start Date"
	    		value={this.state.startDate}
	    		onChange={this.handleStartDateChange}
	    		shouldDisableDate={this.invalidDate}/>

	    	<p>until</p>

	    	<DatePicker
	    		hintText="End Date"
	    		value={this.state.endDate}
	    		onChange={this.handleEndDateChange}
	    		shouldDisableDate={this.invalidDate}/>

	    	{this.state.invalidInput && 
	    		<h4> End date cannot be before start date </h4>
	    	}
	    	</Dialog>
	    	)

	}
}

export default ReservationForm;