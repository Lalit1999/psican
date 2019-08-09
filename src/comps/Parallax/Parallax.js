import React from 'react' ;

import './parallax.css' ;

const Parallax = (props) => {
	return (
		<div className="parallax">
			{props.children}
		</div>
		) ;
}

export default Parallax ;