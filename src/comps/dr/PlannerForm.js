import { useState, useEffect, useContext } from 'react';

import { isBlank } from '../valid.js' ;
import BasicForm from '../basicform/BasicForm.js' ;
import { addNotif } from '../notif.js' ;
import {UserContext} from '../../context/UserContext.js' ;

const initData = { name: '', reason: '', appointDate: 'default' } ;

const PlannerForm = ({type}) => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	const [dates, setDates] = useState([]) ;
	// const [empty, setEmpty] = useState(true) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
		fetch('https://api.psyment.com/appoint-list',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : `Bearer ${token}` },
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => setDates(data)) 
		.catch(err => console.log(err));
	}, [token]) ;

	const formData = [
		[	{type: "text", name: "name", label: "Enter Name", id:"consultName"},
		],
		[	{type: "textArea", name: "reason", label: "Reason for Appointment", id:"consultReason"},
		],
		[	{type: type, name: "appointDate", label:"Choose Date of Appointment", options: dates},
		],
		[	{type: "btn", name: "Request Appointment", style: "sched-btn"},
		],
	] ;

	// const formData2 = [
	// 	[	{type: "text", name: "title", label: "Enter Appointment Title", id:"consultTitle"},
	// 	],
	// 	[	{type: "textArea", name: "reason", label: "Reason for Appointment", id:"consultReason"},
	// 	],
	// 	[	{type: "btn", name: "Request Appointment", style: "sched-btn"},
	// 	],
	// ] ;
	
	//  2 : register karne ki request bhej raha hai.
	const sendConsultRequest = () => {
		// const {name, reason, appointDate} = data ;

		console.log(data) ;

		// fetch('http://localhost:8000/consult',{
		// fetch('https://api.psyment.com/consult',{
		// 	method : 'post' ,
		// 	headers : { 'Content-Type' : 'application/json' ,
		// 				'Authorization' : `Bearer ${token}` },
		// 	body : JSON.stringify({date: appointDate, reason, title }) ,
		// })
		// .then(res => {
		// 	if(res.ok)
		// 		return res.json() ;
		// 	throw Error(res.statusText) ;
		// })
		// .then(data => {	
		// 	setData(initData) ;
		// 	setEmpty(!empty)
			addNotif('Successfully Sent Request for Appointment', 'success') ;
		// }) 
		// .catch( err  => {
		// 	console.log(err) ; 
		// 	addNotif('Error Creating Appointment' , 'error') ;
		// }) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendConsultRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		const {flag, name, reason} = data ;

		if(flag === 'yes') {
			const newError = {
				name: isBlank(name, 'Name'),
				reason: isBlank(reason, 'Reason'),
			}

			setError(newError) ;
		}
	}, [data])

	const onBookConsultClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="consult-form">	
			<BasicForm data={formData} errors={error} onClick={{"Request Appointment" : onBookConsultClick}} initData={initData} />
		</div>
	) ;
}

export default PlannerForm ;