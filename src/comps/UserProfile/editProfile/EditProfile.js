import React from 'react' ;
import Title from '../../title/Title.js' ;

import './EditProfile.css' ;

class EditProfile extends React.Component
{
	render() 
	{
		return(
			<div>
				<Title name = 'Edit Profile' items={["Home -", "Edit profile"]}/>
				<div className="editpropfileBoxe">
	            	<label >{this.props.kiy}&nbsp; : </label>
	            	<input type= "text" placeholder = {this.props.value} />
				</div>
				
			</div>
		) ;
	}
}

export default EditProfile ;
					// <p>{this.props.fvalue}</p>
					// <label className="lbel">{this.props.label}&nbsp; : </label>
	    //         	<input  className="inpu" type={type} name={this.props.label} 
	    //         		onChange={this.props.onChange} value={this.props.value} />