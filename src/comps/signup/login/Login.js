import React, {useState} from 'react' ;
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

const Login = (props) => {
	const [mode, setMode] = useState('person') ;
	const [data, setData] = useState(initObj) ;
	const [error, setError] = useState('') ;

	const sendLoginRequest = () => {
		
		const { password, email	} = data ;

		addNotif('Please Wait...') ;

		fetch('https://psy-api.herokuapp.com/login',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify({ password, email	}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			setData(initObj);
			addNotif('Successfully Logged In', 'success') ;
			
			props.loadUser(data) ;
			props.history.push('/');
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('Error Logging in', 'error') ;	
			setError('Incorrect Username OR Password');
		}) ;
	}

	const onSendReqClick = () => {
		addNotif('Please Wait...') ;

		fetch('https://psy-api.herokuapp.com/forgot',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body : JSON.stringify({ email: data.email}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Request sent for password reset', 'success') ;
			
			props.history.push('/');
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('E-Mail invalid', 'error') ;	
			setError('E-Mail doesn\'t exist in database');
		}) ;
	}

	const onLoginClick = () => {
		const {email, password} = data ;
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( invalidEmail(email) )
				setError(invalidEmail(email) ) ;
			else if ( isBlank(password, 'Password') )
				setError(isBlank(password, 'Password') ) ;
			else
			  	sendLoginRequest() ;
		}
	}

	const onInputChange = (event) => {
		setData({...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	const createLogin = () => {
		const { email, password} = data ;
		return (
			<div>	
				<LoginForm heading=" Login " error={error}
					b1="Register" b1type="link" to="/register" near="near"
					b2="Login" onb2Click={onLoginClick} >
					<Text label="E-Mail" name="email" value={email} onChange={onInputChange}/>
					<Text label="Password" name="password" value={password} type="pw" onChange={onInputChange}/>
					<p className="fp" onClick={()=> setMode('fp') }> Forgot Password ? </p>
				</LoginForm>
			</div>
			) ;
	}

	const resetPassword = () => {
		const { email} = data ;
		return (
			<div>	
				<LoginForm heading=" Reset Password " error={error}
					b1="Register" b1type="link" to="/register" near="near"
					b2="Send Request" onb2Click={onSendReqClick} >
					<Text label="E-Mail" name="email" value={email} onChange={onInputChange}/>
				</LoginForm>
				<p className="nfp"> <strong>*Note: </strong>If you enter an E-Mail that exists in our database then you will recieve a mail containing your new password. You can re-change your password once you log back in. </p>
			</div>
			) ;
	}

	const checkMode = () => {
		switch(mode)
		{	case 'person': return createLogin() ;
			case 'fp' : return resetPassword() ;
			default : return 'You probably encountered a problem' ;
		}
	}

	if(this.props.user.name)
		return <Redirect to='/' />
	else
	{	return(
			<div>
				<Title name = 'Login' items={["Home -", "Login"]}/>
				<div className="su-blue-bg"> {checkMode()} </div>
			</div>
		) ;
	}
}

export default Login ;