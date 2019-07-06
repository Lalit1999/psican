import React from 'react' ;
import {Link} from'react-router-dom' ;
import CheeseburgerMenu from 'cheeseburger-menu' ;
import HamburgerMenu from 'react-hamburger-menu' ;
import Popup from "reactjs-popup";

import Menu from './Menu.js' ;
import './header.css' ;

class Header extends React.Component
{	constructor(props) {
	    super(props)
	    this.state = {
	      menuOpen: false,
	    }
	}

	openMenu = () => {
	    this.setState({ menuOpen: true })
	}

	closeMenu = () => {
	    this.setState({ menuOpen: false })
	}

	checkMobile = () => {
		if(window.innerWidth > 923)
		{	return (
				<div className="mini-menu">
					<div>
						<Link className="header-item" to='/'> Home </Link>
						<Popup trigger={<span className="header-item"> About </span>}
						  position="bottom center" on="hover" >
						  <div className="pop-p">
							<Link className="header-item pop-item" to='/about/leader'> Our Leader </Link>
							<Link className="header-item pop-item" to='/about/psican'> PSICAN </Link>
							<Link className="header-item pop-item" to='/about/vision'> Vision </Link>
					      </div>
						</Popup>					
						<Popup trigger={<span className="header-item"> Programs </span>}
					      position="bottom center" on="hover" >
					      <div className="pop-p">
							<Link className="header-item pop-item" to='/program/AEQS'> AEQS </Link>
							<Link className="header-item pop-item" to='/program/KFMP'> KFMP </Link>
							<Link className="header-item pop-item" to='/program/personal'>
							 Personal Consultation </Link>
					      </div>
					    </Popup>
						<Link className="header-item" to='/test'> Tests </Link>
						<Link className="header-item" to='/mentamorph'> Menta-Morph </Link>
						<Link className="header-item" to='/contact'> Contact </Link>
					</div>
				</div>
				) ;
		}
		else
		{
			return (
				<div>
					<CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu}>
							<Menu closeCallback={this.closeMenu}/>
					</CheeseburgerMenu>
					<HamburgerMenu isOpen={this.state.menuOpen} menuClicked={this.openMenu} 
								   width={32} height={24} strokeWidth={8} color='white' 
								   borderRadius={1} animationDuration={0.5} />
				</div>
				) ;
		}
	}

	render()
	{
		return (
			<div className="topbar" id="bar"> 
				{this.checkMobile()}
				<div className = "right-header">
					<button className="header-btn"> Login </button>
					<button className="header-btn"> Register </button>
				</div>
			</div>
			) ;
	}
}

export default Header ;
