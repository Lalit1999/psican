import React from 'react' ;
import DatePicker from 'react-datepicker' ;
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom' ;

import { addNotif } from '../notif.js' ;
import Title from '../title/Title.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Dropdown from '../signup/dropdown/Dropdown.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import './program.css' ;
import './detailcontent.css' ;

const arr = ['html<ul>To provide workshops to schools and colleges for:<li>Student Motivation</li><li>Student Career</li><li>Health related guidance for students</li><li>Behaviour related guidance for students</li><li>Parental Education</li><li>Teachers Training</li>'] ;

const features = [
'htmlCOMPLEMENTARY WORKSHOPS<a href="#one"><sup>[1]</sup></a> for partner Schools and Educational Institutions. <a href="#two"><sup>[2]</sup></a>',
'html<ul>Coverage of core areas like: <li>Student Motivation & Skillset</li><li>Parental Awareness & Orientation</li><li>Teacher Training & Co-Working</li></ul>',
'All programs shall be funded by KASTURI FOUNDATION',
'Only travel support needs to be provided by partner organisations',
] ;

class Sarathi extends React.Component
{	
	state = {
		error: '',
		date: new Date(),
		topic: '',
		type: '',
	} ;

	componentDidMount = () => {
		this.setState({date: this.returnTomorrow()});
	}

	onScheduleClick = () => {
	  	if(this.state.error !== '')
			this.setState({error: 'You cannot proceed without fixing all the errors'});
		else if(this.state.type === '')
			this.setState({error: 'Type can not be blank'});
	  	else if(this.state.topic === '')
			this.setState({error: 'Topic can not be blank'});
		else if(this.state.date.getDay() === 0)
			this.setState({error: 'Invalid Date or Time range'});
		else
		{	//console.log(this.state) ;
			
			const obj = {
				date: this.state.date ,
				topic : this.state.topic ,
				type : this.state.type 
			} ;

			addNotif('Please Wait...', 'notif') ;

			fetch('https://psy-api.herokuapp.com/book',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json' ,
							'Authorization' : 'Bearer ' + this.props.token} ,
				body : JSON.stringify(obj) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				this.setState({ date: this.returnTomorrow(), topic: '', type: ''});
				addNotif('Successfully Received Booking', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				addNotif(err.message, 'error') ;
			}) ;
		}
	}

	returnTomorrow = () => {
		const tom = new Date() ;
		tom.setDate(tom.getDate() + 15) ;
		
		if(tom.getDay() === 0)
			tom.setDate(tom.getDate() + 1) ;
		
		tom.setMinutes(0) ;
		tom.setHours(9) ;
		return tom ;
	}

	onTopicChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Topic can not be blank'}) ;
		else
		{	if(this.state.error === 'Topic can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({topic : event.target.value} ) ;
	}

	filterDates = (date) => {
    	const day = date.getDay();
    	return day !== 0 ;
	}

	onTypeChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Type can not be blank'}) ;
		else
		{	if(this.state.error === 'Type can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({type : event.target.value} ) ;
	}

	onDateChange = (date) => {
		this.setState({ date: date, error: ''})
	}

	checkLogin = () => {
		const {type, date, topic} = this.state ;

		if (this.props.user.gender)
			return (
				<div className="blue-bg">
					<p> This Feature is available only to schools </p>
				</div>
			) ; 
		else if(this.props.user.medium)
			return (
				<div className="blue-bg">
					<LoginForm title=" Schedule " error={this.state.error} >
						<Dropdown label="Type" value={type} options={['','Students','Teachers', 'Parents']} onChange={this.onTypeChange}/>
						<TextArea label="Preferred&nbsp;&nbsp; Topic" value={topic} r={4} c={20} onChange={this.onTopicChange} />
						<div className="date-cont">
							<label className="lbel">Select Date&nbsp; : </label>
							<DatePicker selected={date} onChange={this.onDateChange}
						      filterDate={this.filterDates} minDate={this.returnTomorrow()}
						      dateFormat="MMMM d, yyyy h:mm aa" />
					    </div>
					</LoginForm>	<br/>
					<button onClick={this.onScheduleClick} className="sched-btn"> Check Availablity ! </button> 
				</div>
			) ;
		else
			return (
				<div className="blue-bg">
					<p> You need to 
						<Link to="/login" className="btn2"> &emsp;Login&emsp; </Link>
						 or 
						<Link to="/register" className="btn2"> &emsp;Register&emsp; </Link> 
						as a Student to send a query. 
					</p>
				</div>
			) ; 
	}

	render()
	{	
		return(
			<div>
				<Title name = 'Sarathi Program'
				 items={["Home -"," Programs -", "Sarathi"]}/>
				<h4 className="intro"> <span className='brand'>Sarathi</span> is a program, supported
				 by <span className="ngo"> The Kasturi Foundation</span>. It provides workshop
				 organising facilities to schools and colleges. </h4> 
				<DisplayDetailed title="Aim" lidata={arr}/>
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Schedule Your Workshop" />
				{ this.checkLogin() }
				<p className="intro bold" id="one"> Note #1 : Maximum 2 workshops may be scheduled in a 
					financial year </p>  
				<p className="intro bold" id="two"> Note #2 : To partner with us please "Register" with
					us </p>
				<p className="intro bold" id="three"> Note #3: For further discussion/assistance, you may
					"Contact Us" </p>
			</div>
		) ;
	}
}

export default Sarathi ;