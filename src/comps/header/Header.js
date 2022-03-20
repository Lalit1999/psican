import React, {useState} from 'react' ;
import { Link } from'react-router-dom' ;
import { addNotif } from '.././notif.js' ;
import CheeseburgerMenu from 'cheeseburger-menu' ;
import HamburgerMenu from 'react-hamburger-menu' ;
import Popup from "reactjs-popup";

import Menu from './Menu.js' ;
import './header.css' ;

const Header = (props) => {
	const [menuOpen, setMenuOpen] = useState(false) ;

	const onButtonClick = (path) => {
		props.history.push('/') ;
		props.history.push('/' + path) ;
	}

	const onLogoutClick = () => {
		
		fetch('https://psy-api.herokuapp.com/logoutAll' ,{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + props.token} ,
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
				props.loadUser({}) ;
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
						<Popup trigger={<span className="header-item"> About </span>}
						  position="bottom center" on="hover" >
						  <div className="pop-p">
							<Link className="header-item pop-item" to='/about/leader'> Our Leader </Link>
							<Link className="header-item pop-item" to='/about/psyment'> PSYMENT </Link>
					      </div>
						</Popup>					
						<Popup trigger={<span className="header-item"> Programs </span>}
					      position="bottom center" on="hover" >
					      <div className="pop-p">
							<Link className="header-item pop-item" to='/program/AEQUESS'> AEQUESS </Link>
							<Link className="header-item pop-item" to='/program/sarathi'> Sarathi </Link>
					      </div>
					    </Popup>
						<Link className="header-item" to='/consult'> Consult </Link>
						<Link className="header-item" to='/test'> Tests </Link>
						<Link className="header-item" to='/contact'> Contact Us </Link>
						{props.user.name==='admin'?<Link className="header-item" to='/admin'> Admin </Link>:null}
					</div>
				</div>
				) ;
		}
		else
		{
			return (
				<div>
					<CheeseburgerMenu isOpen={menuOpen} closeCallback={() => setMenuOpen(false)}>
							<Menu closeCallback={() => setMenuOpen(false)} checkLoggedIn={checkLoggedIn} user={props.user}/>
					</CheeseburgerMenu>
					<HamburgerMenu isOpen={menuOpen} menuClicked={() => setMenuOpen(true)} 
								   width={32} height={24} strokeWidth={8} color='white' 
								   borderRadius={1} animationDuration={0.5} />
				</div>
				) ;
		}
	}

	const checkLoggedIn = (str = '', str2 = '') => {
		if(props.token === '')
		{
			return (
				<div className = {"right-header "+str2}>
					<button className={"header-btn "+str} onClick={()=>onButtonClick('login')}>
					 Login </button>
					<button className={"header-btn "+str}  onClick={()=>onButtonClick('register')}>
					 Register </button>
				</div>
				) ;
		}
		else
		{
			return (
				<div className = {"right-header "+str2}>
					<Link className={"header-btn "+str} to="/profile"> {props.user.name} </Link>
					<button className={"header-btn "+str}  onClick={onLogoutClick}> Logout </button>
				</div>
				) ;
		}
	}

	return (
		<div className="topbar" id="bar"> 
			{checkMobile()}
			{checkLoggedIn()}
		</div>
	) ;
}

export default Header ;