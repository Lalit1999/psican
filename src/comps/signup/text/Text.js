import React, { Component } from 'react';

import './text.css' ;

class Text extends Component {
	render() {
		const type = this.props.type?"password":"text" ;
		return (
			<div className="text-div">
				<label className="lbel">{this.props.label}&nbsp; : </label>
	            <input  className="inpu" type={type} name={this.props.label} 
	            		onChange={this.props.onChange} value={this.props.value} />
			</div>
		);
	}
}

export default Text ;
