import React from 'react';

class ReservationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId : this.props.bookId,
			startDate : "",
			endDate : "",
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleStartDateChange(event) {
		this.setState({startDate : event.target.value});
	}
	handleEndDateChange(event) {
		this.setState({endDate : event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			startDate : "",
			endDate : "",
		})
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Start Date: <input type="text" value={this.state.startDate} onChange={this.handleStartDateChange}></input><br/>
					End Date: <input type="text" value={this.state.endDate} onChange={this.handleEndDateChange}></input><br/>
					<input type="submit"></input>
				</form>
			</div>
		);
	}
}

export default ReservationForm;