import {useContext} from 'react' ;
import {Link} from'react-router-dom' ;
import Offcanvas from 'react-bootstrap/Offcanvas';
import {UserContext} from '../../context/UserContext.js' ;

import './menu.css' ;

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
	 				<Link className="menu-item " to='/consult'> Consult </Link>
	 				<Link className="menu-item " to='/test'> Tests </Link>
	 				<Link className="menu-item " to='/contact'> Contact Us </Link>
	 				{user.name==='admin'?<Link className="menu-item" to='/admin'> Admin </Link>:null}
	 				{checkLoggedIn()}
	 			</div>
	        </Offcanvas.Body>
      	</Offcanvas>
    ) ;
}

export default Menu ;