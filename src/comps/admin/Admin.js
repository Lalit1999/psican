import React from 'react' ;
import {Redirect} from'react-router-dom' ;
import { addNotif } from '../notif.js' ;


import './admin.css' ;

class Admin extends React.Component
{
	state = {
		
		user : [] ,
		school : [] ,
		test : []
	} ;

	componentDidMount = () => {
		fetch('https://psy-api.herokuapp.com/test',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + this.props.token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => {	
				console.log(data) ;
				addNotif('Successfully data fetch', 'success') ;
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
		
	}
	render()
	{	console.log(this.props) ;
		if(this.props.user && this.props.user === 'admin')
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
		else
			return <Redirect to = '/login' />		
	}
}

export default Admin ;
					// <Redirect to='/admin' />