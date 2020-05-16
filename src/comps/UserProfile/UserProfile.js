import React from 'react' ;
import {Link} from'react-router-dom' ;
import {Redirect} from'react-router-dom' ;

import './UserProfile.css' ;
// import pencil from "../LoginMenu/pencilicon.png" ;


class UserProfile extends React.Component
{	
	state = {
	  	userprofile : {} 
	} ;



	render()
	{	
		//console.log(this.props.user) ;
		if(this.props.user)
		{
			return (
				<div className="propfileBox">
					<div className="heading">Profile</div>
					<div className="ptest">
						<div className="left">
							<div className = "left_corner_one">
							</div>
							<div className = "left_corner_two">
								<div className = "fdr" >
									<p className = "bold" >Created at : </p>
								</div>
	 							<Link className = "button" to="/history"> History </Link> 
	 							<button className = "button"  >Logout</button>
	 							<button className = "button del" >Delete profile</button>
							</div>
						</div>
						<div className="right">
							<div className = "right_corner_one">
								<div className = "flex">
									<p className = "bold" >Name</p>
									<p>{this.props.user.name}</p>							
								</div>
								<div className = "flex">
									<p className = "bold" >E-mail</p>
									<p>{this.props.user.email}</p>
								</div>
								<div className = "flex">
									<p className = "bold" >Mobile No.</p>
									<p>{this.props.user.mobile}</p>
								</div>
							</div>
							<div className = "right_corner_two">
								<button className = "button " >Change password</button>
								<button className = "button " >Edit profile</button>
								
							</div>
						</div>
					</div>
				</div>
			) ;
		}
		else
		{	
			return <Redirect to = '/login' />
		}	
		
	}
}

export default UserProfile ;


								// <img src = {pencil} alt="pencil" className= "ui" />
	// formatDate = (dt) => {
	// 	const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); ;
	// 	return dat ;
	// }
	
	// onLogoutClick = () => {
	// 	fetch('https://ov-api.herokuapp.com/logoutAll',{
	// 			method : 'post' ,
	// 			headers : { 'Content-Type' : 'application/json', 
	// 						'Authorization' : 'Bearer ' + this.props.usertoken} ,
	// 		})
	// 		.then(res => {
	// 			if(res.ok)
	// 				return res.json() ;
	// 			else
	// 				throw Error(res.statusText) ;
	// 		})
	// 		.then(data =>{	
	// 			console.log(data) ;
	// 			this.props.setUser({}) ;
	// 		}) 
	// 		.catch( err  => console.log(err) ) ;
	// }


	// onDeleteClick = () => {
	// 	fetch('https://ov-api.herokuapp.com/users/me',{
	// 			method : 'delete' ,
	// 			headers : { 'Content-Type' : 'application/json', 
	// 						'Authorization' : 'Bearer ' + this.props.usertoken} ,
	// 		})
	// 		.then(res => {
	// 			if(res.ok)
	// 				return res.json() ;
	// 			else
	// 				throw Error(res.statusText) ;
	// 		})
	// 		.then(data =>{	
	// 			console.log(data) ;
	// 			this.props.setUser({}) ;
	// 			this.props.history.push('/') ;
	// 		}) 
	// 		.catch( err  => console.log(err) ) ;
	// }
