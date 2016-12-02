import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const margin = {
	margin: 12,
}

class BookForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title : this.props.book.title,
			author : this.props.book.author,
			publishDate : this.props.book.publishDate,
			isbn : this.props.book.isbn
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	handleChange(event) {
		this.setState({[event.target.id] : event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			title : "",
			author : "",
			publishDate : "",
			isbn : ""
		})
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
				title="Enter book details"
				actions={actions}
				modal={false}
				open={this.props.open}
				onRequestClose={this.handleClose}>
			<div>
				<TextField id="title" floatingLabelText="Title" value={this.state.title} onChange={this.handleChange}></TextField><br/>
				<TextField id="author" floatingLabelText="Author" value={this.state.author} onChange={this.handleChange}></TextField><br/>
				<TextField id="publishDate" floatingLabelText="Publish Date" value={this.state.publishDate} onChange={this.handleChange}></TextField><br/>
				<TextField id="isbn" floatingLabelText="ISBN" value={this.state.isbn} onChange={this.handleChange}></TextField><br/>
			</div>
			</Dialog>
			);
	}
}

BookForm.defaultProps = {
	book : {
			title : "",
			author : "",
			publishDate : "",
			isbn : ""
		}
}

export default BookForm;