import React from 'react';

import './dropdown.css' ;

const Dropdown = ({options, name, label, value, onChange}) => {
	const createOptions = () => {
		return options.map((option,i) => <option key={i} value={option}>{option}</option>) ;
	}

	return (
		<div className="dd-div">
			<label className="lbel">{label}&nbsp; : </label>
			<select className="inpu" name={name?name:label} value={value} onChange={onChange}>
				{createOptions()}
			</select>
		</div>
	);
}

export default Dropdown ;