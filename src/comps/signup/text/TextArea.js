import React, { Component } from 'react';

import './text.css' ;

class TextArea extends Component {
	render() {
		const {label, onChange, value, r, c} = this.props ;
		return (
			<div className="text-div textarea-div">
				<label className="lbel">{label}&nbsp; : </label>
	            <textarea className="inpu" name={label} rows={r} cols={c} onChange={onChange}
	            		value={value} />
			</div>
		);
	}
}

export default TextArea ;
