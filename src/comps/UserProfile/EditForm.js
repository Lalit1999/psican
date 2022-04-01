import {useState, useContext, useEffect} from 'react';

import {UserContext} from '../../context/UserContext.js' ;
import BasicForm from '../../comps/basicform/BasicForm.js' ;
import { invalidEmail, invalidName, invalidMobile, isMaxMin } from '../../comps/valid.js' ;
import {addNotif} from '../../comps/notif.js';

const initData = { name: '', email: '', mobile: '', age: 0, gender: ''} ;

const EditForm = () => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	
	const {user, loadUser, token} = useContext(UserContext) ;

	const formData = [
		[	{type: "text", name: "name", label: "Enter your Name", id:"userName"},
		],
		[	{type: "text", name: "email", label: "Enter your E-Mail", id:"userEmail"},
		],
		[	{type: "text", name: "mobile", label: "Enter your Mobile", id:"userMobile"},
		],
		[	{type: "number", name: "age", label: "Enter your Age", id: "userAge"}
		],
		[	{type: "dropdown", name: "gender", label:"Enter Gender", options:["Male", "Female"]},
		],
		[	{type: "btn", name: "Edit Details", style: "sched-btn"},
		],
	] ;
	
	const sendEditRequest = () => {
		addNotif('Please Wait...') ;

		fetch('https://api.psyment.com/users/me',{
			method : 'PATCH' ,
			headers : { 'Content-Type' : 'application/json', 
						'Authorization' : `Bearer ${token}` },
			body :JSON.stringify(data) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data => {	
			addNotif('Successfully Updated Profile', 'success') ;
			loadUser(data) ;
		}) 
		.catch( err  => {
			console.log(err) ;
			addNotif('Error updating profile' , 'error') ;
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendEditRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		const {flag, name, mobile, email, age} = data ;

		if(flag === 'yes') {
			const newError = {
				name: invalidName(name),
				mobile: invalidMobile(mobile),
				email: invalidEmail(email),
				age: isMaxMin(age,'Age',10,100),
			}

			setError(newError) ;
		}
	}, [data])

	const onEditClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="changepass">	
			<BasicForm data={formData} errors={error} onClick={{'Edit Details' : onEditClick}} initData={user}/>
		</div>
	) ;
}

export default EditForm ;