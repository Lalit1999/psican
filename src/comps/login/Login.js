import {useState, useContext} from 'react' ;

import Redirect from '../redirect/Redirect.js' ;
import Title from '../title/Title.js' ;
import LoginForm from './LoginForm.js' ;
import ForgotPassForm from './ForgotPassForm.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import '../consult/program.css' ;
import './login.css' ;

const Login = ( ) => {
	const {user} = useContext(UserContext) ;
	const [mode, setMode] = useState('person') ;

	const checkMode = () => {
		switch(mode) {
			case 'person': return <LoginForm setMode={setMode} /> ;
			case 'fp' : return <ForgotPassForm setMode={setMode} /> ;
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
					case 'nhapass' : return <Redirect to='/test/nhapass' /> ;
					case 'consult' : return <Redirect to='/consult' /> ;
					default : return <Redirect to='/' /> ;
				}	
		}
		return <Redirect to='/' /> ;
	}
	else
		return(
			<div className="login-page">
				<Title name='Login' items={["Home", "Login"]}/>
				<div className="login-con"> {checkMode()} </div>
			</div>
		) ;
}

export default Login ;