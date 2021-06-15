import React from 'react';

import './heading.css' ;

const Heading = ({small, text}) => {
	return (
		<div className="title-con">
			<h2 className={(small?'small-title':'left-title')}> {text} </h2>
		</div>
	);
}

export default Heading ;

