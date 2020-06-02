import React, { Component } from 'react';

import './text.css' ;

class Text extends Component {
	render() {
		const type = this.props.type?"password":"text" ;
		const str = this.props.name?this.props.name:this.props.label ;
		return (
			<div className="text-div">
				<label className="lbel">{this.props.label}&nbsp; : </label>
	            <input  className="inpu" type={type} name={str} 
	            		onChange={this.props.onChange} value={this.props.value} />
			</div>
		);
	}
}

export default Text ;
