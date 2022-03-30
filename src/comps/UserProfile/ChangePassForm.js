import {useState, useContext, useEffect} from 'react';

import {UserContext} from '../../context/UserContext.js' ;
import BasicForm from '../../comps/basicform/BasicForm.js' ;
import { isBlank, invalidPass } from '../../comps/valid.js' ;
import {addNotif} from '../../comps/notif.js';

import './UserProfile.css' ;

const initData = { oldpass: '', newpass: '', repass: '' } ;

const ChangePassForm = () => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	
	const {loadUser, token} = useContext(UserContext) ;

	const formData = [
		[	{type: "password", name: "oldpass", label: "Enter Old Password", id:"userOldPassword"},
		],
		[	{type: "password", name: "newpass", label: "Enter New Password", id:"userNewPassword"},
		],
		[	{type: "password", name: "repass", label: "Re-Enter New Password", id:"userRePassword"},
		],
		[	{type: "btn", name: 'Change Password', style: "sched-btn"},
		],
	] ;
	
	const sendChangeRequest = () => {
		const {oldpass, newpass} = data ;

		fetch('http://api.psyment.com/users/me/change',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : `Bearer ${token}` } ,
				body: JSON.stringify({ oldpass, newpass})
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Password Changed Successfully!', 'success') ;
			loadUser({})
		})
		.catch( err  => {
			addNotif('Unable to Change Password!', 'error') ;
			console.log(err) ; 
		}) ;
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendChangeRequest() ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		const {oldpass, newpass, repass, flag} = data ; 

		if(flag === 'yes') {
			const newError = {
				oldpass: isBlank(oldpass, 'Password', 6, 30),
				newpass: invalidPass(newpass, repass), 
				repass: invalidPass(newpass, repass),
			}

			setError(newError) ;
		}
	}, [data])

	const onChangePassClick = (obj) => setData({...obj, flag: 'yes'}) 

	return (
		<div className="changepass">	
			<BasicForm data={formData} errors={error} onClick={{'Change Password' : onChangePassClick}} initData={initData}/>
		</div>
	) ;
}

export default ChangePassForm ;