import React, { Component } from 'react';

import './num.css'

class Number extends Component {
	render() {
		const {onChange, min, max, label, value} = this.props;
		const str = this.props.name?this.props.name:this.props.label ;
		return (
			<div className="num-div">
				<label className="lbel">{label}&nbsp; : </label>
	            <input  className="inpu" type="number" name={str} min={min} max={max}
	            		onChange={onChange} value={value}/>
			</div>
		);
	}
}

export default Number ;
