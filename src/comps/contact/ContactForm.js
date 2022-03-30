import {useState, useEffect} from 'react';

import BasicForm from '../basicform/BasicForm.js' ;
import { isBlank, invalidEmail, invalidName, invalidMobile } from '../valid.js' ;
import {addNotif} from '../notif.js';

const initData = {	name: '',	email: '',	mobile: '',	message: ''	} ;

const ContactForm = () => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	
	const formData = [
		[	{type: "text", name: "name", label: "Name", id:"userName"},
		],
		[	{type: "text", name: "email", label: "E-Mail", id:"userEmail"},
		],
		[	{type: "text", name: "mobile", label: "Mobile", id:"userMobile"},
		],
		[	{type: "textArea", name: "message", label: "Enter your Message", id:"userMessage"},
		],
		[	{type: "btn", name: "Send Message", style: "sched-btn"},
		],
	] ;

	const sendContactRequest = () => {
		addNotif('Please Wait...') ;

		fetch('http://api.psyment.com/contact',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body : JSON.stringify(data) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => {	
			setData(initData) ;
			addNotif('Successfully Sent Message/Feedback', 'success') ;
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif('There was a problem with sending message', 'error') ;
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendContactRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		const {flag, name, email, message, mobile} = data ;

		if(flag === 'yes') {
			const newError = {
				name: invalidName(name),
				email: invalidEmail(email),
				mobile: invalidMobile(mobile),
				message: isBlank(message, 'Message'),
			}

			setError(newError) ;
		}
	}, [data])

	const onContactClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="login contact">	
			<BasicForm data={formData} errors={error} onClick={{"Send Message" : onContactClick}} initData={initData}/>
		</div>
	) ;
}

export default ContactForm ;