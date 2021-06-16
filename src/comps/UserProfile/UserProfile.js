import React, {useState} from 'react' ;
import {Redirect} from'react-router-dom' ;

import { addNotif } from '.././notif.js' ;
import { invalidPass, isBlank } from '../valid.js' ;
import Title from '../title/Title.js' ;
import Data from '../data/Data.js' ;
import Register from '../signup/register/Register.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import Text from '../signup/text/Text.js' ;
import Pop from '../popup/Pop.js' ;
import ResultRecord from '../admin/ResultRecord.js' ;
import './UserProfile.css' ;

const returnKey = {
	name : "Name",
	age : "Age",
	gender : "Gender",
	height : "Height(inch)",
	weight : "Weight(kg)",
	address : "Address",
	address2 : "Permanent Address",
	father : "Father's Name",
	mother : "Mother's Name",
	working : "Working",
	hobbies : "Hobbies",
	siblings : "Siblings",
	email : "E-Mail",
	mobile : "Mobile No.",
}

const initData = {
	oldpass: '',
	newpass: '',
	repass: '',
} ;

const UserProfile = ({token, loadUser, user}) => {
	const [mode, setMode] = useState('normal') ;
	const [error, setError] = useState('') ;
	const [resData, setResData] = useState({}) ;
	const [data, setData] = useState(initData) ;	

	const formatDate = (dt) => {
		const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); ;
		return dat ;
	}

	const onLogoutClick = () => {
		fetch('https://psy-api.herokuapp.com/logoutAll' ,{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Successfully Logged Out', 'success') ;	
			loadUser({}) ;
		}) 
		.catch( err  => {
			addNotif('Error Logging Out', 'error') ;	
			console.log(err) ; 
		}) ;
	}

	const onEditClick = () => mode==='normal'?setMode('edit'):setMode('normal')  

	const onDeleteClick = () => {
		fetch('https://psy-api.herokuapp.com/users/me',{
				method : 'delete' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Successfully Deleted', 'success') ;
			loadUser({}) ;
		}) 
		.catch( err  => {
			addNotif('Error Deleting Profile', 'error') ;	
			console.log(err) ; 
		}) ;
	}
	
	const onChangeClick = () => {
		const {oldpass, newpass, repass} = data ;
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( isBlank(oldpass, 'Old Password') )
				setError(isBlank(oldpass, 'Old Password') ) ;
			else if ( invalidPass(newpass, repass) )
				setError(invalidPass(newpass, repass) ) ;
			else
			{	fetch('https://psy-api.herokuapp.com/users/me/change',{
						method : 'post' ,
						headers : { 'Content-Type' : 'application/json', 
									'Authorization' : 'Bearer ' + token} ,
						body: JSON.stringify({ oldpass, newpass})
				})
				.then(res => {
					if(res.ok)
					{
						setError('') ;
						setData(initData) ;
					}
					else
						throw Error(res.statusText) ;
				})
				.then(data =>{	
					addNotif('Successfully changed the password', 'success') ;
					loadUser({}) ;
				})
				.catch( err  => setError('Incorrect Old Password') ) ;
			}
		}
	}

	const onResultGetClick = () => {
		fetch('https://psy-api.herokuapp.com/result/me', {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer '+ token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then( data => setResData(data) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}

	const checkResult = () => {
		if(resData[0])
			return resData.map((one, i) => <ResultRecord key={i} data={one} lite="yes" date="no"/>) ;
		else 
			return <button className="sched-btn" onClick={onResultGetClick}> Get Results </button> ;
	}
	
	const generateData = () => {
		return Object.keys(user).map( (one,i) => {
			if(returnKey[one])
				return <Data key={i} kiy={returnKey[one]} mode={mode} value={user[one]} />
			else 
				return null ;
		}) ;
	}

	const checkMode = () => {
		if(mode === 'edit')
			return <Register init={user} mode="edit" token={token} loadUser={loadUser} edit={onEditClick}/>
		else
			return (
				<div className = "right_corner_onee">
					{generateData()}
					<Data kiy="Created at :" mode={mode} 
						 value={formatDate(user.createdAt)} />
				</div>
			) ;
	}

	const onInputChange = (event) => {
		setData({ ...data,	[event.target.name] : event.target.value}) ;
		setError('') ;
	}

	if(user.name)
	{
		return (
			<div>
				<Title name = 'Profile' items={["Home -", "profile"]}/>
				<div className="propfileBoxe">
					<div className="pteste">
						<div className="lefte">
							<div className="test-result-con">
								<h3> Test Results </h3>
								<div className="results-con">
									{checkResult()}
								</div> 
							</div>
							<Pop btn="Change Password" classes="buttone ">
								<LoginForm title=" Basic Details " error={error} near="near"
									b2="Change" onb2Click={onChangeClick} >
									<Text label="Old Password" name="oldpass" type="pw" value={data.oldpass} onChange={onInputChange}/>
									<Text label="New Password" name="newpass" type="pw" value={data.newpass} onChange={onInputChange}/>
									<Text label="Retype Password" name="repass" type="pw" value={data.repass} onChange={onInputChange}/>
								</LoginForm>
							</Pop>								
 							<button className = "buttone" onClick={onLogoutClick} >Logout</button>
							<button className = "buttone " onClick = {onEditClick}>
								{(mode==='edit'?'Go Back':'Edit profile')}
							</button>
 							<button className = "buttone dele" onClick={onDeleteClick}>Delete profile</button>
						</div>
						<div className="righte">
							{checkMode()}
						</div>
					</div>
				</div>
			</div>
		) ;
	}
	else
		return <Redirect to = '/login' />
}

export default UserProfile ;