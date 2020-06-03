import React, { Component } from 'react';

import './dropdown.css' ;

class Dropdown extends Component {
	createOptions = () => {
		return this.props.options.map((option,i) => <option key={i} value={option}>{option}</option>) ;
	}

	render() {
		const str = this.props.name?this.props.name:this.props.label ;
		return (
			<div className="dd-div">
				<label className="lbel">{this.props.label}&nbsp; : </label>
				<select className="inpu" name={str} value={this.props.value}
					onChange={this.props.onChange}>
					{this.createOptions()}
				</select>
			</div>
		);
	}
}

export default Dropdown ;