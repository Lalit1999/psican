import React from 'react' ;
import {Link} from'react-router-dom' ;
import Popup from "reactjs-popup";

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
						<Popup trigger={<div className="menu-item"> About </div>}
						  position="right top" on="hover" >
						  <div className="pop-p" onClick={this.props.closeCallback}>
							<Link className="menu-item pop-item" to='/about/leader'> Our Leader </Link>
							<Link className="menu-item pop-item" to='/about/psican'> PSICAN </Link>
							<Link className="menu-item pop-item" to='/about/vision'> Vision </Link>
					      </div>
						</Popup>					
						<Popup trigger={<div className="menu-item"> Programs </div>}
					      position="right top" on="hover" >
					      <div className="pop-p" onClick={this.props.closeCallback}>
							<Link className="menu-item pop-item" to='/program/AEQS'> AEQS </Link>
							<Link className="menu-item pop-item" to='/program/KFMP'> KFMP </Link>
							<Link className="menu-item pop-item" to='/program/personal'>
							 Personal Consultation </Link>
					      </div>
					    </Popup>
						<Link className="menu-item" to='/test'> Tests </Link> 
						<Link className="menu-item" to='/mentamorph'> Menta-Morph </Link>
						<Link className="menu-item" to='/contact'> Contact </Link>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Menu ;