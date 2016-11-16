import React from 'react';

class AddBookForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title : "",
			author : "",
			publishDate : "",
			isbn : ""
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handlePublishDateChange = this.handlePublishDateChange.bind(this);
		this.handleISBNChange = this.handleISBNChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Title: <input type="text" value={this.state.title} onChange={this.handleTitleChange}></input><br/>
					Author: <input type="text" value={this.state.author} onChange={this.handleAuthorChange}></input><br/>
					Publish Date: <input type="text" value={this.state.publishDate} onChange={this.handlePublishDateChange}></input><br/>
					ISBN: <input type="text" value={this.state.isbn} onChange={this.handleISBNChange}></input><br/>
					<input type="submit"></input>
				</form>
			</div>
			);
	}

}

export default AddBookForm;