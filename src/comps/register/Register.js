import React, {useState, useEffect} from 'react' ;

import Redirect from '../redirect/Redirect.js' ;
import { addNotif} from '../notif.js' ;
import {invalidEmail, invalidMobile, invalidPass, isBlank, isMaxMin, invalidName} from '../valid.js' ;
import Title from '../title/Title.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import Number from '../signup/number/Number.js' ;
import Dropdown from '../signup/dropdown/Dropdown.js' ;
import '../signup/signup.css' ;

const initPerson = {
	name: '' ,		email: '' ,		password: '',		
	repass: '',		mobile: '',
	age : 0,		gender :'',		
} ;

const Register = (props) => {
	const [data, setData] = useState({}) ;
	const [error, setError] = useState('') ;

	useEffect( () => (props.mode === 'edit')?setData(props.init):setData(initPerson) , [props.mode, props.init]) ;

	const sendRegisterRequest = () => {
		if(props.mode === 'edit')
		{	addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/users/me',{
				method : 'PATCH' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + props.token} ,
				body :JSON.stringify(data) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				
				addNotif('Successfully Updated Profile', 'success') ;

				props.loadUser(data) ;
				props.edit() ;
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
				body :JSON.stringify(data) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				setData(initPerson) ;
				
				addNotif('Successfully Registered', 'success') ;

				props.loadUser(data) ;
			}) 
			.catch( err  => {
				console.log(err) ;
				
				addNotif('Error while registration' , 'error') ;
				props.history.push('/');
			}) ;
		}
	}

	const onNextClick = () => {
		const {name, password, repass, email, mobile, gender, age} = data ;
		if(error !== '')
			setError('You must fix all errors before proceeding') ;
		else
		{
			if( invalidEmail(email) )
				setError(invalidEmail(email)) ;
			else if(invalidName(name) )
				setError(invalidName(name)) ;
			else if (props.mode !== 'edit' && invalidPass(password, repass) )
				setError(invalidPass(password, repass)) ;
			else if (invalidMobile(mobile) )
				setError(invalidMobile(mobile)) ;
			else if(isBlank(gender,'Gender') )
				setError(isBlank(gender,'Gender')) ;
			else if(isMaxMin(age,'Age',10,100) )
				setError(isMaxMin(age,'Age',10,100)) ;
			else
			  	sendRegisterRequest() ;
		}
	}

	const checkEditMode = () => {
		if(props.mode !== 'edit')
			return (
				<React.Fragment>
					<Text label="Password" name="password" value={data.password} type="pw" onChange={onInputChange}/>
					<Text label="Retype Password" name="repass" value={data.repass} type="pw" onChange={onInputChange}/>
				</React.Fragment>
			) ;
	}

	const onInputChange = (event) => {
		setData({...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	const onNumberChange = (event) => {
		setData({...data, [event.target.name] : parseInt(event.target.value,10)} ) ;
		setError('') ;
	}

	const personForm1 = () => {
		const {name, email, mobile,age, gender} = data ;
		return (
			<div>	
				<LoginForm title="Enter Details " error={error} b2="Submit" onb2Click={onNextClick} >
					<Text label="Name" name="name" value={name} onChange={onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={onInputChange}/>
					{ checkEditMode() } 
					<Text label="Mobile No." name="mobile" value={mobile} onChange={onInputChange}/>
					<Number label="Age"	name="age" value={age} min={10} max={100} onChange={onNumberChange}/>
					<Dropdown label="Gender" name="gender" value={gender} options={['','M','F']} onChange={onInputChange}/>
				</LoginForm>
			</div>
			) ;
	}
	
    if (props.mode === 'edit')
		return <div>{personForm1()}</div> ;
	else
	{	if(props.user.name)
		{
			if(props.location.search)	{
				let q = props.location.search.split('?')[1].split('=') ;
				if (q[0] === 'rdr')
				{	switch(q[1])
					{
						case 'ustop' : return <Redirect to='/test/ustop' /> ;
						case 'leta' : return <Redirect to='/test/leta' /> ;
						case 'accis' : return <Redirect to='/test/accis' /> ;
						case 'consult' : return <Redirect to='/consult' /> ;
						case 'aequess' : return <Redirect to='/program/AEQUESS' /> ;
						default : return <Redirect to='/' /> ;
					}	
				}
				else	
					return <Redirect to='/' /> ;
			}
			else	
				return <Redirect to='/' /> ;
		}
		else
		{	return(
				<div>
					<Title name = 'Register' items={["Home -", "Register"]}/>
					<div className="su-blue-bg">
						{personForm1()}
					</div>
				</div>
			) ;
		}
	}
}

export default Register ;