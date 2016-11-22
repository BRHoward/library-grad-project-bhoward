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

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handlePublishDateChange = this.handlePublishDateChange.bind(this);
		this.handleISBNChange = this.handleISBNChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleTitleChange(event) {
		this.setState({title : event.target.value});
	}
	handleAuthorChange(event) {
		this.setState({author : event.target.value});
	}
	handlePublishDateChange(event) {
		this.setState({publishDate : event.target.value});
	}
	handleISBNChange(event) {
		this.setState({isbn : event.target.value});
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
				<TextField floatingLabelText="Title" value={this.state.title} onChange={this.handleTitleChange}></TextField><br/>
				<TextField floatingLabelText="Author" value={this.state.author} onChange={this.handleAuthorChange}></TextField><br/>
				<TextField floatingLabelText="Publish Date" value={this.state.publishDate} onChange={this.handlePublishDateChange}></TextField><br/>
				<TextField floatingLabelText="ISBN" value={this.state.isbn} onChange={this.handleISBNChange}></TextField><br/>
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