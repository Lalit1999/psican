import { useState, useEffect, useContext } from 'react';

import { isBlank, invalidDate } from '../valid.js' ;
import BasicForm from '../basicform/BasicForm.js' ;
import { addNotif } from '../notif.js' ;
import {UserContext} from '../../context/UserContext.js' ;

const initData = { title: '', reason: '', appointDate: '' } ;

const ConsultForm = () => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	const {token} = useContext(UserContext) ;

	const formData = [
		[	{type: "text", name: "title", label: "Enter Consultation Title", id:"consultTitle"},
		],
		[	{type: "textArea", name: "reason", label: "Enter Reason for Consultation", id:"consultReason"},
		],
		[	{type: "date", name: "appointDate", label: "Choose Date of Consultation", id: "consultDate"}
		],
		[	{type: "btn", name: "Request Consultation", style: "sched-btn"},
		],
	] ;
	
	//  2 : register karne ki request bhej raha hai.
	const sendConsultRequest = () => {
		const {title, reason, appointDate} = data ;

		console.log(title, reason, appointDate) ;

		fetch('http://api.psyment.com/consult',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : `Bearer ${token}` },
			body : JSON.stringify({date: appointDate, reason, title }) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => {	
			setData(initData) ;
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
		const {flag, title, reason, appointDate} = data ;

		if(flag === 'yes') {
			const newError = {
				title: isBlank(title, 'Title'),
				reason: isBlank(reason, 'Reason'),
				appointDate: invalidDate(appointDate), 
			}

			setError(newError) ;
		}
	}, [data])

	const onBookConsultClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="consult-form">	
			<BasicForm data={formData} errors={error} onClick={{"Request Consultation" : onBookConsultClick}} initData={initData}/>
		</div>
	) ;
}

export default ConsultForm ;