import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

import ContactForm from './ContactForm.js' ;
import Heading from '../Heading/Heading.js' ;
import Title from '../title/Title.js' ;
import './contact.css' ;

const Contact = () => {	
	return(
		<div className="contact-con">
			<Title name = 'Contact Us' items={["Home", "Contact Us"]}/>
			<div className="contact-page">
				<div className="contact-psyment">
					<Heading text="Contact PSYMENT" />
					<div className="contact-links">
						<p>
							<a href="https://www.google.com/maps/place/ORN+Remedies+Pvt.+Ltd./@28.6837717,77.1702569,18z/data=!4m5!3m4!1s0x390d03cb3bdd2fff:0x396a094b8bb9d820!8m2!3d28.6837717!4d77.1713512" target="_blank" rel="noreferrer"><FontAwesomeIcon icon = {faMap} /></a>
							<span>&nbsp;Unit No. 4, F.F., CSC, Pocket B & C, Phase - 4, Ashok Vihar, Delhi - 110052</span>
						</p>
						<p>
							<a href="tel:09555235231" ><FontAwesomeIcon icon = {faPhoneAlt} /></a>
							<span>&nbsp;+91-9555-235-231</span>
						</p>
						<p>
							<a href="mailto:info.psyment@gmail.com"><FontAwesomeIcon icon = {faEnvelope} /></a>
							<span>&nbsp;info.psyment@gmail.com</span>
						</p>
					</div>
				</div>
				<div className="login-con"> <ContactForm /> </div>
			</div>
		</div>
	) ;
}

export default Contact ;