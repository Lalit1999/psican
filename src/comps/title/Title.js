import React from 'react' ;
import {Link} from'react-router-dom' ;

import './title.css' ;

class Title extends React.Component
{	mapItem = (str) => {
		switch(str)
		{
			case "Home -" : case " About -" : return '' ;
			case "Contact Us" : return 'contact';
			case "Login" : return 'login' ;
			case "Register" : return 'register' ;
			case "Programs" : case " Programs -" : return '' ;
			case "Consult" : return 'consult' ;
			case "Sarathi" : return 'program/Sarathi' ;
			case "AEQUESS" : return 'program/AEQUESS' ;
			case "Leader" : return 'about/leader' ;
			case "PSYMENT" : return 'about/psyment' ;
			case "Vision" : return 'about/vision' ; 
			case "Test " : case "Test -": return 'test' ;
			case "SAAT" : return "test/self-anxiety-assessment" ;
			case "LETA" : return "test/trait-test" ;
			case "Privacy Policy" : return "privacy-policy" ;
			case "Refund Policy" : return "refund-policy" ;
			case "Terms & Conditions" : return "terms-condition" ;
			default : return '' ;
		}

	}

	createSubTitle = () => {
		return this.props.items.map(item => {
			return (
			<div className = 'layout' key = {item}>
				<Link to={'/'+this.mapItem(item)}> &nbsp;{item}&nbsp; </Link>
			</div>
			);
		}) ;
	}

	render()
	{	return(
			<div className = 'bgimage '>
				<div className="colo">		
					<h1 className="title">{this.props.name}</h1>
					<div className="subtitle">
						{this.createSubTitle()} 
					</div>
				</div>
			</div>	
		) ;
	}
}

export default Title ;