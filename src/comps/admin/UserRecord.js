import React from 'react' ;

import ResultRecord from './ResultRecord.js' ;
import { addNotif } from '../notif.js' ;
import './admin.css' ;

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
		// console.log(this.props) ;
		const { _id } = this.props.data ;
		if(this.state.result === 'open')
			this.setState({result: 'close'});
		else
		{	if(this.state.resData[0])
				this.setState({result: 'open'})
			else
			{	const str = 'Bearer ' + this.props.token ;
				// console.log(str) ;
				fetch('http://api.psyment.com/result/'+_id, {
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

	checkLite = () => {
		if(this.props.lite === 'yes')
			return null ;
		else
			return (
			<React.Fragment>
				<p className="record-btn slim" onClick={() => this.setState({more: (this.state.more==='close'?'open':'close')})}> {this.state.more==='close'?'More':'Less'} </p>
				<p className="record-btn" onClick={this.onResultClick}> {this.state.result==='close'?'Show':'Hide'} Results </p>
			</React.Fragment>
			) ;
	}

	render() {
		const {ki, data} = this.props ;
		return (
			<React.Fragment>
				<div key={ki} className={"record user " + this.props.lite}> 
					{this.props.lite==='yes'?null:<p className="slim">{ki+ 1}</p>}
					<p>{data.name}</p>
					<p className="fat">{data.email}</p>
					<p>{data.mobile}</p>
					{this.checkLite()}
				</div>
				<div> {this.checkMore()} </div>
				<div> {this.checkResult()} </div>
			</React.Fragment>
		) ;	
	}
}


export default UserRecord ;