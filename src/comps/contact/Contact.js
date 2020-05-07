import React from 'react' ;
import valid from 'validator' ;

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
		if(this.state.error !== '')
			this.setState({error: 'You cannot proceed without fixing all the errors'});
		else if(this.state.name === '')
			this.setState({error: 'Name can not be blank'});
	  	else if(this.state.email === '')
			this.setState({error: 'E-Mail can not be blank'});
		else if(this.state.mobile === '')
			this.setState({error: 'Mobile No. can not be blank'});
	  	else if(this.state.message === '')
			this.setState({error: 'Message can not be blank'});
		else
			console.log(this.state) ;
	}

	onNameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({name : event.target.value}) ;
	}

	onEmailChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else if(!valid.isEmail(event.target.value))
			this.setState({error: 'This might not be a valid E-Mail'});
		else
		{	if(this.state.error === 'E-Mail can not be blank' || this.state.error === 'This might not be a valid E-Mail') 
				this.setState({error: ''}) ;
		}
		this.setState({email : event.target.value}) ;
	}

	onMobileChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Mobile No. can not be blank'}) ;
		else if(!valid.isNumeric(event.target.value))
			this.setState({error: 'Mobile No. must only contain digits or -'});
		else if(event.target.value.length < 10)
			this.setState({error: 'Mobile No. must be at least 10 digits long'}) ;
		else
		{	if(this.state.error === 'Mobile No. can not be blank' || this.state.error === 'Mobile No. must only contain digits or -' || this.state.error === 'Mobile No. must be at least 10 digits long')
					this.setState({error: ''}) ;
		}
		this.setState({mobile : event.target.value }) ;
	}

	onMessageChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Message can not be blank'}) ;
		else
		{	if(this.state.error === 'Message can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({message : event.target.value}) ;
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
						<Text label="Name" value={name} onChange={this.onNameChange}/>
						<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
						<Text label="Mobile No." value={mobile} onChange={this.onMobileChange}/>
						<TextArea label="Message" value={message} r={3} c={20} onChange={this.onMessageChange} />
					</LoginForm>
				</div>
			</div>
		) ;
	}
}

export default Contact ;