import React from 'react' ;
import {Link} from 'react-router-dom' ;

import './popbutton.css' ;

class PopButton extends React.Component
{
	render()
	{
		return(
			<div className = "pop-box bounce-top" >
				<Link className = 'sched-btn' to = '/test'>Tests&nbsp;<sup className = 'new'>NEW</sup></Link>
			</div>
		) ;
	}
}

export default PopButton ;