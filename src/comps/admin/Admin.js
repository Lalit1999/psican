import React, {useState, useEffect, useContext} from 'react' ;
import Redirect from '../redirect/Redirect.js' ;

import ResultRecord from './ResultRecord.js' ;
import AdminPanel from './AdminPanel.js' ; 
import UserRecord from './UserRecord.js' ;
import {UserContext} from '../../context/UserContext.js' ;
import { addNotif } from '../notif.js' ;
import {usersData} from './data/users.js' ;
import {msg} from './data/message.js' ;
import {ustopData, letaData, accisData} from './data/results.js' ;
import './admin.css' ;

const Admin = () => {
	const [results, setResults] = useState({}) ;
	const [users, setUsers] = useState([]) ;
	const [messages, setMessages] = useState([]) ;
	const [appointments, setAppointments] = useState([]) ;
	const [coupons, setCoupons] = useState([]) ;
	const [mode, setMode] = useState('users') ;
	const {user, token} = useContext(UserContext) ;
	const [searchText, setSearchText] = useState('') ;

	useEffect(() => {
		fetch('https://api.psyment.com/users',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(users => setUsers(users) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	useEffect(() => {
		fetch('https://api.psyment.com/test',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(results => {
			let obj = {
				ustop : results.filter(one => one.test === 'ustop'),
				leta : results.filter(one => one.test === 'leta'),
				accis : results.filter(one => one.test === 'accis'),
			}
			console.log(results) ;
			setResults(obj) ;
		}) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	useEffect(() => {
		fetch('https://api.psyment.com/appoint',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(resp => setAppointments(resp) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	useEffect(() => {
		fetch('https://api.psyment.com/messages',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(resp => setMessages(resp) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	useEffect(() => {
		fetch('https://api.psyment.com/coupons',{
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json' ,
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(resp => setCoupons(resp) ) 
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}, [token]) ;

	const panelData = [
		{ 	name: "Dashboard", type: "dashboard", data: [] },
		{	name: "Users ", type: "table", data: users, ...usersData },
		{ 	name: "Results", type: "parent", children: [
				{ 	name: "USTOP", type: "table", data: results.ustop, ...ustopData },
				{ 	name: "ACCIS", type: "table", data: results.accis, ...accisData },
				{ 	name: "LETA", type: "table", data: results.leta, ...letaData },
			], 
		},
		{ 	name: "Messages", type: "table", data: messages, ...msg },
		{ 	name: "Appointments", type: "table", data: appointments/*, ...message*/ },
		{ 	name: "Coupon Management", type: "parent", children: [
				{ 	name: "Add Coupon", type: "form"/*, ...addProduct*/ },
				{ 	name: "Manage Coupon", type: "table", data: coupons/*, ...manageProduct*/ },
			], 
		},
	]

	if(user.email === 'admin@psyment.com')
		return(
			<div className="Admin">
				<AdminPanel panelData={panelData}/>				
			</div>
		) ;
	else
		return <Redirect to="/" /> ;		
}

export default Admin ;