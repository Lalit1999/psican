import React from 'react' ;

import './admin.css' ;

class Admin extends React.Component
{
	render()
	{
		return(
			<div className = 'admin'>
				<div className = 'admin-bar'>
					<p>Total no. of users</p>
					<input type = 'text' placeholder = 'search' />

				</div>
				<div>
					Table
				</div>
			</div>
		) ;
	}
}

export default Admin ;