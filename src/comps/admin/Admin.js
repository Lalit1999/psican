import React, {useState, useEffect} from 'react' ;
import {Redirect} from'react-router-dom' ;

import Dropdown from '../signup/dropdown/Dropdown.js' ;
import ResultRecord from './ResultRecord.js' ;
import UserRecord from './UserRecord.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

const Admin = ({token, user}) => {
	const [data, setData] = useState({results: [], users: []}) ;
	const [mode, setMode] = useState('users') ;
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
		.then(users => setData({...data, users}) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;

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
		.then(results => setData({...data, results}) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;

	}, [data, token]) ;

	const filterRecords = (user) => user.name.toLowerCase().includes(searchText.toLowerCase()) 

	const createRecords = () => {
		if(data[mode].length > 0)
			switch(mode)
			{	case 'results' : return data.results.map((one, i)=><ResultRecord token={token} key={i} ki={i} data={one} /> ) ;
				case 'users' : return data.users.filter(filterRecords).map((one, i)=><UserRecord token={token} key={i} ki={i} data={one} /> ) ;
				default: return 'unexpected input' ;
			}
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
					<p className = 'task' >Total Rows&nbsp;:&nbsp;{data[mode].length}</p>
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