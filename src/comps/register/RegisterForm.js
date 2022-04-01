import { useState, useContext, useEffect } from 'react';

import { invalidEmail, invalidMobile, invalidPass, invalidName, isBlank, isMaxMin } from '../valid.js' ;
import BasicForm from '../basicform/BasicForm.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import {addNotif} from '../notif.js';

const initData = { name: '', email: '', mobile: '', age: 0, gender: '', password: '', repass: '' } ;

const RegisterForm = ({setMode}) => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;

	const {loadUser} = useContext(UserContext) ;

	const formData = [
		[	{type: "text", name: "name", label: "Enter your Name", id:"userName"},
			{type: "text", name: "email", label: "Enter your E-Mail", id:"userEmail"},
		],
		[	{type: "text", name: "mobile", label: "Enter your Mobile", id:"userMobile"},
			{type: "number", name: "age", label: "Enter your Age", id: "userAge"}
		],
		[	{type: "dropdown", name: "gender", label:"Enter Gender", options:["Male", "Female"]},
		],
		[	{type: "password", name: "password", label: "Enter Password", id:"userPassword"},
			{type: "password", name: "repass", label: "Re-Enter Password", id:"userRePassword"},
		],
		[	{type: "btn", name: "Register", style: "sched-btn"},
			{type: "link", name: "Login", style: "sched-btn", to: '/login'},
		],
	] ;
	
	//  2 : register karne ki request bhej raha hai.
	const sendRegisterRequest = () => {
		addNotif('Please Wait...') ;

		fetch('https://api.psyment.com/users' ,{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify(data) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => {	
			setData(initData) ;
			addNotif('Successfully Registered', 'success') ;
			loadUser(data) ;
		}) 
		.catch( err  => {
			console.log(err) ;
			addNotif('Error while registration' , 'error') ;
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendRegisterRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		const {flag, name, mobile, email, age, gender, password, repass} = data ;

		if(flag === 'yes') {
			const newError = {
				name: invalidName(name),
				mobile: invalidMobile(mobile),
				email: invalidEmail(email),
				age: isMaxMin(age,'Age',10,100),
				gender: isBlank(gender,'Gender'),
				password: invalidPass(password, repass), 
				repass: invalidPass(password, repass),
			}

			setError(newError) ;
		}
	}, [data])

	const onRegisterClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="login register">	
			<BasicForm data={formData} errors={error} onClick={{"Register" : onRegisterClick}} initData={initData}/>
		</div>
	) ;
}

export default RegisterForm ;