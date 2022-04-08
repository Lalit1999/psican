import {formatDate, formatObj} from './format.js' ;

const ustopColumns = [
	{name: 'sno'}, { name: 'owner'}, { name: 'createdAt', format: formatDate}, 
	{ name: 'result', title: 'S Score', format: formatObj, args: 's'},
	{ name: 'result', title: 'A Score', format: formatObj, args: 'a'},
	{ name: 'result', title: 'E Score', format: formatObj, args: 'e'},
	{ name: 'result', title: 'Total', format: formatObj, args: 't'}, 	
] ;

const messageDisplay = [
	{ name: 'name', title:'Name'}, { name: 'email', title:'E-Mail'}, { name: 'mobile', title:'Mobile No.'}, { name: 'message', title:'Message'}, { name: 'createdAt', title:'Date', format: formatDate}
] ;

const onDeleteClick = () => {
	console.log('deleted') ;
}

const letaData = {} ;
const accisData = {} ;

const ustopData = {
	columns: ustopColumns, 
	display: messageDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno'],
		delete: onDeleteClick
	}
} ;

export {ustopData, letaData, accisData}