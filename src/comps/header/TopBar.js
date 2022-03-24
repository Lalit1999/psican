import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons' ;

import Header from './Header.js' ;
import './topbar.css' ;
import BarItem from './BarItem.js' ;
import Image from '../images/Psyment2.webp' ;

const TopBar = () => {
	return (
		<div className="topbar"> 
			<div className="logo"> <img src={Image} alt="logo" /> </div>
			<div className="right-topbar"> 
				<div className="bar-items">
					<BarItem link="tel:09555235231" text=" +91-9555-235-231" icon={faPhoneAlt}
						msg="Call Us At"/>
					<BarItem link="mailto:info.psyment@gmail.com" text=" info.psyment@gmail.com" 
					icon={faEnvelope} msg="E-Mail Us" />
				</div>
				<Header /> 
			</div>
		</div>
	) ;
}

export default TopBar ;