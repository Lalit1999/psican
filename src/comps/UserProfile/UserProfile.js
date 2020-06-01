import React from 'react' ;
// import {Link} from'react-router-dom' ;
import {Redirect} from'react-router-dom' ;
import Title from '../title/Title.js' ;
import Data from '../data/Data.js' ;
// import Text from '../signup/text/Text.js' ;
// import EditProfile from './editProfile/EditProfile.js' ;

import './UserProfile.css' ;
// import pencil from '../images/pencilicon.png' ;


class UserProfile extends React.Component
{	
	state = {
	  	mode : 'normal'
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

	onEditClick = () => {
		this.setState({mode:'edit'}) ;
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
	{	//console.log(this.props.user) ;
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
										<button className = "buttone " onClick = {this.onEditClick} >Edit profile</button>								
										<button className = "buttone " >Change password</button>
			 							<button className = "buttone" onClick={this.onLogoutClick} >Logout</button>
			 							<button className = "buttone dele" onClick={this.onDeleteClick} >Delete profile</button>
									</div>
								</div>
								<div className="righte">
									<div className = "right_corner_onee">
										<Data kiy = "Name" mode = {this.state.mode} value = {this.props.user.name}/>
										<Data kiy = "Age" mode = {this.state.mode} value = {this.props.user.age}/>
										<Data kiy = "Gender" mode = {this.state.mode} value = {this.props.user.gender}/>
										<Data kiy = "Height(cm)" mode = {this.state.mode} value = {this.props.user.height}/>
										<Data kiy = "Weight(kg)" mode = {this.state.mode} value = {this.props.user.weight}/>
										<Data kiy = "Address" mode = {this.state.mode} value = {this.props.user.address2}/>
										<Data kiy = "Father's Name" mode = {this.state.mode} value = {this.props.user.father}/>
										<Data kiy = "Mother's Name" mode = {this.state.mode} value = {this.props.user.mother}/>
										<Data kiy = "Working" mode = {this.state.mode} value = {this.props.user.working}/>
										<Data kiy = "Hobbies" mode = {this.state.mode} value = {this.props.user.hobbies}/>
										<Data kiy = "E-Mail" mode = {this.state.mode} value = {this.props.user.email}/>
										<Data kiy = "Mobile No." mode = {this.state.mode} value = {this.props.user.mobile}/>
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
										<Data kiy = "Name" value = {this.props.user.name}/>
										<Data kiy = "Medium" value = {this.props.user.medium}/>
										<Data kiy = "Address" value = {this.props.user.address}/>
										<Data kiy = "E-Mail" value = {this.props.user.email}/>
										<Data kiy = "Classes From" value = {this.props.user.class_f}/>
										<Data kiy = "Classes Till" value = {this.props.user.class_t}/>
										<Data kiy = "Principal Name" value = {this.props.user.principal}/>
										<Data kiy = "Principal's Phone No." value = {this.props.user.pr_phone}/>
										<Data kiy = "Registrant Name" value = {this.props.user.person}/>
										<Data kiy = "Registrant Phone No." value = {this.props.user.p_phone}/>
										<Data kiy = "Total No. of Students" value = {this.props.user.students}/>
										<Data kiy = "Total No. of teachers" value = {this.props.user.teachers}/>
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
										// <EditProfile kiy = "Name" value = {this.props.user.name}/>
										// <EditProfile kiy = "Age" value = {this.props.user.age}/>
										// <EditProfile kiy = "Gender" value = {this.props.user.gender}/>
										// <EditProfile kiy = "Height(cm)" value = {this.props.user.height}/>
										// <EditProfile kiy = "Weight(kg)" value = {this.props.user.weight}/>
										// <EditProfile kiy = "Address" value = {this.props.user.address2}/>
										// <EditProfile kiy = "Father's Name" value = {this.props.user.father}/>
										// <EditProfile kiy = "Mother's Name" value = {this.props.user.mother}/>
										// <EditProfile kiy = "Working" value = {this.props.user.working}/>
										// <EditProfile kiy = "Hobbies" value = {this.props.user.hobbies}/>
										// <EditProfile kiy = "E-Mail" value = {this.props.user.email}/>
										// <EditProfile kiy = "Mobile No." value = {this.props.user.mobile}/>										
										//line no.80<Link className = "buttone " to = "/editprofile" >Edit profile</Link>
