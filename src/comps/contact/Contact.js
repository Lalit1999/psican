import React from 'react' ;

import { addNotif } from '../notif.js' ;
import { invalidEmail, invalidMobile, isBlank, invalidName } from '../valid.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Title from '../title/Title.js' ;
import './Contact.css' ;

class Contact extends React.Component
{	state = {
		error: '',
		name: '',
		email: '',
		mobile: '',
		message: ''
	}

	onSendClick = () => {
		const {name, mobile, email, message, error} = this.state ;
		if(error !== '')
			this.setState({error: 'You cannot proceed without fixing all the errors'});
		else if(invalidName(name))
			this.setState({error: invalidName(name)});
	  	else if(invalidEmail(email))
			this.setState({error: invalidEmail(email)});
		else if(invalidMobile(mobile))
			this.setState({error: invalidMobile(mobile)});
	  	else if(isBlank(message, 'Message'))
			this.setState({error: isBlank(message, 'Message')});
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
				this.setState({name: '', mobile: '', message: '', email: ''});
				addNotif('Successfully Received Message/Feedback', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				addNotif('There was a problem with sending message', 'error') ;
			}) ;
		}
	}

	onInputChange = (event) => {
		this.setState({	[event.target.name] : event.target.value, error: ''} ) ;
	}

	render()
	{	const {name, email, mobile, message} = this.state ;
		return(
			<div>
				<div>
					<Title name = 'Contact Us' items={["Home -", "Contact Us"]}/>
				</div>
				<div className = 'align'>
					<LoginForm title=" Send Your Message / Feedback " error={this.state.error}
						b2="Send &gt;&nbsp;" onb2Click={this.onSendClick} close>
						<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
						<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
						<Text label="Mobile No." name="mobile" value={mobile} onChange={this.onInputChange}/>
						<TextArea label="Message" name="message" value={message} r={3} c={20} onChange={this.onInputChange} />
					</LoginForm>
				</div>
			</div>
		) ;
	}
}

export default Contact ;