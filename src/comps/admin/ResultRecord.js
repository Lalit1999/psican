import React from 'react' ;

import UserRecord from './UserRecord.js' ;
import { addNotif } from '../notif.js' ;

import './admin.css' ;


class ResultRecord extends React.Component
{	
	state = {
		owner: 'close',
		ownData : {} ,
	}

	formatDate = (dt) => {
		const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); ;
		return dat ;
	}

	onOwnerClick = () => {
		const { owner } = this.props.data ;
		if(this.state.owner === 'open')
			this.setState({owner: 'close'});
		else
		{	if(this.state.ownData.name)
				this.setState({owner: 'open'})
			else
			{	const str = 'Bearer ' + this.props.token ;
				// console.log(str) ;
				fetch('https://psy-api.herokuapp.com/user/'+owner, {
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
					this.setState({ownData: data, owner: 'open'});
				}) 
				.catch( err  => {
					console.log(err) ; 
					addNotif(err.message, 'error') ;
				}) ;
			}
		}
	}

	checkOwner = () => {
		if(this.state.owner === 'open')
			return (
				<React.Fragment> <UserRecord data={this.state.ownData} lite="yes"/> </React.Fragment>
			) ;
		else
			return null ;
	} 

	checkLite = (num) => {	
		if(this.props.lite)
			return null ;
		else
			return (
			<React.Fragment>
				<p className="slim">{num + 1}</p>
				<p className="record-btn" onClick={this.onOwnerClick}>{this.state.owner ==='close'?'Show':'Hide'} Owner </p>
			</React.Fragment>
			) ;		
	}
	
	render()
	{	const {ki, data} = this.props ;
		return (
			<React.Fragment>
				<div className={"record result " + this.props.lite}> 
					{this.checkLite(ki)}
					<p className="slim">{data.test}</p>
					<p>{data.result.t}</p>
					<p className="fat">{this.formatDate(data.createdAt)}</p>
				</div>
				<div> {this.checkOwner()} </div>
			</React.Fragment>
		) ;
	}		
} 

export default ResultRecord ;