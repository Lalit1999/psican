import React from 'react' ;
import valid from 'validator' ;
import {Redirect, Link} from 'react-router-dom';

import { addNotif, remNotif } from '../../notif.js' ;
import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import TextArea from '../text/TextArea.js' ;
import Number from '../number/Number.js' ;
import Dropdown from '../dropdown/Dropdown.js' ;
import '../signup.css' ;

const initPerson = {
	name: '' ,
	email: '' ,
	password: '',
	repass: '',
	mobile: '',
	age : 0,
	gender :'',
	height: 0,
	weight: 0,
	mother: '',
	father: '',
	status: '',
	address: '',
	address2: '',
	working: '',
	sibling: 0,
	hobbies: '',
	family: '',
} ;

const initSchool = {
	name: '',
	password: '',
	repass: '',
	mobile: '',
	email: '',
	person: '',
	p_phone: '',
	principal: '',
	pr_phone: '',
	type: '',
	students: 0,
	teachers: 0,
	medium: '',
	address: '',
	class_f: '',
	class_t: '',
}

class Register extends React.Component
{	state = {
		mode : 'select' ,
		data : {} ,
		error: '' 
	}

	createSelect = () => {
		return (
			<div className="select-con">
				<h3 className="reg-as"> Register as : </h3>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'pr-reg-1',	data: initPerson})}
				>
					 Individual </button>
				<h4 className="or"> OR </h4>
				<button className="select-btn" onClick={() => this.setState({
					mode: 'sc-reg-1',	data: initSchool })}
				>
					 School </button>
			</div>
			) ;
	}

	sendRegisterRequest = () => {
		let type = (this.state.mode === 'pr-reg-3')?'users':'school' ;
		let obj = (type==='users')?initPerson:initSchool ;

		const id = addNotif('Please Wait...') ;

		fetch('https://psy-api.herokuapp.com/' + type,{
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
			remNotif(id) ;

			this.setState({mode: 'reg-success', data: obj});
			addNotif('Successfully Logged In', 'success') ;

			this.props.loadUser(data) ;
			this.props.history.push('/');
		}) 
		.catch( err  => {
			console.log(err) ;
			remNotif(id) ;	
			addNotif(err.message, 'error') ;
			this.setState({mode: 'reg-fail'});
		}) ;
	}

	onPrevClick = () => {
		switch(this.state.mode)
		{
			case 'pr-reg-2' : this.setState({mode : 'pr-reg-1'});
								break ;
			case 'pr-reg-3' : this.setState({mode: 'pr-reg-2'});
								break ;
			case 'sc-reg-2' : this.setState({mode : 'sc-reg-1'});
								break ;
			case 'sc-reg-3' : this.setState({mode: 'sc-reg-2'});
								break ;
			default : console.log("Problem Encountered") ;
		}
	}

	onNextClick = () => {
		const {name, password, repass, email, mobile, father, mother} = this.state.data ;
		const {gender, status, age, height, weight, address2, address} = this.state.data ;
		const {person, p_phone, principal, pr_phone, type, medium} = this.state.data ;
		const {students, teachers, class_f, class_t} = this.state.data ;
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			switch(this.state.mode)
			{
				case 'pr-reg-1' : if(this.isBlank(name,'Name') || this.invalidEmail(email) || this.invalidPass(password, repass) || this.invalidMobile(mobile))
									return true ;
								  else
									this.setState({mode:'pr-reg-2'});
								  break ;
				
				case 'pr-reg-2' : if(this.isBlank(father,'Father \'s Name') || this.isBlank(mother,'Mother\'s Name') || this.isBlank(gender,'Gender') || this.isBlank(status,'Status'))
									return true ;
								  else if(this.isMaxMin(age,'Age',10,65) || this.isMaxMin(height,'Height',100,300) || this.isMaxMin(weight,'Weight',10,250))
									return true ;
								  else
									this.setState({mode:'pr-reg-3'});
								  break ;
				
				case 'pr-reg-3' : if(this.isBlank(address,'Current Address') || this.isBlank(address2,'Permanent Address') )
									return true ;
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				case 'sc-reg-1' : if(this.isBlank(name,'School Name') || this.invalidEmail(email) || this.invalidPass(password, repass) || this.invalidMobile(mobile))
									return true ;
								  else
									this.setState({mode:'sc-reg-2'});
								  break ;

				case 'sc-reg-2' : if(this.isBlank(person,'Registrant Name') || this.isBlank(principal,'Principal Name') || this.invalidMobile(p_phone) || this.invalidMobile(pr_phone))
									return true ;
								  else
									this.setState({mode:'sc-reg-3'});
								  break ;

				case 'sc-reg-3' : if(this.isBlank(address,'Address') || this.isBlank(type,'Type') || this.isBlank(medium,'Medium') || this.isBlank(class_f,'Class From') || this.isBlank(class_t,'Class To'))
									return true ;
								  else if(this.isMaxMin(teachers,'Teachers',5,1000) || this.isMaxMin(students,'Students',50,50000))
									return true ;
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				default : console.log("You probably encountered a problem") ;
			}
		}
	}

	isBlank = (str, field) => {
		if(str === '')
		{	this.setState({error: field + ' can not be blank'}) ;
			return true ;
		}
		else
			return false ;
	}

	invalidEmail = (str) => {
		if(str === '')
		{	this.setState({error: 'E-Mail can not be blank'}) ;
			return true ;
		}
		else if(!valid.isEmail(str))
		{	this.setState({error: 'This might not be a valid E-Mail address'});
			return true ;
		}
		else
			return false ;
	}

	invalidPass = (str, str2) => {
		if(str === '' || str2 === '')
		{	this.setState({error: 'Password can not be blank'}) ;
			return true ;
		}
		else if (str.length < 6 || str2.length < 6 )
		{	this.setState({error: 'Password must be at least 6 digits long'}) ;
			return true ;
		}
		else if ( str !== str2 )
		{	this.setState({error: 'Re-Password must match password'}) ;
			return true ;
		}
		else
			return false ;
	}

	invalidMobile = (str) => {
		if(str === '')
		{	this.setState({error: 'Mobile No. can not be blank'}) ;
			return true ;
		}
		else if(!valid.isNumeric(str))
		{	this.setState({error: 'Mobile No. must only contain digits or -'});
			return true ;
		}
		else if(str.length < 10)
		{	this.setState({error: 'Mobile No. must be at least 10 digits long'}) ;
			return true ;
		}
		else
			return false ;
	}
	
	isMaxMin = (str, field, max, min) => {
		if(str === 0)
		{	this.setState({error: field + ' can not be 0'}) ;
			return true ;
		}
		else if(str < min || str > max)
		{	this.setState({error: field + ' must be between '+ min +' & '+ max}) ;
			return true ;
		}
		else
			return false ;
	}
	
	onInputChange = (event) => {
		this.setState({data: {...this.state.data, 
								[event.target.name] : event.target.value}, error: '' }) ;
	}

	onNumberChange = (event) => {
		this.setState({data: {...this.state.data, 
								[event.target.name] : parseInt(event.target.value)}, error: '' }) ;
	}

	personForm1 = () => {
		const {name, email, password, repass, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					<Text label="Password" name="password" value={password} type="pw" onChange={this.onInputChange}/>
					<Text label="Retype Password" name="repass" value={repass} type="pw" onChange={this.onInputChange}/>
					<Text label="Mobile No." name="mobile" value={mobile} onChange={this.onInputChange}/>
				</LoginForm>
			</div>
			) ;
	}

	personForm2 = () => {
		const {age, gender, status, mother, father, height, weight} = this.state.data ;
		return (
			<div>
				<LoginForm title=" Personal Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Number label="Age"	name="age" value={age} min={10} max={65} onChange={this.onNumberChange}/>
					<Dropdown label="Gender" name="gender" value={gender} options={['','M','F']} onChange={this.onInputChange}/>
					<Text label="Mother's Name" name="mother" value={mother} onChange={this.onInputChange}/>
					<Text label="Father's Name" name="father" value={father} onChange={this.onInputChange}/>
					<Number label="Height (cm)"	name="height" value={height} min={100} max={300} onChange={this.onNumberChange}/>
					<Number label="Weight (kg)"	name="weight" value={weight} min={10} max={250} onChange={this.onNumberChange}/>
					<Dropdown label="Marital Status" name="status" value={status} options={['','Single','Married']} onChange={this.onInputChange}/>
				</LoginForm>	
			</div>
			) ;
	}

	personForm3 = () => {
		const {address, address2, working, sibling, family, hobbies} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Other Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2="Register" onb2Click={this.onNextClick} >
					<TextArea label="Current Address" name="address" value={address} r={3} c={20} onChange={this.onInputChange} />
					<TextArea label="Permanent&ensp; Address" name="address" value={address2} r={3} c={20} onChange={this.onInputChange} />
					<Dropdown label="Working Status" name="working" value={working} onChange={this.onInputChange}
							  options={['','Student','Full-Time','Part-Time','Self-Employed','Unemployed']} />
					<Number label="No. Of Siblings"	name="sibling" value={sibling} min={0} max={15} onChange={this.onNumberChange}/>
					<Dropdown label="Family Type" name="family" value={family} onChange={this.onInputChange}
							  options={['','Joint','Nuclear']} />
					<Text label="Hobbies" name="hobbies" value={hobbies} onChange={this.onInputChange}/>
				</LoginForm>	
			</div>
			) ;
	}

	schoolForm1 = () => {
		const {name, email, password, repass, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					<Text label="Password" name="password" value={password} type="pw" onChange={this.onInputChange}/>
					<Text label="Retype Password" name="repass" value={repass} type="pw" onChange={this.onInputChange}/>
					<Text label="Contact No." name="mobile" value={mobile} onChange={this.onInputChange}/>
				</LoginForm>
			</div>
			) ;
	}

	schoolForm2 = () => {
		const {person, p_phone, pr_phone, principal} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Correspondant Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Registrant Name" name="person" value={person} onChange={this.onInputChange}/>
					<Text label="Registrant Contact" name="p_phone" value={p_phone} onChange={this.onInputChange}/>
					<Text label="Name of Principal" name="principal" value={principal} onChange={this.onInputChange}/>
					<Text label="Principal Contact" name="pr_phone" value={pr_phone} onChange={this.onInputChange}/>
				</LoginForm>
			</div>
			) ;
	}

	schoolForm3 = () => {
		const {type, class_t, class_f, students, teachers, medium, address} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" School Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2="Register" onb2Click={this.onNextClick} >
					<TextArea label="Address" name="address" value={address} r={3} c={20} onChange={this.onInputChange} />
					<Dropdown label="Medium" name="medium" value={medium} onChange={this.onInputChange}
						 options={['','Hindi','English','Urdu','Other']}/>
					<Dropdown label="School Type" name="type" value={type} onChange={this.onInputChange}
						 options={['','Private','Govt.','Govt-Aided','Unaided']}/>
					<Dropdown label="Classes From" name="class_f" value={class_f} onChange={this.onInputChange}
						 options={['','Nursery','Pre-Primary','1','2','3','4','5','6','7','8','9','11']}/>
					<Dropdown label="Classes Till" name="class_t" value={class_t} onChange={this.onInputChange}
						 options={['','Nursery','Pre-Primary','1','2','3','4','5','6','7','8','10','12']}/>
					<Number label="No. of Students" name="students" value={students} min={50} max={50000} onChange={this.onNumberChange}/>
					<Number label="No. of Teachers" name="teachers" value={teachers} min={5} max={1000} onChange={this.onNumberChange}/>
				</LoginForm>
			</div>
			) ;
	}

	checkMode = () => {
		switch(this.state.mode)
		{
			case 'select' : return this.createSelect() ;
			case 'pr-reg-1' : return this.personForm1() ;
			case 'pr-reg-2' : return this.personForm2() ;
			case 'pr-reg-3' : return this.personForm3() ;
			case 'sc-reg-1' : return this.schoolForm1() ;
			case 'sc-reg-2' : return this.schoolForm2() ;
			case 'sc-reg-3' : return this.schoolForm3() ;
			case 'reg-success' : return (
									<div className="reg-res">
										<h2>
											 Successful Registration
										</h2>
										<Link className="res-btn" to="/login"> To Login </Link>
									</div>
										) ;
			case 'reg-fail' : return (
									<div className="reg-res">
										<h3>
											Registration Failed
										</h3>
										<Link className="res-btn" to="/"> Home </Link>
									</div>
										) ;
			default : return 'You probably encountered a problem' ;
		}
	}

	render()
	{	if(this.props.user.name)
			return <Redirect to='/' />
		else
		{	return(
				<div>
					<Title name = 'Register' items={["Home -", "Register"]}/>
					<div className="blue-bg">
						{this.checkMode()}
					</div>
				</div>
			) ;
		}
	}
}

export default Register ;