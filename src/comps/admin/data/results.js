import {formatDate} from './format.js' ;

const formatTotal = (data) => {
	console.log(data) ;
	return data ;
}

const ustopColumns = [
	{ name: 'owner'}, { name: 'createdAt', format: formatDate}, { name: 'result', title: 'Total', format: formatTotal}, 	
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
		before: ['sno'], 
		after: ['view'],
		search: [],
		delete: onDeleteClick
	}
} ;

export {ustopData, letaData, accisData}