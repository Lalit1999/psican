import {formatDate} from './format.js' ;

const userColumns = [
	{ name: 'name'}, { name: 'email'}, { name: 'mobile'}, { name: 'createdAt', format: formatDate},  
] ;

const userDisplay = [
	{ name: 'name', title: 'Name'}, { name: 'email', title: 'E-Mail'}, 
	{ name: 'mobile', title: 'Mobile No.'}, 
	{ name: 'age', title: 'Age'}, {name: 'gender', title: 'Gender'},
	{ name: 'createdAt', title: 'Register Date', format: formatDate}, 
] ;

const onDeleteClick = () => {
	console.log('deleted') ;
}

const usersData = {
	columns: userColumns, 
	actions: {
		before: ['sno'], 
		after: ['view', 'delete'],
		search: ['name', 'email', 'mobile'],
		delete: onDeleteClick
	},
	display: userDisplay,
} ;

export {usersData} ;