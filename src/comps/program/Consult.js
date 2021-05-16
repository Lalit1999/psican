import React from 'react' ;
import DatePicker from 'react-datepicker' ;
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom' ;

import { addNotif } from '../notif.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Text from '../signup/text/Text.js' ;
import './program.css' ;

const features = [
'All Sessions within this programs are PAID BASIS ONLY',
'htmlFee for each session of 30/60 minutes is &#8377; 1000 / &#8377; 2000 Only',
'Timings: 6pm to 8pm (Weekdays) and 9am to 1pm (Saturday) '
] ;

const pData = [ 'Career & Self-Esteem', 'Financial Self-Esteem', 'Goal Setting', 
'Personality Trait Development', 'Adjustment of Traits' ]; 

const ptData = [ 'Bereavement Adjustment', 'Accident / Disease', 
'Relationship Break (Divorce / Break-up)', 'Exploitation / Abuse (Domestic Violence, Rape, etc)' , 
'Financial Bankruptcy / Earning / Theft', 'Academic (Failure / Performance)' ];

const mData = [ 'Personality Re-Modelling', 'Relational Re-Modelling' ];

class Personal extends React.Component
{	state = {
		error: '',
		reason : '',
		avail: '' ,
		title: '',
		minTime: 17.5,
		maxTime: 19,
		date: new Date()
	}

	returnTomorrow = () => {
		const tom = new Date() ;
		tom.setDate(tom.getDate() + 2) ;
		if(tom.getDay() === 0)
		{	tom.setDate(tom.getDate() + 1) ;
			tom.setHours(18) ;
			tom.setMinutes(0) ;
		}
		else if(tom.getDay() === 6)
		{	tom.setMinutes(0) ;
			tom.setHours(9) ;
		}
		else
		{	tom.setHours(18) ;
			tom.setMinutes(0) ;
		}
		return tom ;
	}

	returnTime = (hour) => {
		const tim = new Date() ;
		tim.setHours(hour) ;
		return tim ;
	}

	componentDidMount = () => {
		this.setState({date: this.returnTomorrow()});
	}

	onScheduleClick = () => {
	  	if(this.state.error !== '')
			this.setState({error: 'You cannot proceed without fixing all the errors'});
	  	else if(this.state.title === '')
			this.setState({error: 'Title can not be blank'});
		else if(this.state.reason === '')
			this.setState({error: 'Reason can not be blank'});
		else if(this.state.date.getDay() === 6)
		{	if(this.state.date.getHours() < 9 || this.state.date.getHours() > 14)
				this.setState({error: 'Invalid Date or Time range'});
			else 
				this.callBackend() ;
		}
		else if(this.state.date.getDay() === 0)
			this.setState({error: 'Invalid Date or Time range'});
		else if(this.state.date.getHours() < 18 || this.state.date.getHours() > 20)
			this.setState({error: 'Invalid Date or Time range'});
		else
			this.callBackend() ;			
	}

