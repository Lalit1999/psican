import React from 'react' ;
import {Redirect} from'react-router-dom' ;

import { addNotif } from '.././notif.js' ;
import { invalidPass, isBlank } from '../valid.js' ;
import Title from '../title/Title.js' ;
import Data from '../data/Data.js' ;
import Register from '../signup/register/Register.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import Pop from '../popup/Pop.js' ;
import './UserProfile.css' ;

class UserProfile extends React.Component
{	
	state = {
	  	mode : 'normal' ,
	  	oldpass: '' ,
	  	newpass: '' ,
	  	repass: '' ,
	  	error: '' 
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
			addNotif('Successfully Logged Out', 'success') ;	
			this.props.loadUser({}) ;
		}) 
		.catch( err  => {
			addNotif('Error Logging Out', 'error') ;	
			console.log(err) ; 
		}) ;
	}

	onEditClick = () => {
		(this.state.mode==='normal'?this.setState({mode:'edit'}):this.setState({mode:'normal'}) ); 
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
			addNotif('Successfully Deleted', 'success') ;
			this.props.loadUser({}) ;
		}) 
		.catch( err  => {
			addNotif('Error Deleting Profile', 'error') ;	
			console.log(err) ; 
		}) ;
	}
	
	onChangeClick = () => {
		const type = (this.props.user.status?'users':'school') ;
		if(this.state.error !== '')
			this.setState({error: 'You must fix all errors before proceeding'});
		else
		{
			if( isBlank(this.state.oldpass, 'Old Password') )
				this.setState( {error: isBlank(this.state.oldpass, 'Old Password')} )
			else if ( invalidPass(this.state.newpass, this.state.repass) )
				this.setState( {error: invalidPass(this.state.newpass, this.state.repass)} )
			else
			{	fetch('https://psy-api.herokuapp.com/' + type + '/me/change',{
						method : 'post' ,
						headers : { 'Content-Type' : 'application/json', 
									'Authorization' : 'Bearer ' + this.props.token} ,
						body: JSON.stringify({oldpass: this.state.oldpass, newpass: this.state.newpass})
				})
				.then(res => {
					if(res.ok)
						this.setState({error: '', oldpass: '', newpass: '', repass:''}) ;
					else
						throw Error(res.statusText) ;
				})
				.then(data =>{	
					addNotif('Successfully changed the password', 'success') ;
					this.props.loadUser({}) ;
				})
				.catch( err  => this.setState({error: 'Incorrect Old Password'})) ;
			}
		}
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
			case "siblings" : ret = "Siblings" ; break ;
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
		return Object.keys(this.props.user).map( (one,i) => {
			const name = this.returnkey(one) ;
			if(name)
				return <Data key={i} kiy={name} 
						mode={this.state.mode} value={this.props.user[one]} />
			else 
				return null ;
		}) ;
	}

	checkMode = () => {
		if(this.state.mode === 'edit')
			return <Register init={this.props.user} mode="edit" token={this.props.token} loadUser={this.props.loadUser} edit={this.onEditClick}/>
		else
			return (
				<div className = "right_corner_onee">
					{this.generateData()}
					<Data kiy="Created at :" mode={this.state.mode} 
						 value={this.formatDate(this.props.user.createdAt)} />
				</div>
			) ;
	}

	onInputChange = (event) => {
		this.setState({	[event.target.name] : event.target.value, error: ''} ) ;
	}

	render()
	{	const {oldpass, repass, newpass} = this.state ;
		if(this.props.user.name)
		{
			return (
				<div>
					<Title name = 'Profile' items={["Home -", "profile"]}/>
					<div className="propfileBoxe">
						<div className="pteste">
							<div className="lefte">
								<Pop btn="Change Password" classes="buttone ">
									<LoginForm title=" Basic Details " error={this.state.error} near="near"
										b2="Change" onb2Click={this.onChangeClick} >
										<Text label="Old Password" name="oldpass" type="pw" value={oldpass} onChange={this.onInputChange}/>
										<Text label="New Password" name="newpass" type="pw" value={newpass} onChange={this.onInputChange}/>
										<Text label="Retype Password" name="repass" type="pw" value={repass} onChange={this.onInputChange}/>
									</LoginForm>
								</Pop>								
	 							<button className = "buttone" onClick={this.onLogoutClick} >Logout</button>
								<button className = "buttone " onClick = {this.onEditClick}>
									{(this.state.mode==='edit'?'Go Back':'Edit profile')}
								</button>
	 							<button className = "buttone dele" onClick={this.onDeleteClick} >Delete profile</button>
							</div>
							<div className="righte">
								{this.checkMode()}
							</div>
						</div>
					</div>
				</div>
			) ;
		}
		else
			return <Redirect to = '/login' />
	}
}

export default UserProfile ;