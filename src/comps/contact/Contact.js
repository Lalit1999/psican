import React, {useState} from 'react' ;

import { addNotif } from '../notif.js' ;
import { invalidEmail, invalidMobile, isBlank, invalidName } from '../valid.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Title from '../title/Title.js' ;
import './Contact.css' ;

const initData = {	name: '',	email: '',	mobile: '',	message: ''	} ;

const Contact = () => {	
	const [error, setError] = useState('') ;
	const [data, setData] = useState(initData) ;

	const onSendClick = () => {
		const {name, mobile, email, message} = data ;

		if(error !== '')
			setError('You cannot proceed without fixing all the errors' ) ;
		else if(invalidName(name))
			setError(invalidName(name) ) ;
	  	else if(invalidEmail(email))
			setError(invalidEmail(email) ) ;
		else if(invalidMobile(mobile))
			setError(invalidMobile(mobile) ) ;
	  	else if(isBlank(message, 'Message'))
			setError(isBlank(message, 'Message') ) ;
		else
		{	const obj = { name, mobile, message, email } ;

			addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/contact',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json'} ,
				body : JSON.stringify(obj) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				setData(initData) ;
				addNotif('Successfully Received Message/Feedback', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				addNotif('There was a problem with sending message', 'error') ;
			}) ;
		}
	}

	const onInputChange = (event) => {
		setData({...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	return(
		<div>
			<div>
				<Title name = 'Contact Us' items={["Home -", "Contact Us"]}/>
			</div>
			<div className = 'align'>
				<LoginForm title=" Send Your Message / Feedback " error={error}
					b2="Send &gt;&nbsp;" onb2Click={onSendClick} close>
					<Text label="Name" name="name" value={data.name} onChange={onInputChange}/>
					<Text label="E-Mail" name="email" value={data.email} onChange={onInputChange}/>
					<Text label="Mobile No." name="mobile" value={data.mobile} onChange={onInputChange}/>
					<TextArea label="Message" name="message" value={data.message} r={3} c={20} onChange={onInputChange} />
				</LoginForm>
			</div>
		</div>
	) ;
}

export default Contact ;