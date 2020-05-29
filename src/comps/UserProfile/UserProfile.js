import React from 'react' ;
import {Link} from'react-router-dom' ;
import {Redirect} from'react-router-dom' ;
import Title from '../title/Title.js' ;

import './UserProfile.css' ;
import pencil from "../images/pencilicon.png" ;


class UserProfile extends React.Component
{	
	state = {
	  	userprofile : {} 
	} ;


	formatDate = (dt) => {
		const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); ;
		return dat ;
	}

	onLogoutClick = () => {
		fetch('https://psy-api.herokuapp.com/logoutAll',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.usertoken} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				console.log(data) ;
				this.props.setUser({}) ;
			}) 
			.catch( err  => console.log(err) ) ;
	}

	onDeleteClick = () => {
		fetch('https://psy-api.herokuapp.com/users/me',{
				method : 'delete' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.usertoken} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				console.log(data) ;
				this.props.setUser({}) ;
				this.props.history.push('/') ;
			}) 
			.catch( err  => console.log(err) ) ;
	}
	

	render()
	{	
		// console.log(this.props.user) ;
		if(this.props.user)
		{
			return (
				<div>
					<Title name = 'Profile' items={["Home -", "profile"]}/>
					<div className="propfileBoxe">
						<div className="pteste">
							<div className="lefte">
								<div className = "left_corner_twoe">
									<button className = "buttone " >Edit profile</button>								
									<button className = "buttone " >Change password</button>
		 							<Link className = "buttone" to="/history"> History </Link> 
		 							<button className = "buttone" onClick={this.onLogoutClick} >Logout</button>
		 							<button className = "buttone dele" onClick={this.onDeleteClick} >Delete profile</button>
								</div>
							</div>
							<div className="righte">
								<div className = "right_corner_onee">
									<div className = "flexe">
										<p className = "bolde" >Name</p>
										<p>{this.props.user.name}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Age</p>
										<p>{this.props.user.age}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Gender</p>
										<p>{this.props.user.gender}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Height(cm)</p>
										<p>{this.props.user.height}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Weight(kg)</p>
										<p>{this.props.user.weight}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde max_width" >Address</p>
										<p>{this.props.user.address2}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Father's Name</p>
										<p>{this.props.user.father}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Mother's Name</p>
										<p>{this.props.user.mother}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Working</p>
										<p>{this.props.user.working}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >Hobbies</p>
										<p>{this.props.user.hobbies}</p>							
									</div>
									<div className = "flexe">
										<p className = "bolde" >E-mail</p>
										<p>{this.props.user.email}</p>
									</div>
									<div className = "flexe">
										<p className = "bolde" >Mobile No.</p>
										<p>{this.props.user.mobile}</p>
									</div>
									<div className = "fdre" >
										<p className = "bolde" >Created at : </p>
			 							<p>{this.formatDate(this.props.user.createdAt)}</p>
									</div>
								</div>
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


	


								// <div className = "left_corner_onee">
								// 	<img src = {pencil} alt="pencil" className= "uie" />
								// </div>
