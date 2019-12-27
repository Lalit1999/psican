import React from 'react' ;
import {Link} from 'react-router-dom' ;

import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import TextArea from '../text/TextArea.js' ;
import Number from '../number/Number.js' ;
import Dropdown from '../dropdown/Dropdown.js' ;
import '../signup.css' ;

// import Red from '../../images/red.png' ;
// import Green from '../../images/green.png' ;

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
	short: '',
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
		// console.table(this.state.data) ;
		let type = (this.state.mode === 'pr-reg-3')?'person':'school' ;
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
			// console.log(data) ;
			this.setState({mode: 'reg-success'});
		}) 
		.catch( err  => {
			console.log(err) ;
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
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			switch(this.state.mode)
			{
				case 'pr-reg-1' : if(this.state.data.name === '')
									this.setState({error: 'Name can not be blank'});
								  else if(this.state.data.password === '')
									this.setState({error: 'Password can not be blank'});
								  else if(this.state.data.repass === '')
									this.setState({error: 'Re-Password can not be blank'});
								  else if(this.state.data.email === '')
									this.setState({error: 'Email can not be blank'});
								  else if(this.state.data.mobile === '')
									this.setState({error: 'Mobile can not be blank'});
								  else
									this.setState({mode:'pr-reg-2'});
								  break ;
				
				case 'pr-reg-2' : if(this.state.data.father === '')
									this.setState({error: 'Father Name can not be blank'});
								  else if(this.state.data.mother === '')
									this.setState({error: 'Mother Name can not be blank'});
								  else if(this.state.data.gender === '')
									this.setState({error: 'Gender can not be blank'});
								  else if(this.state.data.status === '')
									this.setState({error: 'Status can not be blank'});
								  else if(this.state.data.age === 0)
									this.setState({error: 'Age can not be 0'});
								  else if(this.state.data.height === 0)
									this.setState({error: 'Height can not be 0'});
								  else if(this.state.data.weight === 0)
									this.setState({error: 'Weight can not be 0'});
								  else
									this.setState({mode:'pr-reg-3'});
								  break ;
				
				case 'pr-reg-3' : if(this.state.data.address === '')
									this.setState({error: 'Address can not be blank'});
								  else if(this.state.data.address2 === '')
									this.setState({error: 'Address can not be blank'});
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				case 'sc-reg-1' : if(this.state.data.name === '')
									this.setState({error: 'Name can not be blank'});
								  else if(this.state.data.short === '')
									this.setState({error: 'Short Name can not be blank'});
								  else if(this.state.data.password === '')
									this.setState({error: 'Password can not be blank'});
								  else if(this.state.data.repass === '')
									this.setState({error: 'Re-Password can not be blank'});
								  else if(this.state.data.email === '')
									this.setState({error: 'Email can not be blank'});
								  else if(this.state.data.mobile === '')
									this.setState({error: 'Contact No. can not be blank'});
								  else
									this.setState({mode:'sc-reg-2'});
								  break ;

				case 'sc-reg-2' : if(this.state.data.person === '')
									this.setState({error: 'Registrant Name can not be blank'});
								  else if(this.state.data.p_phone === '')
									this.setState({error: 'Registrant Contact No. can not be blank'});
								  else if(this.state.data.principal === '')
									this.setState({error: 'Principal Name can not be blank'});
								  else if(this.state.data.pr_phone === '')
									this.setState({error: 'Principal Contact No. can not be blank'});
								  else
									this.setState({mode:'sc-reg-3'});
								  break ;

				case 'sc-reg-3' : if(this.state.data.address === '')
									this.setState({error: 'Address can not be blank'});
								  else if(this.state.data.type === '')
									this.setState({error: 'Type can not be blank'});
								  else if(this.state.data.medium === '')
									this.setState({error: 'Medium can not be blank'});
								  else if(this.state.data.class_f === '')
									this.setState({error: 'Class From can not be blank'});
								  else if(this.state.data.class_t === '')
									this.setState({error: 'Class To can not be blank'});
								  else if(this.state.data.teachers === 0)
									this.setState({error: 'Teachers can not be 0'});
								  else if(this.state.data.students === 0)
									this.setState({error: 'Students can not be 0'});
								  else
								  	this.sendRegisterRequest() ;
								  break ;

				default : console.log("You probably encountered a problem") ;
			}
		}
	}

	onNameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, name : event.target.value} }) ;
	}

	onEmailChange = (event) => {
		//eslint-disable-next-line
		var emre = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi;
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else if(emre.test(event.target.value) === false)
			this.setState({error: 'This might not be a valid E-Mail address'});
		else
		{	if(this.state.error === 'E-Mail can not be blank' || this.state.error === 'This might not be a valid E-Mail address') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, email : event.target.value} }) ;
	}

	onPasswordChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Password must be at least 6 digits long'}) ;
		else if(event.target.value !== this.state.data.repass)
			this.setState({error: 'Re-Password must match password'}) ;
		else
		{	if(this.state.error === 'Password can not be blank' || this.state.error === 'Password must be at least 6 digits long' || this.state.error === 'Re-Password must match password')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, password : event.target.value} }) ;
	}

	onRepassChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Re-Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Re-Password must be at least 6 digits long'}) ;
		else if(event.target.value !== this.state.data.password)
			this.setState({error: 'Password must match re-password'}) ;
		else
		{	if(this.state.error === 'Re-Password can not be blank' || this.state.error === 'Re-Password must be at least 6 digits long' || this.state.error === 'Password must match re-password')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, repass : event.target.value} }) ;
	}

	onMobileChange = (event) => {
		// eslint-disable-next-line
		var numre = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g ;
		if(event.target.value === '')
			this.setState({error: 'Mobile No. can not be blank'}) ;
		else if(numre.test(event.target.value) === false)
			this.setState({error: 'Mobile No. must only contain digits or -'});
		else if(event.target.value.length < 10)
			this.setState({error: 'Mobile No. must be at least 10 digits long'}) ;
		else
		{	if(this.state.error === 'Mobile No. can not be blank' || this.state.error === 'Mobile No. must only contain digits or -' || this.state.error === 'Mobile No. must be at least 10 digits long')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, mobile : event.target.value} }) ;
	}
	
	onFatherChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Father Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Father Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, father : event.target.value} }) ;
	}
	
	onMotherChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Mother Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Mother Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, mother : event.target.value} }) ;
	}
	
	onAgeChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Age can not be 0'}) ;
		else if(event.target.value < 10 || event.target.value > 65)
			this.setState({error: 'Age must be between 10 & 65'}) ;
		else
		{	if(this.state.error === 'Age can not be 0' || this.state.error === 'Age must be between 10 & 65') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, age : parseInt(event.target.value)} }) ;
	}
	
	onHeightChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Height can not be 0'}) ;
		else if(event.target.value < 100 || event.target.value > 300)
			this.setState({error: 'Height must be between 100 & 300'}) ;
		else
		{	if(this.state.error === 'Height can not be 0' || this.state.error === 'Height must be between 100 & 300') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, height : parseInt(event.target.value)} }) ;
	}

	onWeightChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Weight can not be 0'}) ;
		else if(event.target.value < 10 || event.target.value > 250)
			this.setState({error: 'Weight must be between 100 & 250'}) ;
		else
		{	if(this.state.error === 'Weight must be between 100 & 250' || this.state.error === 'Weight can not be 0') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, weight : parseInt(event.target.value)} }) ;
	}
	
	onGenderChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Gender can not be blank'}) ;
		else
		{	if(this.state.error === 'Gender can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, gender : event.target.value} }) ;
	}
	
	onStatusChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Status can not be blank'}) ;
		else
		{	if(this.state.error === 'Status can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, status : event.target.value} }) ;
	}

	onHobbyChange = (event) => this.setState({data: {...this.state.data, hobbies : event.target.value} }) 

	onFamilyChange = (event) => this.setState({data: {...this.state.data, family : event.target.value} })
	
	onWorkChange = (event) => this.setState({data: {...this.state.data, working : event.target.value} }) 

	onSiblingChange = (event) => {
		if(event.target.value > 15)
			this.setState({error: 'Siblings must be between 0 & 15'}) ;
		else
		{	if(this.state.error === 'Siblings must be between 0 & 15') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, sibling : parseInt(event.target.value)} }) ;
	}

	onAddressChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Address can not be blank'}) ;
		else
		{	if(this.state.error === 'Address can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, address : event.target.value} }) ;
	}

	onAddress2Change = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Address can not be blank'}) ;
		else
		{	if(this.state.error === 'Address can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, address2 : event.target.value} }) ;
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

	onPersonChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Registrant Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Registrant Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, person : event.target.value} }) ;
	}

	onPPhoneChange = (event) => {
		// eslint-disable-next-line
		var numre = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g ;
		if(event.target.value === '')
			this.setState({error: 'Registrant Phone No. can not be blank'}) ;
		else if(numre.test(event.target.value) === false)
			this.setState({error: 'Registrant Phone No. must only contain digits or -'});
		else if(event.target.value.length < 10)
			this.setState({error: 'Registrant Phone No. must be at least 10 digits long'}) ;
		else
		{	if(this.state.error === 'Registrant Phone No. can not be blank' || this.state.error === 'Registrant Phone No. must be at least 10 digits long' || this.state.error === 'Registrant Phone No. must only contain digits or -')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, p_phone : event.target.value} }) ;
	}

	onPrincipalChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Principal Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Principal Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, principal : event.target.value} }) ;
	}

	onPrPhoneChange = (event) => {
		// eslint-disable-next-line
		var numre = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g ;
		if(event.target.value === '')
			this.setState({error: 'Principal Phone No. can not be blank'}) ;
		else if(numre.test(event.target.value) === false)
			this.setState({error: 'Principal Phone No. must only contain digits or -'});
		else if(event.target.value.length < 10)
			this.setState({error: 'Principal Phone No. must be at least 10 digits long'}) ;
		else
		{	if(this.state.error === 'Principal Phone No. can not be blank' || this.state.error === 'Principal Phone No. must only contain digits or -' || this.state.error === 'Principal Phone No. must be at least 10 digits long')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, pr_phone : event.target.value} }) ;
	}

	onMediumChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Medium can not be blank'}) ;
		else
		{	if(this.state.error === 'Medium can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, medium : event.target.value} }) ;
	}

	onTypeChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'School Type can not be blank'}) ;
		else
		{	if(this.state.error === 'School Type can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, type : event.target.value} }) ;
	}

	onCFChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'School From can not be blank'}) ;
		else
		{	if(this.state.error === 'School From can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, class_f : event.target.value} }) ;
	}

	onCTChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'School To can not be blank'}) ;
		else
		{	if(this.state.error === 'School To can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, class_t : event.target.value} }) ;
	}

	onStudentChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Students can not be 0'}) ;
		else if(event.target.value < 50 || event.target.value > 50000)
			this.setState({error: 'Students must be between 50 & 50000'}) ;
		else
		{	if(this.state.error === 'Students can not be 0' || this.state.error === 'Students must be between 50 & 50000') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, students : parseInt(event.target.value)} }) ;
	}

	onTeacherChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Teachers can not be 0'}) ;
		else if(event.target.value < 5 || event.target.value > 1000)
			this.setState({error: 'Teachers must be between 5 & 1000'}) ;
		else
		{	if(this.state.error === 'Teachers can not be 0' || this.state.error === 'Teachers must be between 5 & 1000') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, teachers : parseInt(event.target.value)} }) ;
	}

	personForm1 = () => {
		const {name, email, password, repass, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" value={name} onChange={this.onNameChange}/>
					<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPasswordChange}/>
					<Text label="Retype Password" value={repass} type="pw" onChange={this.onRepassChange}/>
					<Text label="Mobile No." value={mobile} onChange={this.onMobileChange}/>
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
					<Number label="Age"	value={age} min={10} max={65} onChange={this.onAgeChange}/>
					<Dropdown label="Gender" value={gender} options={['','M','F']} onChange={this.onGenderChange}/>
					<Text label="Mother's Name" value={mother} onChange={this.onMotherChange}/>
					<Text label="Father's Name" value={father} onChange={this.onFatherChange}/>
					<Number label="Height (cm)"	value={height} min={100} max={300} onChange={this.onHeightChange}/>
					<Number label="Weight (kg)"	value={weight} min={10} max={250} onChange={this.onWeightChange}/>
					<Dropdown label="Marital Status" value={status} options={['','Single','Married']} onChange={this.onStatusChange}/>
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
					<TextArea label="Current Address" value={address} r={3} c={20} onChange={this.onAddressChange} />
					<TextArea label="Permanent&ensp; Address" value={address2} r={3} c={20} onChange={this.onAddress2Change} />
					<Dropdown label="Working Status" value={working} onChange={this.onWorkChange}
							  options={['','Student','Full-Time','Part-Time','Self-Employed','Unemployed']} />
					<Number label="No. Of Siblings"	value={sibling} min={0} max={15} onChange={this.onSiblingChange}/>
					<Dropdown label="Family Type" value={family} onChange={this.onFamilyChange}
							  options={['','Joint','Nuclear']} />
					<Text label="Hobbies" value={hobbies} onChange={this.onHobbyChange}/>
				</LoginForm>	
			</div>
			) ;
	}

	schoolForm1 = () => {
		const {name, email, password, repass, mobile, short} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Basic Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" value={name} onChange={this.onNameChange}/>
					<Text label="Short Name" value={short} onChange={this.onShortChange}/>
					<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPasswordChange}/>
					<Text label="Retype Password" value={repass} type="pw" onChange={this.onRepassChange}/>
					<Text label="Contact No." value={mobile} onChange={this.onMobileChange}/>
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
					<Text label="Registrant Name" value={person} onChange={this.onPersonChange}/>
					<Text label="Registrant Contact" value={p_phone} onChange={this.onPPhoneChange}/>
					<Text label="Name of Principal" value={principal} onChange={this.onPrincipalChange}/>
					<Text label="Principal Contact" value={pr_phone} onChange={this.onPrPhoneChange}/>
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
					<TextArea label="Address" value={address} r={3} c={20} onChange={this.onAddressChange} />
					<Dropdown label="Medium" value={medium} onChange={this.onMediumChange}
						 options={['','Hindi','English','Urdu','Other']}/>
					<Dropdown label="School Type" value={type} onChange={this.onTypeChange}
						 options={['','Private','Govt.','Govt-Aided','Unaided']}/>
					<Dropdown label="Classes From" value={class_f} onChange={this.onCFChange}
						 options={['','Nursery','Pre-Primary','1','2','3','4','5','6','7','8','9','11']}/>
					<Dropdown label="Classes From" value={class_t} onChange={this.onCTChange}
						 options={['','Nursery','Pre-Primary','1','2','3','4','5','6','7','8','10','12']}/>
					<Number label="No. of Students"	value={students} min={50} max={50000} onChange={this.onStudentChange}/>
					<Number label="No. of Teachers"	value={teachers} min={5} max={1000} onChange={this.onTeacherChange}/>
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
	{
		return(
			<div>
				<Title name = 'Register' items={["Home -", "Register"]}/>
				<div className="blue-bg">
					{this.checkMode()}
				</div>
			</div>
		) ;
	}
}

export default Register ;