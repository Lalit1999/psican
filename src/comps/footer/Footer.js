import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { Link } from'react-router-dom' ;

import Image from '../../images/Psyment.webp' ;
import './Footer.css' ;

const Address = () => {
	return (
		<div className='footer-right'>
			<div>
				<p><a href="https://www.google.com/maps/place/ORN+Remedies+Pvt.+Ltd./@28.6837717,77.1702569,18z/data=!4m5!3m4!1s0x390d03cb3bdd2fff:0x396a094b8bb9d820!8m2!3d28.6837717!4d77.1713512" target="_blank" rel="noreferrer"><FontAwesomeIcon icon = {faMap} />&nbsp;Unit No. 4, F.F., CSC, Pocket B & C, Phase - 4, Ashok Vihar, Delhi - 110052.</a></p>
				<p id="footer-2"><a href="tel:09555235231" ><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</a></p>
				<p><a href="mailto:info.psyment@gmail.com"><FontAwesomeIcon icon = {faEnvelope} />&nbsp;info.psyment@gmail.com</a></p>
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
