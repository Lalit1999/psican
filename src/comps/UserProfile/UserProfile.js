import React from 'react' ;
import {Link} from'react-router-dom' ;
import {Redirect} from'react-router-dom' ;
import Title from '../title/Title.js' ;

import './UserProfile.css' ;
// import pencil from '../images/pencilicon.png' ;


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
		const type = (this.props.user.status?'logoutAll':'slogoutAll') ;
		fetch('https://psy-api.herokuapp.com/' + type ,{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.token} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				console.log(data) ;
				this.props.loadUser({}) ;
			}) 
			.catch( err  => console.log(err) ) ;
	}

	onDeleteClick = () => {
		const type = (this.props.user.status?'users':'school') ;
		fetch('https://psy-api.herokuapp.com/'+ type +'/me',{
				method : 'delete' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.token} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				console.log(data) ;
				this.props.loadUser({}) ;
			}) 
			.catch( err  => console.log(err) ) ;
	}
	

	render()
	{	console.log(this.props.user) ;
		if(this.props.user.name)
		{
			if(this.props.user.status)
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
				return (
					<div>
						<Title name = 'Profile' items={["Home -", "profile"]}/>
						<div className="propfileBoxe">
							<div className="pteste">
								<div className="lefte">
									<div className = "left_corner_twoe">
										<button className = "buttone " >Edit profile</button>								
										<button className = "buttone " >Change password</button>
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
											<p className = "bolde" >Medium</p>
											<p>{this.props.user.medium}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >E-mail</p>
											<p>{this.props.user.email}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Classes from</p>
											<p>{this.props.user.class_f}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Classes till</p>
											<p>{this.props.user.class_t}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde max_width" >Address</p>
											<p>{this.props.user.address}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Registrant Name</p>
											<p>{this.props.user.person}</p>
										</div>
										<div className = "flexe">
											<p className = "bolde" >Registrant Mobile No.</p>
											<p>{this.props.user.p_phone}</p>
										</div>
										<div className = "flexe">
											<p className = "bolde" >Principal's Name</p>
											<p>{this.props.user.principal}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Principal's phone no.</p>
											<p>{this.props.user.pr_phone}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Total students</p>
											<p>{this.props.user.students}</p>							
										</div>
										<div className = "flexe">
											<p className = "bolde" >Total teachers</p>
											<p>{this.props.user.teachers}</p>							
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
