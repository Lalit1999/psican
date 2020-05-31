import React from 'react' ;

import './Data.css' ;

class Data extends React.Component
{
	render()
	{	
		console.log(this.props) ;
		return(
			<div className = "flexe">
				<p className = "bolde" >{this.props.kiy}</p>
				<p>{this.props.value}</p>							
			</div>
		) ;
	}
}

export default Data ;
