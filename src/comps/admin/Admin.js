import React, {useState, useEffect, useContext} from 'react' ;
import Redirect from '../redirect/Redirect.js' ;

import AdminPanel from './AdminPanel.js' ; 
import {UserContext} from '../../context/UserContext.js' ;
import { addNotif } from '../notif.js' ;
import {usersData} from './data/users.js' ;
import {msg} from './data/message.js' ;
import {ustopData, letaData, accisData} from './data/results.js' ;
import {confirmedAppoint, appointRequest} from './data/appointments.js' ;
import './admin.css' ;

const addSno = (obj, num) => {
	return {...obj, sno: num+1}
}

const filterAppoints = (data, str) => {
	return data.filter(one => one.choice === str)
}

const Admin = () => {
	const [results, setResults] = useState({}) ;
	const [users, setUsers] = useState([]) ;
	const [messages, setMessages] = useState([]) ;
	const [appointments, setAppointments] = useState([]) ;
	const [coupons, setCoupons] = useState([]) ;
	const {user, token} = useContext(UserContext) ;

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
		.then(users => setUsers(users.map(addSno)) ) 
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
				ustop : results.filter(one => one.test === 'ustop').map(addSno),
				leta : results.filter(one => one.test === 'leta').map(addSno),
				accis : results.filter(one => one.test === 'accis').map(addSno),
			}
			// console.log() ;
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
		.then(resp => setAppointments(resp.map(addSno)) ) 
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
		.then(resp => setMessages(resp.map(addSno)) ) 
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
		.then(resp => setCoupons(resp.map(addSno)) ) 
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
		{ 	name: "Appointments", type: "parent", children: [
				{ 	name: "Confirmed", type: "table", data: filterAppoints(appointments, 'withAdvance'), ...confirmedAppoint },
				{ 	name: "Requests", type: "table", data: filterAppoints(appointments, 'noAdvance'), ...appointRequest },
			], 
		},
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