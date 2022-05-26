import {Link} from'react-router-dom' ;

import './title.css' ;

const itemMap = {
	"Home" : '',
	"About" : 'about',
	"Contact Us" : 'contact',
	"Login" : 'login',
	"Register" : 'register',
	"Consult" : 'consult',
	"Test" : 'test',
	"USTOP" : "test/ustop",
	"Privacy Policy" : "privacy-policy",
	"Refund Policy" : "refund-policy",
	"Terms & Conditions" : "terms-condition"
}

const Title = ({items, name}) => {
	return(
		<div className = 'main-title-con'>
			<div className="black-overlay">		
				<h1 className="title">{name}</h1>
				<div className="subtitle">
					{
						items.map( (item, i) => {
							return <div className='crumb' key={i}> 
								<Link to={`/${itemMap[item]}`}>&nbsp;{item}&nbsp;</Link>
								{ i !== (items.length - 1)?'-':' ' }
							</div> 
						})
					} 
				</div>
			</div>
		</div>	
	) ;
}

export default Title ;