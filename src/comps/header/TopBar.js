import React from 'react' ;
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons' ;

import './topbar.css' ;
import BarItem from './BarItem.js' ;

class TopBar extends React.Component
{
	render()
	{
		return (
			<div className="topbar"> 
				<div>
					<p> PSICAN </p>
				</div>
				<div className="right-topbar">
					<BarItem link="tel:09564328921" text=" +91 - 9564-328-921" icon={faPhoneAlt}/>
					<BarItem link="mailto:b.tiles@gmail.com" text=" b.tiles@gmail.com" 
					icon={faEnvelope}/>
				</div>
			</div>
			) ;
	}
}

export default TopBar ;