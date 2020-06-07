import React from 'react' ;
import Heading from '../Heading/Heading.js' ;

import './Display.css' ;

class DisplayDetailed extends React.Component
{	createLi = () => {
 		return this.props.lidata.map( (li,i) => {
 			if(li.startsWith('html'))
 				{	li = li.replace('html','') ;
 				return <li className="list-li" key={i} dangerouslySetInnerHTML={{ __html: li}}/>
 			}
			else 		
 				return <li className="list-li" key={i}> {li} </li> ; 
 		}) ;
 	}
	render()
	{
		return (
			<div className="display-detail">
				<Heading text={this.props.title} small={this.props.small}/>
				<div className="list">
					<ul>
						{this.createLi()}
					</ul>
				</div>
			</div>
			) ;
	}
}

export default DisplayDetailed ;