import {useState, useContext} from 'react' ;

import Redirect from '../redirect/Redirect.js' ;
import {addNotif} from '../notif.js' ;
import { invalidEmail, isBlank } from '../valid.js' ;
import Title from '../title/Title.js' ;
import LoginForm from './LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import '../consult/program.css' ;
import './login.css' ;

const Login = ( ) => {
	const {token, user, loadUser} = useContext(UserContext) ;
	const [mode, setMode] = useState('person') ;

	// const onSendReqClick = () => {
	// 	addNotif('Please Wait...') ;

	// 	fetch('https://psy-api.herokuapp.com/forgot',{
	// 		method : 'post' ,
	// 		headers : { 'Content-Type' : 'application/json'} ,
	// 		body : JSON.stringify({ email: data.email}) ,
	// 	})
	// 	.then(res => {
	// 		if(res.ok)
	// 			return res.json() ;
	// 		else
	// 			throw Error(res.statusText) ;
	// 	})
	// 	.then(data =>{	
			
	// 		addNotif('Request sent for password reset', 'success') ;
	// 	})  
	// 	.catch( err  => {
	// 		console.log(err) ;
			
	// 		addNotif('E-Mail invalid', 'error') ;	
	// 		setError('E-Mail doesn\'t exist in database');
	// 	}) ;
	// }

	// const resetPassword = () => {
	// 	const { email} = data ;
	// 	return (
	// 		<div>	
	// 			<LoginForm heading=" Reset Password " error={error}
	// 				b1="Register" b1type="link" to="/register" near="near"
	// 				b2="Send Request" onb2Click={onSendReqClick} >
	// 				<Text label="E-Mail" name="email" value={email} onChange={onInputChange}/>
	// 			</LoginForm>
	// 			<p className="nfp"> <strong>*Note: </strong>If you enter an E-Mail that exists in our database then you will recieve a mail containing your new password. You can re-change your password once you log back in. </p>
	// 		</div>
	// 		) ;
	// }

	const checkMode = () => {
		switch(mode) {
			case 'person': return <LoginForm setMode={setMode} /> ;
			// case 'fp' : return resetPassword() ;
			default : return 'You probably encountered a problem' ;
		}
	}

	if(user.name)
	{
		if(window.location.search)	{
			let q = window.location.search.split('?')[1].split('=') ;
			if (q[0] === 'rdr')
				switch(q[1])
				{
					case 'ustop' : return <Redirect to='/test/ustop' /> ;
					case 'leta' : return <Redirect to='/test/leta' /> ;
					case 'accis' : return <Redirect to='/test/accis' /> ;
					case 'consult' : return <Redirect to='/consult' /> ;
					case 'aequess' : return <Redirect to='/program/AEQUESS' /> ;
					default : return <Redirect to='/' /> ;
				}	
		}
		return <Redirect to='/' /> ;
	}
	else
		return(
			<div>
				<Title name='Login' items={["Home", "Login"]}/>
				<div className="login-con"> {checkMode()} </div>
			</div>
		) ;
}

export default Login ;