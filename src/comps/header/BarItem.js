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

export default BarItem ;
