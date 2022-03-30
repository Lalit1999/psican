import React, {useState} from 'react' ;

import UserRecord from './UserRecord.js' ;
import { addNotif } from '../notif.js' ;

import './admin.css' ;

const ResultRecord = ({data, token, lite, date, ki}) => {	
	const [owner, setOwner] = useState('close');
	const [ownData, setOwnData] = useState({}) ;

	const formatDate = (dt) => {
		const dat = new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); 
		return dat ;
	}

	const onOwnerClick = () => {
		const { owner } = data ;
		if(owner === 'open')
			setOwner('close') ;
		else
		{	if(ownData.name)
				setOwner('open') ;
			else
			{	const str = 'Bearer ' + token ;
				
				fetch('http://api.psyment.com/user/'+owner, {
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
					setOwnData(data) ;
					setOwner('open');
				}) 
				.catch( err  => {
					console.log(err) ; 
					addNotif(err.message, 'error') ;
				}) ;
			}
		}
	}

	const checkOwner = () => {
		if(owner === 'open')
			return (
				<React.Fragment> <UserRecord data={ownData} lite="yes"/> </React.Fragment>
			) ;
	} 

	const checkLite = (num) => {	
		if(!lite)
			return (
				<React.Fragment>
					<p className="slim">{num + 1}</p>
					<p className="record-btn" onClick={onOwnerClick}>{owner ==='close'?'Show':'Hide'} Owner </p>
				</React.Fragment>
			) ;		
	}

	const checkDate = (data) => {
		if(date !== 'no')
			return <p className="fat">{formatDate(data.createdAt)}</p> ;
	}
	
	return (
		<React.Fragment>
			<div className={"record result " + lite}> 
				{checkLite(ki)}
				<p className="slim">{data.test}</p>
				<p>{data.result.t}</p>
				{checkDate(data)}
			</div>
			<div> {checkOwner()} </div>
		</React.Fragment>
	) ;
} 

export default ResultRecord ;