import React from 'react' ;

import Title from '../../title/Title.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import '../signup.css' ;

const initPerson = {
	name: '' ,
	email: '' ,
	password: '',
	repass: '',
	mobile: '',
	age : 0,
	gender :'',
	height: '',
	weight: '',
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

	onNextClick = () => {
		console.table(this.state.data) ;
		// this.setState({mode:'pr-reg-2'});
	}

	onNameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Name can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, name : event.target.value} }) ;
	}

	onEmailChange = (event) => {
		//Check Valid E-Mail Format
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, email : event.target.value} }) ;
	}

	onPasswordChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Password must be at least 6 digits long'}) ;
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
		//Check if mobile contains only digits
		if(event.target.value === '')
			this.setState({error: 'Mobile No. can not be blank'}) ;
		else if(event.target.value.length < 10)
			this.setState({error: 'Mobile No. must be at least 10 digits long'}) ;
		else 
			this.setState({error: ''}) ;
		this.setState({data: {...this.state.data, mobile : event.target.value} }) ;
	}

	personForm1 = () => {
		const {name, email, password, repass, mobile} = this.state.data ;
		return (
			<div>	
				<LoginForm title=" Login Details " error={this.state.error}
					b2="Next &gt;&nbsp;" onb2Click={this.onNextClick} >
					<Text label="Name" value={name} onChange={this.onNameChange}/>
					<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPasswordChange}/>
					<Text label="Retype&ensp; Password" value={repass} type="pw" onChange={this.onRepassChange}/>
					<Text label="Mobile No." value={mobile} onChange={this.onMobileChange}/>
				</LoginForm>
			</div>
			) ;
	}

	personForm2 = () => {
		return (
			<div>	Person Form 2
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