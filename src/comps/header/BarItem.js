import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

const BarItem = ({msg, icon, link, text}) => {
	return (
		<div className='bar-item'> 
			<div>
			 	<div className="item-txt">
			 		<div className="top"> {msg} </div>
			 		<div>
			 			<FontAwesomeIcon icon={icon} />
			 		 	<a href={link}>{text}</a>
			 		</div>
				</div>
			</div>
		</div>
	);
}

const BarItemBig = ({msg, icon, link, text, scroll}) => {
	if(window.screen.availWidth > 600)
		return (
			<div className='bar-item'> 
				 <div> 
				 	<FontAwesomeIcon icon={icon}/>
				 	<div className="item-txt">
				 		<div> {msg} </div>
				 		<div> <a href={link}>{text}</a> </div>
				 	</div>
				</div>
			</div>
		);
	else
		return (
			<div className='bar-item'> 
				<div>
					<a href={link} onClick={scroll}> <FontAwesomeIcon icon={icon} /> </a>
				</div>
			</div>
		);
}

export {BarItem, BarItemBig} ;
