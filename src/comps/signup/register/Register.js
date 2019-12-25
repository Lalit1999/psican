import React from 'react' ;

import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
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
	short: '',
	password: '',
	repass: '',
	phone: '',
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
	class_f: 0,
	class_t: 0,
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

	onPrevClick = () => {
		switch(this.state.mode)
		{
			case 'pr-reg-2' : this.setState({mode : 'pr-reg-1'});
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
								  console.table(this.state.data) ;
								  break ;
				default : console.log("You probably encountered a problem") ;
			}
		}
	}

	onNameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Name can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
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
			this.setState({error: ''}) ;
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
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, password : event.target.value} }) ;
	}

	onRepassChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Re-Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Password must be at least 6 digits long'}) ;
		else if(event.target.value !== this.state.data.password)
			this.setState({error: 'Re-Password must match password'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, repass : event.target.value} }) ;
	}

	onMobileChange = (event) => {
		// eslint-disable-next-line
		var numre = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g ;
		if(event.target.value === '')
			this.setState({error: 'Mobile No. can not be blank'}) ;
		else if(event.target.value.length < 10)
			this.setState({error: 'Mobile No. must be at least 10 digits long'}) ;
		else if(numre.test(event.target.value) === false)
			this.setState({error: 'Mobile No. must only contain digits or -'});
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, mobile : event.target.value} }) ;
	}
	
	onFatherChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Father Name can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, father : event.target.value} }) ;
	}
	
	onMotherChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Mother Name can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, mother : event.target.value} }) ;
	}
	
	onAgeChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Age can not be 0'}) ;
		else if(event.target.value < 10 || event.target.value > 65)
			this.setState({error: 'Age must be between 10 & 65'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, age : parseInt(event.target.value)} }) ;
	}
	
	onHeightChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Height can not be 0'}) ;
		else if(event.target.value < 100 || event.target.value > 300)
			this.setState({error: 'Height must be between 100 & 300'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, height : parseInt(event.target.value)} }) ;
	}

	onWeightChange = (event) => {
		if(event.target.value === 0)
			this.setState({error: 'Weight can not be 0'}) ;
		else if(event.target.value < 10 || event.target.value > 250)
			this.setState({error: 'Weight must be between 100 & 250'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, weight : parseInt(event.target.value)} }) ;
	}
	
	onGenderChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Gender can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, gender : event.target.value} }) ;
	}
	
	onStatusChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Status can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, status : event.target.value} }) ;
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
		return (
			<div>	Person Form 3
			</div>
			) ;
	}

	schoolForm1 = () => {
		return (
			<div>	school Form 1
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