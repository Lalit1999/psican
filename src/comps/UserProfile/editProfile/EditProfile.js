import React from 'react' ;
import Title from '../../title/Title.js' ;

import './EditProfile.css' ;

class EditProfile extends React.Component
{
	render() 
	{		
		if(this.props.num === '0' )
		{
			return(
				<div>
					<Title name = 'Edit Profile' items={["Home -", "Edit profile"]}/>
					<div className="editpropfileBoxe">
		            	this is EditProfile user
					</div> 
				</div>
			) ;			
		}
		else if (this.props.num === '1')
		{
			return(
				<div>
					<Title name = 'Edit Profile' items={["Home -", "Edit profile"]}/>
					<div className="editpropfileBoxe">
		            	this is EditProfile school
					</div> 
				</div>
			) ;
		}
		else
		{
			return(
				<div>No user found</div>
			) ;
		}	
	}
}

export default EditProfile ;
					