import React from 'react';

class BookListItem extends React.Component{
	constructor() {
		super();
		this.state = {
			expanded: false
		}
	this.toggleExpand = this.toggleExpand.bind(this);
	}
	toggleExpand () {
		let newState = !(this.state.expanded);
		this.setState({
			expanded : newState
		});
	}
	render () {
	return (
		<li onClick={this.toggleExpand}>
		{this.props.book.Title} 
		{this.state.expanded &&
			<ul>
				<li>Author - {this.props.book.Author}</li>
				<li>Publish Date - {this.props.book.PublishDate}</li>
				<li>ISBN - {this.props.book.ISBN}</li>
			</ul>
		}
		</li>
		);
	}
}

export default BookListItem;