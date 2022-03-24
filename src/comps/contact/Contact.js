import ContactForm from './ContactForm.js' ;
import Title from '../title/Title.js' ;
// import './Contact.css' ;

const Contact = () => {	
	return(
		<div>
			<Title name = 'Contact Us' items={["Home", "Contact Us"]}/>
			<div className="login-con"> <ContactForm /> </div>
		</div>
	) ;
}

export default Contact ;