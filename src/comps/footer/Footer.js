import React from 'react' ;
import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

import './Footer.css' ;

class Footer extends React.Component
{	
	render()
	{
		return(
			<div className = 'ic'>
				<div className = 'map'>
					<div className="mapouter">
						<div className="gmap_canvas">
							<iframe title = "map" width="600" height="300" id="gmap_canvas" 
							src="https://maps.google.com/maps?q=orn%20remandies%20private%20limited%20deep%20enclave%20ashok%20vihar%20&t=&z=13&ie=UTF8&iwloc=&output=embed" 
							frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
						</div>
					</div>
				</div>
				<div>
					<div className = 'conte'>
						<h3><ins>Contact Information</ins></h3>
						<div>
							<p><FontAwesomeIcon icon = {faMap} />&nbsp;Unit No. 4 , First Floor , CSC ,
											Pocket B & C , Phase - 4 , Ashok Vihar , Delhi - 110052.</p>
							<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</p>
							<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;info.psyment@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Footer ;
