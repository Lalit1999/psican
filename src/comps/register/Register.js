import {useContext} from 'react' ;

import Redirect from '../redirect/Redirect.js' ;
import Title from '../title/Title.js' ;
import RegisterForm from './RegisterForm.js' ;
import {UserContext} from '../../context/UserContext.js' ;

const Register = () => {
	const {user} = useContext(UserContext) ;

	// const sendRegisterRequest = () => {
	// 	addNotif('Please Wait...') ;

	// 	fetch('https://psy-api.herokuapp.com/users/me',{
	// 		method : 'PATCH' ,
	// 		headers : { 'Content-Type' : 'application/json', 
	// 					'Authorization' : `Bearer ${token}` },
	// 		body :JSON.stringify(data) ,
	// 	})
	// 	.then(res => {
	// 		if(res.ok)
	// 			return res.json() ;
	// 		else
	// 			throw Error(res.statusText) ;
	// 	})
	// 	.then(data => {	
			
	// 		addNotif('Successfully Updated Profile', 'success') ;

	// 		loadUser(data) ;
	// 		edit() ;
	// 	}) 
	// 	.catch( err  => {
	// 		console.log(err) ;
			
	// 		addNotif('Error updating profile' , 'error') ;
	// 	}) ;
	// }

    if(user.name)  {
		if(window.location.search)	{
			let q = window.location.search.split('?')[1].split('=') ;
			if (q[0] === 'rdr')
				switch(q[1])
				{
					case 'ustop' : return <Redirect to='/test/ustop' /> ;
					case 'leta' : return <Redirect to='/test/leta' /> ;
					case 'accis' : return <Redirect to='/test/accis' /> ;
					case 'consult' : return <Redirect to='/consult' /> ;
					default : return <Redirect to='/' /> ;
				}	
		}
		return <Redirect to='/' /> ;
	}
	else
		return(
			<div>
				<Title name='Register' items={["Home", "Register"]}/>
				<div className="login-con"> <RegisterForm /> </div>
			</div>
		) ;
}

export default Register ;