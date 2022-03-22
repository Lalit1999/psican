import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { Link } from'react-router-dom' ;

import Image from '../images/Psyment.webp' ;
import './Footer.css' ;

const Address = () => {
	return (
		<div className='footer-right'>
			<div>
				<p><FontAwesomeIcon icon = {faMap} />&nbsp;Unit No. 4, First Floor, CSC, Pocket B & C, Phase - 4, Ashok Vihar, Delhi - 110052.</p>
				<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</p>
				<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;info.psyment@gmail.com</p>
			</div>
		</div>
	) ;
}

const FooterLinks = () => {
	return (
		<div className="footer-links">
			<Link to="/privacy-policy"> Privacy Policy </Link>
			<Link to="/refund-policy"> Refund Policy </Link>
			<Link to="/terms-condition"> Terms & Conditions </Link>
		</div>
	) ;
}

const FooterMenu = () => {
	return (
		<div className="footer-links">
			<Link to="/test"> Tests </Link>
			<Link to="/consult"> Consult </Link>
			<Link to="/contact"> Contact </Link>
		</div>
	) ;
}

const Footer = () => {
	return(
		<div className='psyment-footer'>
			<div className="footer-logo"> <img src={Image} alt="logo" /> </div>
			<Address />
			<FooterMenu />
			<FooterLinks />
		</div>
	) ;
}

export default Footer ;
