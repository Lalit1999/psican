import React from 'react' ;
import {Link} from'react-router-dom' ;
import { faSortDown } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

import './menu.css' ;

class Menu extends React.Component
{	
	render()
	{	
		return(
			<div>
				<div className="burger">
					<div className="innerburger" onClick={this.props.closeCallback}>
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
						{this.props.checkLoggedIn('menu-btn', 'menu-div')}
					</div>
				</div>
			</div>
		) ;
	}
}

export default Menu ;