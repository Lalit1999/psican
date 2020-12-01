import React from 'react' ;
import { Redirect } from 'react-router-dom';

import { addNotif } from '../../notif.js' ;
import { invalidEmail, isBlank } from '../../valid.js' ;
import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import '../signup.css' ;

const initObj = {
	email: '' ,
	password: '',
} ;

class Login extends React.Component
{	state = {
		mode : 'person' ,
		data : initObj ,
		error: '' 
	}

	sendLoginRequest = () => {
		
		const obj = {
			password: this.state.data.password,
			email: this.state.data.email,
		}

		addNotif('Please Wait...') ;

		fetch('https://psy-api.herokuapp.com/login',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify(obj) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			this.setState({data: initObj});
			addNotif('Successfully Logged In', 'success') ;
			
			this.props.loadUser(data) ;
			this.props.history.push('/');
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('Error Logging in', 'error') ;	
			this.setState({error: 'Incorrect Username OR Password'});
		}) ;
	}

	onSendReqClick = () => {
		const obj = {
			email: this.state.data.email,
		}

		addNotif('Please Wait...') ;

		fetch('https://psy-api.herokuapp.com/forgot',{
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
		.then(data =>{	
			addNotif('Request sent for password reset', 'success') ;
			
			this.props.history.push('/');
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('E-Mail invalid', 'error') ;	
			this.setState({error: 'E-Mail doesn\'t exist in database'});
		}) ;
	}

	onLoginClick = () => {
		const {email, password} = this.state.data ;
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			if( invalidEmail(email) )
				this.setState( {error: invalidEmail(email)} )
			else if ( isBlank(password, 'Password') )
				this.setState( {error: isBlank(password, 'Password')} )
			else
			  	this.sendLoginRequest() ;
		}
	}

	onInputChange = (event) => {
		this.setState({data: {...this.state.data, 
								[event.target.name] : event.target.value}, error: '' }) ;
	}

	createLogin = () => {
		const { email, password} = this.state.data ;
		return (
			<div>	
				<LoginForm heading=" Login " error={this.state.error}
					b1="Register" b1type="link" to="/register" near="near"
					b2="Login" onb2Click={this.onLoginClick} >
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					<Text label="Password" name="password" value={password} type="pw" 
							onChange={this.onInputChange}/>
					<p className="fp" onClick={()=>this.setState({mode:'fp'})}> Forgot Password ? </p>
				</LoginForm>
			</div>
			) ;
	}

	resetPassword = () => {
		const { email} = this.state.data ;
		return (
			<div>	
				<LoginForm heading=" Reset Password " error={this.state.error}
					b1="Register" b1type="link" to="/register" near="near"
					b2="Send Request" onb2Click={this.onSendReqClick} >
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
				</LoginForm>
				<p className="nfp"> <strong>*Note: </strong>If you enter an E-Mail that exists in our database then you will recieve a mail containing your new password. You can re-change your password once you log back in. </p>
			</div>
			) ;
	}

	checkMode = () => {
		switch(this.state.mode)
		{	case 'person': return this.createLogin() ;
			case 'fp' : return this.resetPassword() ;
			default : return 'You probably encountered a problem' ;
		}
	}

	render()
	{	if(this.props.user.name)
			return <Redirect to='/' />
		else
		{	return(
				<div>
					<Title name = 'Login' items={["Home -", "Login"]}/>
					<div className="su-blue-bg">
						{this.checkMode()}
					</div>
				</div>
			) ;
		}
	}
}

export default Login ;