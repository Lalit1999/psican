import React from 'react' ;
import {Redirect} from 'react-router-dom';

import { addNotif } from '../../notif.js' ;
import { invalidEmail, invalidMobile, invalidPass, isBlank, isMaxMin, invalidName } from '../../valid.js' ;
import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import TextArea from '../text/TextArea.js' ;
import Number from '../number/Number.js' ;
import Dropdown from '../dropdown/Dropdown.js' ;
import '../signup.css' ;

const initPerson = {
	name: '' ,		email: '' ,		password: '',		repass: '',		mobile: '',
	age : 0,		gender :'',		height: 0,			weight: 0,		mother: '',
	father: '',		status: '',		address: '',		address2: '',	working: '',
	siblings: 0,	hobbies: '',	family: ''
} ;

const initSchool = {
	name: '',		password: '',	repass: '',			mobile: '',		email: '',
	person: '',		p_phone: '',	principal: '',		pr_phone: '',	type: '',
	students: 0,	teachers: 0,	medium: '',		address: '',	class_f: '',	class_t: ''
}

class Register extends React.Component
{	state = {
		mode : 'select' ,
		data : {} ,
		error: '' 
	}

	componentDidMount = () => {
		if(this.props.mode === 'edit')
			if(this.props.init.status)
				this.setState({mode: 'pr-reg-1', data: this.props.init});
			else
				this.setState({mode: 'sc-reg-1', data: this.props.init});
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

		if(this.props.mode === 'edit')
		{	addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/' + type + '/me',{
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
				this.setState({data: obj});
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
				case 'pr-reg-1' : if( invalidEmail(email) )
									this.setState( {error: invalidEmail(email)} )
								  else if(invalidName(name) )
									this.setState( {error: invalidName(name)} )
								  else if (this.props.mode !== 'edit' && invalidPass(password, repass) )
									this.setState( {error: invalidPass(password, repass)} )
								  else if (invalidMobile(mobile) )
									this.setState( {error: invalidMobile(mobile)} )
								  else
									this.setState({mode:'pr-reg-2'});
								  break ;
				
				case 'pr-reg-2' : if(invalidName(father) )
									this.setState( {error: invalidName(father)} )
								  else if(invalidName(mother) )
									this.setState( {error: invalidName(mother)} )
								  else if(isBlank(gender,'Gender') )
									this.setState( {error: isBlank(gender,'Gender')} )
								  else if(isBlank(status,'Status'))
									this.setState( {error: isBlank(status,'Status')} )
								  else if(isMaxMin(age,'Age',10,65) )
									this.setState( {error: isMaxMin(age,'Age',10,65)} )
								  else if(isMaxMin(height,'Height',24,300) )
									this.setState( {error: isMaxMin(height,'Height',24,300)} )
								  else if(isMaxMin(weight,'Weight',10,250))
									this.setState( {error: isMaxMin(weight,'Weight',10,250)} )
								  else
									this.setState({mode:'pr-reg-3'});
								  break ;
				
				case 'pr-reg-3' : if(isBlank(address,'Current Address') )
									this.setState( {error: isBlank(address,'Current Address')} )
								  else if(isBlank(address2,'Permanent Address') )
									this.setState( {error: isBlank(address2,'Permanent Address')} )
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				case 'sc-reg-1' : if(isBlank(name,'School Name') )
									this.setState( {error: isBlank(name,'School Name')} )
								  else if(invalidEmail(email) )
									this.setState( {error: invalidEmail(email)} )
								  else if(this.props.mode !== 'edit' && invalidPass(password, repass) )
									this.setState( {error: invalidPass(password, repass)} )
								  else if(invalidMobile(mobile))
									this.setState( {error: invalidMobile(mobile)} )
								  else
									this.setState({mode:'sc-reg-2'});
								  break ;

				case 'sc-reg-2' : if(invalidName(person) )
									this.setState( {error: invalidName(person)} )
								  else if(invalidName(principal) )
									this.setState( {error: invalidName(principal)} )
								  else if(invalidMobile(p_phone) )
									this.setState( {error: invalidMobile(p_phone)} )
								  else if(invalidMobile(pr_phone))
									this.setState( {error: invalidMobile(pr_phone)} )
								  else
									this.setState({mode:'sc-reg-3'});
								  break ;

				case 'sc-reg-3' : if(isBlank(address,'Address') )
									this.setState( {error: isBlank(address,'Address')} )
							      else if(isBlank(type,'Type') )
									this.setState( {error: isBlank(type,'Type')} )
							      else if(isBlank(medium,'Medium') )
									this.setState( {error: isBlank(medium,'Medium') } )
							      else if(isBlank(class_f,'Class From') )
									this.setState( {error: isBlank(class_f,'Class From')} )
							      else if(isBlank(class_t,'Class To'))
									this.setState( {error: isBlank(class_t,'Class To')} )
								  else if(isMaxMin(teachers,'Teachers',5,1000) )
									this.setState( {error: isMaxMin(teachers,'Teachers',5,1000)} )
								  else if(isMaxMin(students,'Students',50,50000))
									this.setState( {error: isMaxMin(students,'Students',50,50000)} )
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				default : console.log("You probably encountered a problem") ;
			}
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
								[event.target.name] : parseInt(event.target.value)}, error: '' }) ;
	}

	personForm1 = () => {
		const {name, email, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					{ this.checkEditMode() } 
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
					<Number label="Height (inch)"	name="height" value={height} min={24} max={300} onChange={this.onNumberChange}/>
					<Number label="Weight (kg)"	name="weight" value={weight} min={10} max={250} onChange={this.onNumberChange}/>
					<Dropdown label="Marital Status" name="status" value={status} options={['','Single','Married','Divorced','Separated','Widowed']} onChange={this.onInputChange}/>
				</LoginForm>	
			</div>
			) ;
	}

	personForm3 = () => {
		const {address, address2, working, siblings, family, hobbies} = this.state.data ;
		const str = (this.props.mode === 'edit'?'Update':'Register') ;
		return (
			<div>	
				<LoginForm title=" Other Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2={str} onb2Click={this.onNextClick} >
					<TextArea label="Current Address" name="address" value={address} r={3} c={20} onChange={this.onInputChange} />
					<TextArea label="Permanent&ensp; Address" name="address2" value={address2} r={3} c={20} onChange={this.onInputChange} />
					<Dropdown label="Working Status" name="working" value={working} onChange={this.onInputChange}
							  options={['','Student','Full-Time','Part-Time','Self-Employed','Unemployed']} />
					<Number label="No. Of Siblings"	name="siblings" value={siblings} min={0} max={15} onChange={this.onNumberChange}/>
					<Dropdown label="Family Type" name="family" value={family} onChange={this.onInputChange}
							  options={['','Joint','Nuclear']} />
					<Text label="Hobbies" name="hobbies" value={hobbies} onChange={this.onInputChange}/>
				</LoginForm>	
			</div>
			) ;
	}

	schoolForm1 = () => {
		const {name, email, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" name="name" value={name} onChange={this.onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={this.onInputChange}/>
					{ this.checkEditMode() } 
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
		const str = (this.props.mode === 'edit'?'Update':'Register') ;
		return (
			<div>	
				<LoginForm title=" School Details " error={this.state.error}
					b1="&lt;&nbsp; Prev" onb1Click={this.onPrevClick}
					b2={str} onb2Click={this.onNextClick} >
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
			default : return 'You probably encountered a problem' ;
		}
	}

	render()
	{   if (this.props.mode === 'edit')
			return (	<div>{this.checkMode()}</div>	) ;
		else
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
}

export default Register ;