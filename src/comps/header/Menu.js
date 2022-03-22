import {Link} from'react-router-dom' ;

import './menu.css' ;

const Menu = ({closeCallback, checkLoggedIn, user}) => {	
	return(
		<div>
			<div className="burger">
				<div className="innerburger" onClick={closeCallback}>
					<Link className="menu-item" to='/'> Home </Link>
					<Link className="menu-item" to='/about'> About </Link>
					<Link className="menu-item" to='/consult'> Consult </Link>
					<Link className="menu-item" to='/test'> Tests </Link>
					<Link className="menu-item" to='/contact'> Contact Us </Link>
					{user.name==='admin'?<Link className="menu-item" to='/admin'> Admin </Link>:null}
					{checkLoggedIn('menu-btn', 'menu-div')}
				</div>
			</div>
		</div>
	) ;
}

export default Menu ;