	callBackend = () => {
		const obj = {
			title: this.state.title ,
			reason : this.state.reason ,
			date : this.state.date 
		} ;

		addNotif('Please Wait...') ;

		if(this.state.avail === 'yes')
		{	fetch('https://psy-api.herokuapp.com/consult',{
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
				this.setState({ date: this.returnTomorrow(), topic: '', type: '', avail: ''});
				addNotif('Successfully Received Consultation Appointment', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				addNotif('Error Creating Appointment' , 'error') ;
			}) ;
		}
		else
		{	fetch('https://psy-api.herokuapp.com/consult/check',{
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
				if(data === 'Available')
				{	this.setState({ avail: 'yes'});
					addNotif('Appointment Available', 'success') ;
				}	
				else
					throw new Error('Appointment Unavailable') ;
			}) 
			.catch( err  => {
				this.setState({ error: 'Unavailable, for negotiation Call +91-9555235231'});
				addNotif(err.message, 'error') ;
			}) ;
		}
	}

	filterDates = (date) => {
    	const day = date.getDay();
    	return day !== 0 ;
	}

	onTitleChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Title can not be blank'}) ;
		else
		{	if(this.state.error === 'Title can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({title : event.target.value}) ;
	}
	
	onReasonChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Reason can not be blank'}) ;
		else
		{	if(this.state.error === 'Reason can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({reason : event.target.value} ) ;
	}

	onDateChange = (date) => {
		if(date.getDay() === 6)
			this.setState({ date: date, minTime: 8, maxTime:13, error: ''})
		else
			this.setState({ date: date, minTime: 17, maxTime:19, error: ''})
	}

	checkLogin = () => {
		const {reason, title, date, minTime, maxTime} = this.state ;

		if(this.props.user.gender)
			return (
				<div className="blue-bg">
					<LoginForm title=" Schedule " error={this.state.error} >
						<Text label="Title" value={title} onChange={this.onTitleChange} />
						<TextArea label="Consultation&nbsp;&nbsp; Reason" value={reason} r={4} c={20} onChange={this.onReasonChange} />
						<div className="date-cont">
							<label className="lbel">Select Date&nbsp; : </label>
							<DatePicker selected={date} onChange={this.onDateChange}
						      showTimeSelect timeFormat="HH:mm" timeIntervals={30} 
						      filterDate={this.filterDates} minDate={this.returnTomorrow()}
						      minTime={this.returnTime(minTime)} maxTime={this.returnTime(maxTime)}
						      timeCaption="Time" dateFormat="MMMM d, yyyy h:mm aa" />
					    </div>
					</LoginForm>	<br/>
					<button onClick={this.onScheduleClick} className="sched-btn">
					 { this.state.avail==='yes'?'Confirm Appointment!':'Check Availablity !' } 
					</button> 
				</div>
			) ;
		else
			return (
				<div className="blue-bg blue-form">
					<p> You need to 
						<Link to="/login" className="btn3"> Login </Link>
						 or 
						<Link to="/register" className="btn3"> Register </Link> 
						 to send a query. 
					</p>
				</div>
			) ; 
	}

	render()
	{	
		return(
			<div>
				<Title name = 'Personal Consultation' items={["Home -"," Programs -", "Consult"]}/>
				<p className="intro"> Human behavior and thinking constantly impact each other. 
					Our fundamental attributions for objects, events and relations around us make us
					emotionally susceptible</p>
				<p className="intro"> This may lead to cognitive dissonance and inept self-appraisal.
					Such events often disturb the flow of our capability.</p>
				<p className="intro"> <span className="ngo"> PERSONAL PSYCHOLOGICAL COUNSELLING</span>
				 	&nbsp;and <span className="ngo"> MENTORING </span> is of prime help in such situations.
				</p>
				<p className="intro"> You may consult us for all such needs. </p> 
				<p className="intro bold"> Note : All Personal Queries and details shall be kept 
					confidential. They will never be shared with any third-person. </p>
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Counselling Given By" />
				<p className="intro"><span className="brand"> Mr. Ashish Aggarwal</span><br/>
					M.Sc. (Applied Psychology) <br/> PG Diploma in Guidance & Counselling <br/>
					D. Pharmacy </p>
				<Heading text="Venue" />
				<p className="intro"> Unit No. 4 , First Floor , CSC , Pocket B & C , Phase - 4 ,
					 Ashok Vihar , Delhi - 110052. </p>
				<Heading text="Counselling Domains" /> <br/>
				<DisplayDetailed title="Personality Appraisal Counselling" small="yes" lidata={pData} />
				<DisplayDetailed title="Post Trauma Counselling" small="yes" lidata={ptData} />
				<DisplayDetailed title="Metamorphosis Counselling" small="yes" lidata={mData} />
				<Heading text="Schedule Your Appointment" />
				{ this.checkLogin() }
			</div>
		) ;
	}
}

export default Personal ;