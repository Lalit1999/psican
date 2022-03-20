import React from 'react' ;
import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { Link } from'react-router-dom' ;
// import GoogleMapReact from 'google-map-react' ;

import './Footer.css' ;

const link = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.101514834542!2d77.1656775254471!3d28.68812822958336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03cb3bdd2fff%3A0x396a094b8bb9d820!2sORN%20Remedies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1597299689157!5m2!1sen!2sin" ;

// const location = {
//   address: 'CSC, Unit No. 4, First Floor, Sector A, Pocket B&C, Phase 4, Ashok Vihar, Delhi, 110052',
//   lat: 28.6838276,
//   lng: 77.1669911,
// }

// const LocationPin = ({ text }) => (
  // <div className="pin">
    // <FontAwesomeIcon icon = {faMapMarkerAlt} />
    // <p className="pin-text">{text}</p>
//   </div>
// )
						// <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyDyiIVEfjI_mTICG90FWJ-Xnj-3c_1wCRc' }} defaultCenter={location} defaultZoom={17} >
					 //       <LocationPin lat={location.lat} lng={location.lng} text={location.add} />
					 //    </GoogleMapReact>

const Address = () => {
	return (
		<div className = 'conte'>
			<h3 className="contact-info">Contact Information</h3>
			<div>
				<p><FontAwesomeIcon icon = {faMap} />&nbsp;Unit No. 4, First Floor, CSC, Pocket B & C, Phase - 4, Ashok Vihar, Delhi - 110052.</p>
				<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</p>
				<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;info.psyment@gmail.com</p>
			</div>
			<div className="footer-links">
				<Link to="/privacy-policy"> Privacy Policy </Link>
				<p> | </p>
				<Link to="/refund-policy"> Refund Policy </Link>
				<p> | </p>
				<Link to="/terms-condition"> Terms & Conditions </Link>
			</div>
		</div>
	) ;
}

const Footer = () => {
	const width = (window.screen.availWidth > 923)?'600':'350'
	return(
		<div className = 'ic' id="footer">
			<div className = 'map'>
				<div className="mapouter">
					<div className="gmap_canvas">
						<iframe title = "map" width={width} height="300" id="gmap_canvas" src={link} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
					</div>
				</div>
			</div>
			<div>
				<Address />
			</div>
		</div>
	) ;
}

export default Footer ;
