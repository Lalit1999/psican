import React from 'react' ;
import {Redirect} from'react-router-dom' ;

import Dropdown from '../signup/dropdown/Dropdown.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

const ResultRecord = (props) => {
	const {i, data} = props ;
	return (
		<div key={i}> 
			<span>{data.owner}</span>
			<span>{data.test}</span>
			<span>{data.result.t}</span>
		</div>
	) ;		
}

const UserRecord = (props) => {
	const {i, data} = props ;
	return (
			<div key={i}> 
				<span>{data._id}</span>
				<span>{data.name}</span>
				<span>{data.email}</span>
				<span>{data.mobile}</span>
			</div>
		) ;	
}

class Admin extends React.Component
{
	state = {
		users : [] ,
		schools : [] ,
		results : [] ,
		mode: 'users'
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

	createRecords = () => {
		if(this.state[this.state.mode].length > 0)
			switch(this.state.mode)
			{	case 'results' : return this.state.results.map((one, i)=><ResultRecord key={i} data={one} /> ) ;
				case 'users' : return this.state.users.map((one, i)=><UserRecord key={i} data={one} /> ) ;
			}
	}

	onInputChange = (event) => {
		this.setState( { [event.target.name] : event.target.value } ) ;
	}

	render()
	{	if(this.props.user && this.props.user.name === 'admin')
		{	
			return(
				<div className = 'admin'>
					<div className = 'admin-bar'>
						<Dropdown label="Mode" name="mode" value={this.state.mode} options={['users','schools','results']} onChange={this.onInputChange}/>
						<p>Total no. of users</p>
						<input type='text' placeholder='search' />
					</div>
					<div>
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