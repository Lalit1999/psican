import React, { Component } from 'react';

import './heading.css' ;

class Heading extends Component {
	render() {
		const str = (this.props.small?'small-title':'left-title')
		return (
			<div className="title-con">
				<h2 className={str}> {this.props.text} </h2>
			</div>
		);
	}
}

export default Heading ;

