import React from 'react' ;
import { Redirect } from 'react-router-dom';

import { addNotif, remNotif} from '../../notif.js' ;
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
		mode : 'select' ,
		data : {} ,
		error: '' 
	}

	sendLoginRequest = () => {
		
		const obj = {
			type: this.state.mode,
			password: this.state.data.password,
			email: this.state.data.email,
		}

		const id = addNotif('Please Wait...') ;

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
			remNotif(id) ;

			this.setState({data: initObj});
			addNotif('Successfully Logged In', 'success') ;
			
			this.props.loadUser(data) ;

			this.props.history.push('/');
		})  
		.catch( err  => {
			console.log(err) ;
			remNotif(id) ;	
			addNotif(err.message, 'error') ;	
			this.setState({error: 'Incorrect Username OR Password'});
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

	createSelect = () => {
		return (
			<div className="select-con">
				<h3 className="reg-as"> Login For : </h3>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'person',	data: initObj})}
				>
					 Individual </button>
				<h4 className="or"> OR </h4>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'school',	data: initObj})}
				>
					 School </button>
			</div>
			) ;
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
				</LoginForm>
			</div>
			) ;
	}

	checkMode = () => {
		switch(this.state.mode)
		{
			case 'select' : return this.createSelect() ;
			case 'person': case 'school' : return this.createLogin() ;
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
					<div className="blue-bg">
						{this.checkMode()}
					</div>
				</div>
			) ;
		}
	}
}

export default Login ;