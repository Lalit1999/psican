import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

const BarItemBig  = (props) => {
	return (
		<div className='bar-item'> 
			 <div>
			 	<FontAwesomeIcon icon={props.icon} />
			 	<div className="item-txt">
			 		<div> {props.msg} </div>
			 		<div> <a href={props.link}>{props.text}</a> </div>
			 	</div>
			 </div>
		</div>
	);
}

export default BarItemBig ;