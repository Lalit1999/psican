import React from 'react';

import './text.css' ;

const TextArea = ({label, onChange, value, r, c, name}) => {
	return (
		<div className="text-div textarea-div">
			<label className="lbel">{label}&nbsp; : </label>
            <textarea className="inpu" name={name?name:label} rows={r} cols={c} onChange={onChange} value={value} />
		</div>
	);
}

export default TextArea ;
