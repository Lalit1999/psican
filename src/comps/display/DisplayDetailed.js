import React from 'react' ;
import Heading from '../Heading/Heading.js' ;

import './Display.css' ;

const DisplayDetailed = ({lidata, title, small}) => {
	
	const createLi = () => {
 		return lidata.map( (li,i) => {
 			if(li.startsWith('html'))
			{	li = li.replace('html','') ;
				return <li className="list-li" key={i} dangerouslySetInnerHTML={{ __html: li}} /> ;
 			}
			else 		
 				return <li className="list-li" key={i}> {li} </li> ; 
 		}) ;
 	}

	return (
		<div className="display-detail">
			<Heading text={title} small={small}/>
			<div className="list">
				<ul>
					{createLi()}
				</ul>
			</div>
		</div>
	) ;
}

export default DisplayDetailed ;