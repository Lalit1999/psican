import { useContext } from 'react' ;
import { Link } from'react-router-dom' ;
import { UserContext } from '../../context/UserContext.js' ;
import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import Offcanvas from 'react-bootstrap/Offcanvas';

import './menu.css' ;

const Address = () => {
	return (
		<div className="footerIcons menu-item">
			<a href="https://www.google.com/maps/place/ORN+Remedies+Pvt.+Ltd./@28.6837717,77.1702569,18z/data=!4m5!3m4!1s0x390d03cb3bdd2fff:0x396a094b8bb9d820!8m2!3d28.6837717!4d77.1713512" target="_blank" rel="noreferrer"><FontAwesomeIcon icon = {faMap} /></a>
			<a href="tel:09555235231" ><FontAwesomeIcon icon = {faPhoneAlt} /></a>
			<a href="mailto:info.psyment@gmail.com"><FontAwesomeIcon icon = {faEnvelope} /></a>
		</div>
	) ;
}

const Menu = ({handleClose, show, onLogoutClick}) => {	
	
	const {token, user} = useContext(UserContext) ;

	const checkLoggedIn = () => {
		if(token === '') 	{
			return (
				<div className="offcanvas-login">
					<Link className="menu-item " to="/login"> Login </Link>
					<Link className="menu-item " to="/register"> Register </Link>
				</div>
			) ;
		}
		else 	{
			return (
				<div className="offcanvas-login">
					<Link className="menu-item " to="/profile"> {user.name} </Link>
					<button className="menu-item " onClick={onLogoutClick}> Logout </button>
				</div>
			) ;
		}
	}

	return (
		<Offcanvas className="psyment-menu" show={show} onHide={handleClose}>
	        <Offcanvas.Header closeButton>
	          	<Offcanvas.Title>Menu</Offcanvas.Title>
	        </Offcanvas.Header>
	        <Offcanvas.Body>
	          	<div className="offcanvas-menu" onClick={handleClose}>
	 				<Link className="menu-item " to='/'> Home </Link>
	 				<Link className="menu-item " to='/about'> About </Link>
	 				<a className="menu-item " href='https://play.google.com/store/apps/details?id=com.myarth.psyment'> Consult </a>
	 				<Link className="menu-item " to='/test'> Tests </Link>
	 				<Link className="menu-item " to='/contact'> Contact Us </Link>
	 				{user.name==='admin'?<Link className="menu-item" to='/admin'> Admin </Link>:null}
	 				{checkLoggedIn()}
	 				<Address />
	 			</div>
	        </Offcanvas.Body>
      	</Offcanvas>
    ) ;
}

export default Menu ;