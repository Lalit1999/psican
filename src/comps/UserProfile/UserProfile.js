import React from 'react' ;
import {Redirect} from'react-router-dom' ;

import Title from '../title/Title.js' ;
import Data from '../data/Data.js' ;
import EditProfile from './editProfile/EditProfile.js' ;

import './UserProfile.css' ;


class UserProfile extends React.Component
{	
	state = {
	  	mode : 'normal' ,
	  	check : ''
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
		if(this.props.user.status)
		{
			return(<EditProfile num = '0' />) ;
		}
		else
		{
			return(<EditProfile num = '1' />) ;
		}
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
	
	returnkey = (str) => {
		let ret = '' ;
		switch(str)
		{	
			case "name" : ret = "Name" ; break ;
			case "age"  : ret = "Age" ; break ;
			case "gender" : ret = "Gender" ; break ;
			case "height" : ret = "Height(cm)" ; break ;
			case "weight" : ret = "Weight(kg)" ; break ;
			case "address" : ret = "Address" ; break ;
			case "address2" : ret = "Permanent Address" ; break ;
			case "father" : ret = "Father's Name" ; break ;
			case "mother" : ret = "Mother's Name" ; break ;
			case "working" : ret = "Working" ; break ;
			case "hobbies" : ret = "Hobbies" ; break ;
			case "email" : ret = "E-Mail" ; break ;
			case "mobile" : ret = "Mobile No." ; break ;
			case "medium" : ret = "Medium" ; break ;
			case "class_f" : ret = "Classes From" ; break ;
			case "class_t" : ret = "Classes Till" ; break ; 
			case "principal" : ret = "Principal Name" ; break ;
			case "pr_phone" : ret = "Principal's Phone No." ; break ;
			case "person" : ret = "Registrant Name" ; break ; 
			case "p_phone" : ret = "Registrant Phone No." ; break ;
			case "students" : ret = "Total No. of Students" ; break ;
			case "teachers" : ret = "Total No. of teachers" ; break ;
			default : return false ;
		}
		return ret ;
	}

	generateData = () => {
		console.log( Object.keys(this.props.user) ) ;
		return Object.keys(this.props.user).map( (one,i) => {
			const name = this.returnkey(one) ;
			if(name)
				return <Data key={i} kiy={name} 
						mode={this.state.mode} value={this.props.user[one]} />
			else 
				return null ;
		}) ;
	}

	render()
	{	//console.log(this.props.user) ;
		if(this.props.user.name)
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
									{this.generateData()}
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