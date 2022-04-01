import {useState, useContext, useEffect} from 'react';

import {UserContext} from '../../context/UserContext.js' ;
import BasicForm from '../basicform/BasicForm.js' ;
import { isBlank, invalidEmail } from '../valid.js' ;
import {addNotif} from '../notif.js';

const initData = { email: '', password: '' } ;

const LoginForm = ({setMode}) => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	
	const {loadUser} = useContext(UserContext) ;

	const formData = [
		[	{type: "text", name: "email", label: "Enter your E-Mail", id:"userEmail"},
		],
		[	{type: "password", name: "password", label: "Enter your Password", id:"userPassword"},
		],
		[	{type: "btn", name: "Login", style: "sched-btn"},
			{type: "link", name: "Register", style: "sched-btn", to: '/register'},
		],
	] ;

	const sendLoginRequest = () => {
		const { password, email	} = data ;
		addNotif('Please Wait...') ;

		fetch('https://api.psyment.com/login',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify({ password, email	}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data =>{	
			setData(initData);
			addNotif('Successfully Logged In', 'success') ;
			loadUser(data) ;
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('Error Logging in', 'error') ;	
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendLoginRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		if(data.flag === 'yes') {
			const newError = {
				email: invalidEmail(data.email) ,
				password: isBlank(data.password, 'Password', 6, 30),
			}

			setError(newError) ;
		}
	}, [data])

	const onLoginClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="login">	
			<BasicForm data={formData} errors={error} onClick={{"Login" : onLoginClick}} initData={initData}/>
			<p className="fp" onClick={()=> setMode('fp') }> Forgot Password ? </p>
		</div>
	) ;
}

export default LoginForm ;