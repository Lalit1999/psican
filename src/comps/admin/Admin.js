import React, {useState, useEffect, useContext} from 'react' ;
import Redirect from '../redirect/Redirect.js' ;

import Dropdown from '../signup/dropdown/Dropdown.js' ;
import ResultRecord from './ResultRecord.js' ;
import UserRecord from './UserRecord.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

const Admin = () => {
	const [results, setResults] = useState([]) ;
	const [users, setUsers] = useState([]) ;
	const [mode, setMode] = useState('users') ;
	const {user, token} = useContext(UserContext) ;
	const [searchText, setSearchText] = useState('') ;

	useEffect(() => {
		fetch('https://psy-api.herokuapp.com/users',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(users => setUsers(users) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	useEffect(() => {
		fetch('https://psy-api.herokuapp.com/test',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(results => setResults(results) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	const filterRecords = (user) => user.name.toLowerCase().includes(searchText.toLowerCase()) 

	const createRecords = () => {
		if(mode === 'results')
			return results.map((one, i)=><ResultRecord token={token} key={i} ki={i} data={one} /> ) ;
		else if(mode === 'users')
			return users.filter(filterRecords).map((one, i)=><UserRecord token={token} key={i} ki={i} data={one} /> ) ;
		else return null ;
	}

	const onSC = (event) => setSearchText(event.target.value) 

	const onInputChange = (event) => {
		setMode(event.target.value) ;
		setSearchText('') ;
	}

	if(user && user.name === 'admin')
	{	
		return(
			<div className = 'admin'>
				<div className = 'admin-bar'>
					<Dropdown label="Mode" name="mode" value={mode} options={['users','results']} onChange={onInputChange}/>
					{/*<Dropdown label="Search By" name="searchby" value={mode} options={['name','phone','email']} onChange={onInputChange}/>*/}
					<input className = 'task' onChange={onSC} value={searchText} type='text' placeholder='search' />
				</div>
				<div className="records-table">
					{createRecords()}
				</div>
			</div>
		) ;		
	}
	else
		return <Redirect to = '/' />		
}

export default Admin ;