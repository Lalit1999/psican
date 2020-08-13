import React from 'react' ;
import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

import './Footer.css' ;

class Footer extends React.Component
{	
	render()
	{	if(window.screen.availWidth > 923)
		{	return(
				<div className = 'ic' id="footer">
					<div className = 'map'>
						<div className="mapouter">
							<div className="gmap_canvas">
								<iframe title = "map" width="600" height="300" id="gmap_canvas" 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.101514834542!2d77.1656775254471!3d28.68812822958336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03cb3bdd2fff%3A0x396a094b8bb9d820!2sORN%20Remedies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1597299689157!5m2!1sen!2sin" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
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
		else
		{	return(
				<div className = 'ic' id="footer" ref={this.props.footer}>
					<div className = 'map'>
						<div className="mapouter">
							<div className="gmap_canvas">
								<iframe title = "map" width="350" height="300" id="gmap_canvas" 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.101514834542!2d77.1656775254471!3d28.68812822958336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03cb3bdd2fff%3A0x396a094b8bb9d820!2sORN%20Remedies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1597299689157!5m2!1sen!2sin" 
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
}

export default Footer ;
