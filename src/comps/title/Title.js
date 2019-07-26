import React from 'react' ;
import {Link} from'react-router-dom' ;

import './title.css' ;

class Title extends React.Component
{	mapItem = (str) => {
		switch(str)
		{
			case "Home -" : case " About -" : return '' ;
			case "Contact Us" : return 'contact';
			case "MentaMorph" : return 'mentamorph' ;
			case "Login" : return 'login' ;
			case "Register" : return 'register' ;
			case "Tests" : return 'test' ;
			case "Programs" : case " Programs -" : return 'program' ;
			case "Personal" : return 'program/personal' ;
			case "Sarathi" : return 'program/Sarathi' ;
			case "AQueSS" : return 'program/AQueSS' ;
			case "Leader" : return 'about/leader' ;
			case "PSYMENT" : return 'about/psyment' ;
			case "Vision" : return 'about/vision' ; 
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
	{
		return(
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