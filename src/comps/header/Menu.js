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
							<Link className="menu-item pop-item" to='/about/psyment'> PSYMENT </Link>
							<Link className="menu-item pop-item" to='/about/vision'> Vision </Link>
					      </div>
						</Popup>					
						<Popup trigger={<div className="menu-item">Social Programs </div>}
					      position="right top" on="hover" >
					      <div className="pop-p" onClick={this.props.closeCallback}>
							<Popup trigger={<span className="header-item pop-item"> Students </span>}
					      		position="right top" on="hover">
								<Link className="header-item pop-item" to='/program/AEQUESS'> AEQUESS </Link>
							</Popup>
							<Popup trigger={<span className="header-item pop-item"> School/College </span>}
					      		position="right top" on="hover">
								<Link className="header-item pop-item" to='/program/sarathi'> Sarathi </Link>
							</Popup>
					      </div>
					    </Popup>
						<Link className="menu-item" to='/consult'> Consult </Link>
						<Link className="menu-item" to='/contact'> Contact Us </Link>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Menu ;

					// Before Link menu-item contact
					  //   <Popup trigger={<div className="menu-item">Commercial Programs </div>}
					  //     position="right top" on="hover" >
					  //     <div className="pop-p" onClick={this.props.closeCallback}>
							// <Link className="menu-item pop-item" to='/test'>Psychometric Tests </Link> 
							// <Link className="menu-item pop-item" to='/mentamorph'> Menta-Morph </Link>
							// <Link className="menu-item pop-item" to='/program/personal'>
							//  Personal Consultation </Link>
					  //     </div>
					  //   </Popup>