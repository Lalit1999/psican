import { useState, useEffect, useContext } from 'react';

import { isBlank } from '../valid.js' ;
import BasicForm from '../basicform/BasicForm.js' ;
import { addNotif } from '../notif.js' ;
import {UserContext} from '../../context/UserContext.js' ;

const initData = { title: '', reason: '', appointDate: 'default' } ;

const ConsultForm = ({choice}) => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	const [dates, setDates] = useState([]) ;
	const [empty, setEmpty] = useState(true) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
		// fetch('http://localhost:8000/appoint-list',{
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
		[	{type: "text", name: "title", label: "Enter Consultation Title", id:"consultTitle"},
		],
		[	{type: "textArea", name: "reason", label: "Reason for Consultation", id:"consultReason"},
		],
		[	{type: "dropdown", name: "appointDate", label:"Choose Date of Consultation", options: dates},
		],
		[	{type: "btn", name: "Request Consultation", style: "sched-btn"},
		],
	] ;

	//  2 : register karne ki request bhej raha hai.
	const sendConsultRequest = () => {
		const {title, reason, appointDate} = data ;

		// fetch('http://localhost:8000/consult',{
		fetch('https://api.psyment.com/consult',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : `Bearer ${token}` },
			body : JSON.stringify({date: appointDate, reason, title, choice }) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => {	
			setData(initData) ;
			setEmpty(!empty)
			addNotif('Successfully Sent Request for Consultation', 'success') ;
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif('Error Creating Appointment' , 'error') ;
		}) ;
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
		const {flag, title, reason} = data ;

		if(flag === 'yes') {
			const newError = {
				title: isBlank(title, 'Title'),
				reason: isBlank(reason, 'Reason'),
			}

			setError(newError) ;
		}
	}, [data])

	const onBookConsultClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="consult-form">	
			<BasicForm data={formData} errors={error} onClick={{"Request Consultation" : onBookConsultClick}} initData={initData} empty={empty}/>
		</div>
	) ;
}

export default ConsultForm ;