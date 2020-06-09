import React from 'react' ;

import './Data.css' ;

class Data extends React.Component
{	render()
	{	return(
			<div className = "data-flex">
				<p className = "data-bold" >{this.props.kiy}</p>
				<p className ="data-right" >{this.props.value}</p>
			</div>
		) ;
	}
}

export default Data ;