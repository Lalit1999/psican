import ContactForm from './ContactForm.js' ;
import Title from '../title/Title.js' ;
import './contact.css' ;

const Contact = () => {	
	return(
		<div className="contact-con">
			<Title name = 'Contact Us' items={["Home", "Contact Us"]}/>
			<div className="login-con"> <ContactForm /> </div>
		</div>
	) ;
}

export default Contact ;