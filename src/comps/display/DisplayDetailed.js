import React from 'react' ;
import Heading from '../Heading/Heading.js' ;

class DisplayDetailed extends React.Component
{	createLi = () => {
 		return this.props.lidata.map( (li,i) => <li className="banner-li" key={i}> {li} </li> ) ;
 	}
	render()
	{
		return (
			<div className="display-detail">
				<Heading text={this.props.title}/>
				<div className="intro">
					<ul>
						{this.createLi()}
					</ul>
				</div>
			</div>
			) ;
	}
}

export default DisplayDetailed ;