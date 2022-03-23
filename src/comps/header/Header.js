import {useState, useContext} from 'react' ;
import { Link } from'react-router-dom' ;
import CheeseburgerMenu from 'cheeseburger-menu' ;
import HamburgerMenu from 'react-hamburger-menu' ;

import Menu from './Menu.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import { addNotif } from '.././notif.js' ;
import './header.css' ;

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false) ;
	const {token, user, loadUser} = useContext(UserContext) ;

	const onLogoutClick = () => {
		
		fetch('https://psy-api.herokuapp.com/logoutAll' ,{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + token} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				addNotif('Successfully Logged Out', 'success') ;	
				localStorage.clear() ;
				loadUser({}) ;
			}) 
			.catch( err  => {
				addNotif('There was a problem with logout', 'error') ;	
				console.log(err) ; 
			}) ;
	}

	const checkMobile = () => {
		if(window.screen.availWidth > 923)
		{	return (
				<div className="mini-menu">
					<div>
						<Link className="header-item" to='/'> Home </Link>
						<Link className="header-item" to='/about'> About </Link>
						<Link className="header-item" to='/test'> Tests </Link>
						<Link className="header-item" to='/consult'> Consult </Link>
						<Link className="header-item" to='/contact'> Contact </Link>
						{user.name==='admin'?<Link className="header-item" to='/admin'> Admin </Link>:null}
					</div>
				</div>
				) ;
		}
		else {
			return (
				<div>
					<CheeseburgerMenu isOpen={menuOpen} closeCallback={() => setMenuOpen(false)}>
							<Menu closeCallback={() => setMenuOpen(false)} checkLoggedIn={checkLoggedIn} user={user}/>
					</CheeseburgerMenu>
					<HamburgerMenu isOpen={menuOpen} menuClicked={() => setMenuOpen(true)} 
								   width={32} height={24} strokeWidth={8} color='white' 
								   borderRadius={1} animationDuration={0.5} />
				</div>
				) ;
		}
	}

	const checkLoggedIn = () => {
		if(token === '') 	{
			return (
				<div className="right-header">
					<Link className="header-btn" to="/login"> Login </Link>
					<Link className="header-btn" to="/register"> Register </Link>
				</div>
			) ;
		}
		else 	{
			return (
				<div className="right-header">
					<Link className="header-btn" to="/profile"> {user.name} </Link>
					<button className="header-btn" onClick={onLogoutClick}> Logout </button>
				</div>
			) ;
		}
	}

	return <div className="header"> {checkMobile()} {checkLoggedIn()} </div> ;
}

export default Header ;