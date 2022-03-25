import {useState, useEffect, useContext} from 'react' ;

import Button from 'react-bootstrap/Button';
import Redirect from '../redirect/Redirect.js' ;
import { addNotif } from '.././notif.js' ;
import Title from '../title/Title.js' ;
import ResultRecord from '../admin/ResultRecord.js' ;
import ChangePassForm from './ChangePassForm.js' ;
import EditForm from './EditForm.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import './UserProfile.css' ;

const returnKey = {
	name : "Name",
	age : "Age",
	gender : "Gender",
	email : "E-Mail",
	mobile : "Mobile No.",
}

const Data = ({name, value}) => {
	return(
		<div className="data-flex"> 
			<p className="data-bold">{name}</p>
			<p className="data-right">{value}</p>
		</div>
	) ;
}

const UserProfile = () => {
	const {user, token, loadUser} = useContext(UserContext) ;
	const [mode, setMode] = useState('normal') ;
	const [resData, setResData] = useState({}) ;

	useEffect( () => {
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
	}, [token]) ;

	const formatDate = (dt) => {
		const dat = new Date(dt).toLocaleString("en-GB", {timeZone: "Asia/Kolkata"}); ;
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

	const returnResult = () => {
		if(resData.length > 0)
			return resData.map((one, i) => <ResultRecord key={i} data={one} lite="yes"/>) ;
		else 
			return <p className="result-loading"> Loading... </p> ;
	}
	
	const generateData = () => {
		return Object.keys(user).map( (one,i) => {
			if(returnKey[one])
				return <Data key={i} name={returnKey[one]} value={user[one]} />
			else 
				return null ;
		}) ;
	}

	const checkMode = () => {
		if(mode === 'edit')
			return <EditForm />
		else if(mode === 'change')
			return <ChangePassForm /> ;
		else if(mode === 'delete')
			return (
				<div className="delete-profile"> 
					<h4 className="dp-heading"> Are you Sure? </h4> 
					<p className="dp-description"> All data associated with your account, including your marks would be deleted. Are your sure you want to proceed?</p>
					<div className="user-profile-btns">
					    <Button variant="danger" onClick={onDeleteClick}>I&apos;m Sure</Button>
						<Button variant="success" onClick={()=>setMode('normal')}>Cancel</Button>
					</div>
				</div> 
			) ;
		else
			return (
				<div className="data-con">
					{generateData()}
					<Data name="Created at" value={formatDate(user.createdAt)} />
				</div>
			) ;
	}

	if(user.name)
		return (
			<div className="user-profile-page">
				<Title name = 'Profile' items={["Home", "profile"]}/>
				<div className="user-profile">
					<div className="up-top">
						<button className="sched-btn" onClick={()=>setMode('normal')}>My Profile</button>
						<button className="sched-btn" onClick={()=>setMode('change')}>Change Password</button>
						<button className="sched-btn" onClick={onLogoutClick}>Logout</button>
						<button className="sched-btn" onClick={()=>setMode('edit')}>Edit profile</button>
						<button className="sched-btn del" onClick={()=>setMode('delete')}>Delete profile</button>
					</div>
					<div className="up-bottom">
						<div className="up-left">
							<div className="test-result-con">
								<h3> Test Results </h3>
								<div className="results-con">
									{returnResult()}
								</div> 
							</div>
						</div>
						<div className="up-right">
							{checkMode()}
						</div>
					</div>
				</div>
			</div>
		) ;
	else
		return <Redirect to = '/login' />
}

export default UserProfile ;