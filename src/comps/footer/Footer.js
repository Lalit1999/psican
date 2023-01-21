import { Link } from'react-router-dom' ;

import DownBar from '../downbar/DownBar.js' ;
import './Footer.css' ;

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
