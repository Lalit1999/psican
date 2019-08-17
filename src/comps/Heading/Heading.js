import React, { Component } from 'react';

import './heading.css' ;

class Heading extends Component {
	render() {
		return (
			<div className="title-con">
				<h2 className="left-title"> {this.props.text} </h2>
			</div>
		);
	}
}

export default Heading ;

