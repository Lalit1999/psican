import React from 'react';

import './num.css'

const Number = ({onChange, min, max, label, value, name}) => {
	return (
		<div className="num-div">
			<label className="lbel">{label}&nbsp; : </label>
            <input  className="inpu" type="number" name={name?name:label} min={min} max={max} onChange={onChange} value={value}/>
		</div>
	);
}

export default Number ;
