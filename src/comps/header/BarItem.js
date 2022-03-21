import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

const BarItem = ({msg, icon, link, text}) => {
	return (
		<div className='bar-item'> 
		 	<div className="item-txt">
	 			<FontAwesomeIcon icon={icon} />
	 		 	<a href={link}>{text}</a>
			</div>
		</div>
	);
}

const BarItemBig = ({msg, icon, link, text, scroll}) => {
	if(window.screen.availWidth > 600)
		return (
			<div className='bar-item'> 
			 	<FontAwesomeIcon icon={icon}/>
			 	<div className="item-txt">
			 		<div> <a href={link}>{text}</a> </div>
			 	</div>
			</div>
		);
	else
		return (
			<div className='bar-item'> 
				<a href={link} onClick={scroll}> <FontAwesomeIcon icon={icon} /> </a>
			</div>
		);
}

export {BarItem, BarItemBig} ;
