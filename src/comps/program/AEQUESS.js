import React, {useState} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif, remNotif } from '../notif.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Dropdown from '../signup/dropdown/Dropdown.js' ;
import './program.css' ;

import {arr, features, types} from './aequessData.js' ;

const initData = { type: '', title: '', message: ''} ;

const AQUESS = ({token, user}) => {
	const [error, setError] = useState('') ;
	const [data, setData] = useState(initData) ;

	const onScheduleClick = () => {
		const {type, title, message} = data ;
	  	if(error !== '')
			setError('You cannot proceed without fixing all the errors') ;
		else if(type === '')
			setError('Type can not be blank') ;
	  	else if(title === '')
			setError('Title can not be blank') ;
		else if(message === '')
			setError('Message can not be blank') ;
		else
		{	
			addNotif('Please Wait...') ;

			fetch('https://psy-api.herokuapp.com/ask',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json' ,
							'Authorization' : 'Bearer ' + token} ,
				body : JSON.stringify({title, message, type}) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {
				setData(initData) ;	
				remNotif() ;
				addNotif('Successfully Received Query', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				remNotif() ;
				addNotif(err.message, 'error') ;
			}) ;
		}
	}

	const onInputChange = (event) => {
		setData({ ...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	const checkLogin = () => {
		const {type, title, message} = data ;

		if(user.gender)
			return (
				<div className="blue-bg">
					<LoginForm title=" Query " error={error} >
						<Dropdown label="Type" value={type} options={types} onChange={onInputChange}/>
						<TextArea label="Title" value={title} r={1} c={20} onChange={onInputChange}/>
						<TextArea label="Query" value={message} r={5} c={20} onChange={onInputChange}/>
					</LoginForm>	<br/>
					<button onClick={onScheduleClick} className="sched-btn"> Send Query </button> 
				</div>
			) ;
		else
			return (
				<div className="blue-bg blue-form">
					<p> You need to 
						<Link to="/login?rdr=aequess" className="btn3"> Login </Link>
						 or 
						<Link to="/register?rdr=aequess" className="btn3"> Register </Link> 
						as a Student to send a query. 
					</p>
				</div>
			) ; 
	}

	return(
		<div>
			<Title name = 'AEQUESS Program' items={["Home -"," Programs -", "AEQUESS"]}/>
			<h4 className="intro cen"> <span className="brand">AEQUESS</span> is  
			<span className="ngo">&nbsp;Abhinav E-Query System for Students </span> which is 
			 free of cost.  </h4>
			<p className="intro"> Classes 11-12 & Under-Graduate level education lays the 
				foundation of an individual's "Take OFF" from the runway of life. </p>
			<p className="intro"> These years involve rigorous hardwork, guidance and 
				hand-holding at many times. Mental Health of Students is of utmost 
				importance during these years.</p>
			<p className="intro"> It shall be our endeavour to stand with all students
				who approach us like a true friend. We shall help them in their hour of
				need. </p>
			<p className="intro bold"> P.S. : Certain Queries may require more time in 
				getting answered. If we take longer than 5 days, to answer your query 
				we shall keep you informed. </p>
			<p className="intro bold"> Note : All Student Queries and details shall be kept 
				confidential. They will never be shared with any third-person. </p>	
			<DisplayDetailed title="Aim" lidata={arr} />
			<DisplayDetailed title="Features" lidata={features} />
			<Heading text="Send Your Query" />
			{ checkLogin() }
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default AQUESS ;