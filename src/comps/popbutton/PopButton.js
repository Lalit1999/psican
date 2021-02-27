import React from 'react' ;
import {Link} from 'react-router-dom' ;

import './popbutton.css' ;

// ye home par uchhalta hua wala button hai
const PopButton = () => {
	return(
		<div className = "pop-box bounce-top" >
			<Link className = 'sched-btn' to = '/test'>Tests&nbsp;<sup className = 'new'>NEW</sup></Link>
		</div>
	) ;
}

export default PopButton ;