import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons' ;

import Header from './Header.js' ;
import './topbar.css' ;
import {BarItem, BarItemBig} from './BarItem.js' ;
import Image from '../images/Psyment2.webp' ;

const TopBar = () => {
	const checkMobile = () => {
		if(window.screen.availWidth > 600)
			return (
				<div className="bar-items">
					<BarItem link="tel:09555235231" text=" +91-9555-235-231" icon={faPhoneAlt}
						msg="Call Us At"/>
					<BarItem link="mailto:info.psyment@gmail.com" text=" info.psyment@gmail.com" 
					icon={faEnvelope} msg="E-Mail Us" />
				</div>
			) ;
		else
			return (
				<div className="bar-items">
					<BarItemBig icon={faPhoneAlt} link="tel:09555235231"/>
					<BarItemBig icon={faEnvelope} link="mailto:info.psyment@gmail.com"/>
				</div>
			) ;
	}

	return (
		<div className="topbar"> 
			<div className="logo"> <img src={Image} alt="logo" /> </div>
			<div className="right-topbar"> {checkMobile()} <Header /> </div>
		</div>
	) ;
}

export default TopBar ;