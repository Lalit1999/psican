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
				<div className="logo">
					<p> PSICAN </p>
				</div>
				<div className="right-topbar">
					<BarItem link="tel:09555235231" text=" +91-9555-235-231" icon={faPhoneAlt}
						msg="Call Us At"/>
					<BarItem link="mailto:psican@gmail.com" text=" psican@gmail.com" 
					icon={faEnvelope} msg="E-Mail Us" />
				</div>
			</div>
			) ;
	}
}

export default TopBar ;