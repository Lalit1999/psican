import React from 'react' ;

import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import '../signup.css' ;

const initPerson = {
	email: '' ,
	password: '',
} ;

const initSchool = {
	short: '',
	password: '',
}

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
			name: (this.state.data.email?this.state.data.email:this.state.data.short),
		}

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
		.then(data => {	
			// console.log(data) ;
			this.props.loadUser(data[0]);
			this.props.history.push('/') ; 
		}) 
		.catch( err  => {
			console.log(err) ;
			this.setState({error: 'Incorrect Username OR Password'});
		}) ;
	}

	onLoginClick = () => {
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			switch(this.state.mode)
			{
				case 'person' : if(this.state.data.password === '')
									this.setState({error: 'Password can not be blank'});
              				    else if(this.state.data.email === '')
									this.setState({error: 'Email can not be blank'});
								else
								  	this.sendLoginRequest() ;
							    break ;

				case 'school' : if(this.state.data.short === '')
									this.setState({error: 'Short Name can not be blank'});
								else if(this.state.data.password === '')
									this.setState({error: 'Password can not be blank'});
							    else
								  	this.sendLoginRequest() ;
								break ;

				default : console.log("You probably encountered a problem") ;
			}
		}
	}

	onEmailChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else
		{	if(this.state.error === 'E-Mail can not be blank' ) 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, email : event.target.value} }) ;
	}

	onPWChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Password can not be blank'}) ;
		else
		{	if(this.state.error === 'Password can not be blank' )
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, password : event.target.value} }) ;
	}

	onShortChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Short Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Short Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, short : event.target.value} }) ;
	}

	createSelect = () => {
		return (
			<div className="select-con">
				<h3 className="reg-as"> Login For : </h3>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'person',	data: initPerson})}
				>
					 Individual </button>
				<h4 className="or"> OR </h4>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'school',	data: initSchool })}
				>
					 School </button>
			</div>
			) ;
	}

	personLogin = () => {
		const { email, password} = this.state.data ;
		return (
			<div>	
				<LoginForm heading=" Person Login " error={this.state.error}
					b1="Register" b1type="link" to="/register" close="close"
					b2="Login" onb2Click={this.onLoginClick} >
					<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPWChange}/>
				</LoginForm>
			</div>
			) ;
	}

	schoolLogin = () => {
		const {short, password} = this.state.data ;
		return (
			<div>	
				<LoginForm heading=" School Login " error={this.state.error}
					b1="Register" b1type="link" to="/register" close="close"
					b2="Login" onb2Click={this.onLoginClick} >
					<Text label="Short Name" value={short} onChange={this.onShortChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPWChange}/>
				</LoginForm>
			</div>
			) ;
	}

	checkMode = () => {
		switch(this.state.mode)
		{
			case 'select' : return this.createSelect() ;
			case 'person' : return this.personLogin() ;
			case 'school' : return this.schoolLogin() ;
			default : return 'You probably encountered a problem' ;
		}
	}

	render()
	{
		return(
			<div>
				<Title name = 'Login' items={["Home -", "Login"]}/>
				<div className="blue-bg">
					{this.checkMode()}
				</div>
			</div>
		) ;
	}
}

export default Login ;