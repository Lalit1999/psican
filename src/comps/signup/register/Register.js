import React from 'react' ;
import {Redirect} from 'react-router-dom';

import { addNotif } from '../../notif.js' ;
import { invalidEmail, invalidMobile, invalidPass, isBlank, isMaxMin, invalidName } from '../../valid.js' ;
import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import Number from '../number/Number.js' ;
import Dropdown from '../dropdown/Dropdown.js' ;
import '../signup.css' ;

const initPerson = {
	name: '' ,		email: '' ,		password: '',		
	repass: '',		mobile: '',
	age : 0,		gender :'',		
} ;

class Register extends React.Component
{	state = {
		data : {} ,
		error: '' 
	}

	componentDidMount = () => {
		if(this.props.mode === 'edit')
			this.setState({data: this.props.init});
		else
			this.setState({data: initPerson})
	}

	sendRegisterRequest = () => {
		if(this.props.mode === 'edit')
		{	addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/users/me',{
				method : 'PATCH' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.token} ,
				body :JSON.stringify(this.state.data) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				addNotif('Successfully Updated Profile', 'success') ;

				this.props.loadUser(data) ;
				this.props.edit() ;
			}) 
			.catch( err  => {
				console.log(err) ;
				addNotif('Error updating profile' , 'error') ;
			}) ;
		}
		else
		{	addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/users' ,{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json'} ,
				body :JSON.stringify(this.state.data) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				this.setState({data: initPerson});
				addNotif('Successfully Registered', 'success') ;

				this.props.loadUser(data) ;
				this.props.history.push('/');
			}) 
			.catch( err  => {
				console.log(err) ;
				addNotif('Error while registration' , 'error') ;
				this.props.history.push('/');
			}) ;
		}
	}

	onNextClick = () => {
		const {name, password, repass, email, mobile, gender, age} = this.state.data ;
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			if( invalidEmail(email) )
				this.setState( {error: invalidEmail(email)} )
			else if(invalidName(name) )
				this.setState( {error: invalidName(name)} )
			else if (this.props.mode !== 'edit' && invalidPass(password, repass) )
				this.setState( {error: invalidPass(password, repass)} )
			else if (invalidMobile(mobile) )
				this.setState( {error: invalidMobile(mobile)} )
			else if(isBlank(gender,'Gender') )
				this.setState( {error: isBlank(gender,'Gender')} )
			else if(isMaxMin(age,'Age',10,100) )
				this.setState( {error: isMaxMin(age,'Age',10,100)} )
			else
			  	this.sendRegisterRequest() ;
		}
	}

	checkEditMode = () => {
		if(this.props.mode === 'edit')
			return null ;
		else
			return (
				<React.Fragment>
					<Text label="Password" name="password" value={this.state.data.password}
						 type="pw" onChange={this.onInputChange}/>
					<Text label="Retype Password" name="repass" value={this.state.data.repass} 
						type="pw" onChange={this.onInputChange}/>
				</React.Fragment>
			) ;
	}

	onInputChange = (event) => {
		this.setState({data: {...this.state.data, 
								[event.target.name] : event.target.value}, error: '' }) ;
	}

	onNumberChange = (event) => {
		this.setState({data: {...this.state.data, 
								[event.target.name] : parseInt(event.target.value,10)}, error: '' }) ;
	}

	personForm1 = () => {
		const {name, email, mobile,age, gender} = this.state.data ;
		return (
			<div>	
				<LoginForm title="Enter Details " error={this.state.error}
					b2="Register" onb2Click={this.onNextClick} >
					<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					{ this.checkEditMode() } 
					<Text label="Mobile No." name="mobile" value={mobile} onChange={this.onInputChange}/>
					<Number label="Age"	name="age" value={age} min={10} max={100} onChange={this.onNumberChange}/>
					<Dropdown label="Gender" name="gender" value={gender} options={['','M','F']} onChange={this.onInputChange}/>
				</LoginForm>
			</div>
			) ;
	}
	
	render()
	{   if (this.props.mode === 'edit')
			return (	<div>{this.personForm1()}</div>	) ;
		else
		{	if(this.props.user.name)
				return <Redirect to='/' />
			else
			{	return(
					<div>
						<Title name = 'Register' items={["Home -", "Register"]}/>
						<div className="su-blue-bg">
							{this.personForm1()}
						</div>
					</div>
				) ;
			}
		}
	}
}

export default Register ;