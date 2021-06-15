import React from 'react' ;
import {Link} from'react-router-dom' ;
import { faSortDown } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

import './menu.css' ;

const Menu = ({closeCallback, checkLoggedIn, user}) => {	
	return(
		<div>
			<div className="burger">
				<div className="innerburger" onClick={closeCallback}>
					<Link className="menu-item" to='/'> Home </Link>
					<div className="menu-item no-border"> About &ensp;
						<FontAwesomeIcon icon={faSortDown}/>
					</div>
					<Link className="menu-item sub-item no-border" to='/about/leader'> Our Leader </Link>
					<Link className="menu-item sub-item" to='/about/psyment'> PSYMENT </Link>
				 	<div className="menu-item no-border"> Programs &ensp;
						<FontAwesomeIcon icon={faSortDown}/>
					</div>
					<Link className="menu-item sub-item no-border" to='/program/AEQUESS'> AEQUESS </Link>
					<Link className="menu-item sub-item" to='/program/sarathi'> Sarathi </Link>
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