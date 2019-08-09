import React from 'react' ;
import {Link} from'react-router-dom' ;
import {withRouter} from 'react-router' ;
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

	onButtonClick = (path) => {
		this.props.history.push('/') ;
		this.props.history.push('/' + path) ;
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
							<Link className="header-item pop-item" to='/about/psyment'> PSYMENT </Link>
							<Link className="header-item pop-item" to='/about/vision'> Vision </Link>
					      </div>
						</Popup>					
						<Popup trigger={<span className="header-item">Social Programs </span>}
					      position="bottom center" on="hover" >
					      <div className="pop-p">
					      	<Popup trigger={<span className="header-item pop-item"> Students </span>}
					      		position="right top" on="hover">
								<Link className="header-item pop-item" to='/program/AQUESS'> AQUESS </Link>
							</Popup>
							<Popup trigger={<span className="header-item pop-item"> School/College </span>}
					      		position="right top" on="hover">
								<Link className="header-item pop-item" to='/program/sarathi'> Sarathi </Link>
							</Popup>
							<Popup trigger={<span className="header-item pop-item"> Parents </span>}
					      		position="right top" on="hover">
								<Link className="header-item pop-item" to='/parenting'>
								 Parenting Strategies</Link>
							</Popup>	
					      </div>
					    </Popup>
						
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
					<button className="header-btn" onClick={()=>this.onButtonClick('login')}>
					 Login </button>
					<button className="header-btn"  onClick={()=>this.onButtonClick('register')}>
					 Register </button>
				</div>
			</div>
			) ;
	}
}

export default withRouter(Header) ;

					 //  Before Link header-item Contact
					  //   <Popup trigger={<span className="header-item"> Commercial Programs </span>}
					  //     position="bottom center" on="hover" >
					  //     <div className="pop-p">
							// <Link className="header-item pop-item" to='/test'> Psychometric Tests </Link>
							// <Link className="header-item pop-item" to='/mentamorph'> Menta-Morph </Link>
							// <Link className="header-item pop-item" to='/program/personal'>
							//  Personal Consultation </Link>
					  //     </div>
					  //   </Popup>
