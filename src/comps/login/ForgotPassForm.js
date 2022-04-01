import {useState, useEffect} from 'react';

import BasicForm from '../basicform/BasicForm.js' ;
import {invalidEmail } from '../valid.js' ;
import {addNotif} from '../notif.js';

const ForgotPassForm = ({setMode}) => {
	const [data, setData] = useState({email: ''}) ;
	const [error, setError] = useState({}) ;

	const formData = [
		[	{type: "text", name: "email", label: "Enter your registered Email-ID", id:"userEmail"},
		],
		[	{type: "btn", name: "Reset Password", style: "sched-btn"},
			{type: "link", name: "Register", style: "sched-btn", to: '/register'},
		],
	] ;

	const sendForgotRequest = () => {
		addNotif('Please Wait...') ;

		fetch('https://api.psyment.com/forgot',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body : JSON.stringify({ email: data.email}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Request sent for password reset', 'success') ;
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('E-Mail invalid', 'error') ;	
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendForgotRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		if(data.flag === 'yes') {
			const newError = {
				email: invalidEmail(data.email) ,
			}

			setError(newError) ;
		}
	}, [data])

	const onForgotClick = (obj) => setData({...obj, flag: 'yes'})

	return (
		<div className="login">	
			<BasicForm data={formData} errors={error} onClick={{"Reset Password" : onForgotClick}} initData={{email: ''}}/>
			<p className="nfp"> <strong>*Note: </strong>If you enter an E-Mail that exists in our database then you will recieve a mail containing your new password. You can re-change your password once you log back in. </p>
		</div>
	) ;
}

export default ForgotPassForm ;