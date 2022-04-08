import {formatDate} from './format.js' ;

const messageColumns = [
	{ name: 'sno'}, { name: 'name'}, { name: 'email'}, { name: 'mobile'}, { name: 'message'}, 
	{ name: 'createdAt', format: formatDate}
] ;

const messageDisplay = [
	{ name: 'name', title:'Name'}, { name: 'email', title:'E-Mail'}, { name: 'mobile', title:'Mobile No.'}, { name: 'message', title:'Message'}, { name: 'createdAt', title:'Date', format: formatDate}
] ;

const onDeleteClick = () => {
	console.log('deleted') ;
}

const msg = {
	columns: messageColumns, 
	display: messageDisplay,
	actions: {
		before: [], 
		after: ['view', 'delete'],
		search: ['name', 'mobile', 'email', 'message'],
		delete: onDeleteClick
	}
} ;

export { msg } ;