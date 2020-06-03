import React, { Component } from 'react';

import './text.css' ;

class TextArea extends Component {
	render() {
		const {label, onChange, value, r, c} = this.props ;
		const str = this.props.name?this.props.name:this.props.label ;
		return (
			<div className="text-div textarea-div">
				<label className="lbel">{label}&nbsp; : </label>
	            <textarea className="inpu" name={str} rows={r} cols={c} onChange={onChange}
	            		value={value} />
			</div>
		);
	}
}

export default TextArea ;
