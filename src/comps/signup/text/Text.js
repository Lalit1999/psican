import React from 'react';

import './text.css' ;

const Text = ({type, name, label, value, onChange}) => {
	return (
		<div className="text-div">
			<label className="lbel">{label}&nbsp; : </label>
            <input  className="inpu" type={type?"password":"text"} name={name?name:label} onChange={onChange} value={value} />
		</div>
	);
}

export default Text ;
