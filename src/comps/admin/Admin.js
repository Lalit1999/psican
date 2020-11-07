import React from 'react' ;
import {Redirect} from'react-router-dom' ;

import Dropdown from '../signup/dropdown/Dropdown.js' ;
import ResultRecord from './ResultRecord.js' ;
import UserRecord from './UserRecord.js' ;
import SchoolRecord from './SchoolRecord.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

class Admin extends React.Component
{
	state = {
		users : [] ,
		schools : [] ,
		results : [] ,
		mode: 'users' ,
		searchText :''
	} ;

	componentDidMount = () => {
		fetch('https://psy-api.herokuapp.com/users',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + this.props.token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => {	
				this.setState({users: data});
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;

		fetch('https://psy-api.herokuapp.com/test',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + this.props.token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => {	
				this.setState({results: data});
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;

		fetch('https://psy-api.herokuapp.com/school',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + this.props.token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => {	
				this.setState({schools: data});
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}

	filterRecords = (user) => {
		return user.name.toLowerCase().includes(this.state.searchText.toLowerCase()) ;
	}

	createRecords = () => {
		if(this.state[this.state.mode].length > 0)
			switch(this.state.mode)
			{	case 'results' : return this.state.results.map((one, i)=><ResultRecord token={this.props.token} key={i} ki={i} data={one} /> ) ;
				case 'users' : return this.state.users.filter(this.filterRecords).map((one, i)=><UserRecord token={this.props.token} key={i} ki={i} data={one} /> ) ;
				case 'schools' : return this.state.schools.filter(this.filterRecords).map((one, i)=><SchoolRecord token={this.props.token} key={i} ki={i} data={one} /> ) ;
				default: return 'unexpected input' ;
			}
	}

	onSC = (event) => {
		this.setState({searchText : event.target.value}) ;
	}

	onInputChange = (event) => {
		this.setState( { [event.target.name] : event.target.value , searchText : '' } ) ;
	}

	render()
	{	if(this.props.user && this.props.user.name === 'admin')
		{	
			return(
				<div className = 'admin'>
					<div className = 'admin-bar'>
						<Dropdown label="Mode" name="mode" value={this.state.mode} options={['users','schools','results']} onChange={this.onInputChange}/>
						<p className = 'task' >Total Rows&nbsp;:&nbsp;{this.state[this.state.mode].length}</p>
						<Dropdown label="Search By" name="searchby" value={this.state.mode} options={['name','phone','email']} onChange={this.onInputChange}/>
						<input className = 'task' onChange = {this.onSC} value={this.state.searchText} type='text' placeholder='search' />
					</div>
					<div className="records-table">
						{this.createRecords()}
					</div>
				</div>
			) ;		
		}
		else
			return <Redirect to = '/' />		
	}
}

export default Admin ;
						
						// <Dropdown className = 'task' label="Sort By" name="sortby" value={this.state.mode} options={['date','alphabet','marks']} onChange={this.onInputChange}/>