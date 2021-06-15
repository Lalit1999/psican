import React from 'react' ;
import { faPhoneAlt, faEnvelope, faFileCode } from '@fortawesome/free-solid-svg-icons' ;

import './topbar.css' ;
import {BarItem, BarItemBig} from './BarItem.js' ;
import PopIcon from '../popup/PopIcon.js' ;
import Image from '../images/Psyment.webp' ;

const TopBar = () => {
	const checkMobile = () => {
		if(window.screen.availWidth > 600)
			return (
				<React.Fragment>
					<BarItem link="tel:09555235231" text=" +91-9555-235-231" icon={faPhoneAlt}
						msg="Call Us At"/>
					<BarItem link="mailto:info.psyment@gmail.com" text=" info.psyment@gmail.com" 
					icon={faEnvelope} msg="E-Mail Us" />
					<PopIcon>
						<BarItem icon={faFileCode} link="#" msg="" text=""/>
					</PopIcon>
				</React.Fragment>
			) ;
		else
			return (
				<React.Fragment>
					<BarItemBig icon={faPhoneAlt} link="tel:09555235231"/>
					<BarItemBig icon={faEnvelope} link="mailto:info.psyment@gmail.com"/>
					<PopIcon>
						<BarItemBig icon={faFileCode} link="#" />
					</PopIcon>
				</React.Fragment>
			) ;
	}

	return (
		<div className="topbar"> 
			<div className="logo">
				<p> <img src={Image} alt="logo" /> </p>
			</div>
			<div className="right-topbar">
				{ checkMobile() }
			</div>
		</div>
	) ;
}

export default TopBar ;