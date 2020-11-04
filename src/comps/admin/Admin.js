import React from 'react' ;
import {Redirect} from'react-router-dom' ;

import Dropdown from '../signup/dropdown/Dropdown.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

const formatDate = (dt) => {
	const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); ;
	return dat ;
}

class ResultRecord extends React.Component
{	state = {

	}

	checkLite = (num) => {	
		if(this.props.lite)
			return null ;
		else
			return (
			<React.Fragment>
				<p>{num + 1}</p>
				<p className="record-btn"> Show Owner </p>
			</React.Fragment>
			) ;		
	}
	
	render()
	{	const {ki, data} = this.props ;
		return (
			<div className="record result"> 
				{this.checkLite(ki)}
				<p>{data.test}</p>
				<p>{data.result.t}</p>
				<p>{formatDate(data.createdAt)}</p>
			</div>
		) ;
	}		
}

class UserRecord extends React.Component 
{ 	
	state = {
		more: 'close',
		result: 'close',
		resData: {}
	}

	checkMore = () => {
		if(this.state.more === 'open')
			return <div>This is check more </div> ;
		else
			return null ;
	} 

	onResultClick = () => {
		console.log(this.props) ;
		const { _id } = this.props.data ;
		if(this.state.result === 'open')
			this.setState({result: 'close'});
		else
		{	if(this.state.resData[0])
				this.setState({result: 'open'})
			else
			{	const str = 'Bearer ' + this.props.token ;
				console.log(str) ;
				fetch('https://psy-api.herokuapp.com/result/'+_id, {
					method : 'get' ,
					headers : { 'Content-Type' : 'application/json' ,
								'Authorization' : str} ,
				})
				.then(res => {
					if(res.ok)
						return res.json() ;
					else
						throw Error(res.statusText) ;
				})
				.then(data => {
					console.log(data) ;	
					this.setState({resData: data, result: 'open'});
				}) 
				.catch( err  => {
					console.log(err) ; 
					addNotif(err.message, 'error') ;
				}) ;
			}
		}
	}

	checkResult = () => {
		if(this.state.result === 'open')
			return this.state.resData.map((one, i) => <ResultRecord key={i} data={one} lite="yes"/>) ;
		else
			return null ;
	} 

	render() {
		const {ki, data} = this.props ;
		return (
			<React.Fragment>
				<div key={ki} className="record user"> 
					<p>{ki+ 1}</p>
					<p>{data.name}</p>
					<p>{data.email}</p>
					<p>{data.mobile}</p>
					<p className="record-btn" onClick={() => this.setState({more: (this.state.more==='close'?'open':'close')})}> {this.state.more==='close'?'More':'Less'} </p>
					<p className="record-btn" onClick={this.onResultClick}> {this.state.result==='close'?'Show':'Hide'} Results </p>
				</div>
				<div> {this.checkMore()} </div>
				<div> {this.checkResult()} </div>
			</React.Fragment>
		) ;	
	}
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
			{	case 'results' : return this.state.results.map((one, i)=><ResultRecord token={this.props.token} key={i} ki={i} data={one} /> ) ;
				case 'users' : return this.state.users.map((one, i)=><UserRecord token={this.props.token} key={i} ki={i} data={one} /> ) ;
				default: return 'unexpected input' ;
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
						<p>Total no. of users &nbsp;:&nbsp;{this.state[this.state.mode].length}</p>
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