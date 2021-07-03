import React from 'react' ;
import {Link} from'react-router-dom' ;

import './title.css' ;

const itemMap = {
	"Home -" : '',
	" About -" : '',
	"Contact Us" : 'contact',
	"Login" : 'login',
	"Register" : 'register',
	"Programs" : '',
	" Programs -" : '',
	"Consult" : 'consult',
	"Sarathi" : 'program/Sarathi',
	"AEQUESS" : 'program/AEQUESS',
	"Leader" : 'about/leader',
	"PSYMENT" : 'about/psyment',
	"Test " : 'test',
	"Test -" : 'test',
	"USTOP" : "test/ustop",
	"LETA" : "test/leta",
	"ACCIS" : "test/accis",
	"Privacy Policy" : "privacy-policy",
	"Refund Policy" : "refund-policy",
	"Terms & Conditions" : "terms-condition"
}

const Title = ({items, name}) => {

	const createSubTitle = () => {
		return items.map(item => {
			return (
				<div className = 'layout' key = {item}>
					<Link to={'/'+itemMap[item]}> &nbsp;{item}&nbsp; </Link>
				</div>
			);
		}) ;
	}

	return(
		<div className = 'bgimage '>
			<div className="colo">		
				<h1 className="title">{name}</h1>
				<div className="subtitle">
					{createSubTitle()} 
				</div>
			</div>
		</div>	
	) ;
}

export default Title ;