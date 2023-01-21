import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { Link } from'react-router-dom' ;

import DownBar from '../downbar/DownBar.js' ;
import './Footer.css' ;

const Address = () => {
	return (
		<div className="footerIcons">
			<p><a href="https://www.google.com/maps/place/ORN+Remedies+Pvt.+Ltd./@28.6837717,77.1702569,18z/data=!4m5!3m4!1s0x390d03cb3bdd2fff:0x396a094b8bb9d820!8m2!3d28.6837717!4d77.1713512" target="_blank" rel="noreferrer"><FontAwesomeIcon icon = {faMap} /></a></p>
			<p id="footer-2"><a href="tel:09555235231" ><FontAwesomeIcon icon = {faPhoneAlt} /></a></p>
			<p><a href="mailto:info.psyment@gmail.com"><FontAwesomeIcon icon = {faEnvelope} /></a></p>
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

const Footer = () => {
	return(
		<div className="psymentFooterCon">
			<div className="aboveFooter">
				<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
				<Address />
			</p>
			</div>
			<div className='psyment-footer'>
				<FooterLinks />
				<DownBar />
			</div>
		</div>
	) ;
}

export default Footer ;
