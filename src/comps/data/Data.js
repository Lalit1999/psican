import React from 'react' ;

// import EditProfile from '../UserProfile/editProfile/EditProfile.js' ;
import './Data.css' ;

class Data extends React.Component
{
	render()
	{	
		// console.log(this.props.mode) ;
		return(
			<div className = "flexe">
				<p className = "bolde" >{this.props.kiy}</p>
				<p>{this.props.value}</p>
			</div>
		) ;
	}
}

export default Data ;
				// <EditProfile fvalue = {this.props.kiy} />							
