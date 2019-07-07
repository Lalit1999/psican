import React from 'react' ;

import './parallax.css' ;

const Parallax = (props) => {
	return (
		<div className="parallax">
			{props.text}
		</div>
		) ;
}

export default Parallax ;