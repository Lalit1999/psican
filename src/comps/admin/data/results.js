import {formatDate, formatObj, formatDeepObj} from './format.js' ;

const ustopColumns = [
	{name: 'sno'}, { name: 'owner'}, 
	{ name: 'result', title: 'S Score', format: formatObj, args: 's'},
	{ name: 'result', title: 'A Score', format: formatObj, args: 'a'},
	{ name: 'result', title: 'E Score', format: formatObj, args: 'e'},
	{ name: 'result', title: 'Total', format: formatObj, args: 't'},
	{ name: 'createdAt', format: formatDate},  	
] ;

const ustopDisplay = [
	{ name: 'owner', title:'Name'}, { name: 'email', title:'E-Mail'}, 
	{ name: 'mobile', title:'Mobile No.'}, 
	{ name: 'result', title: 'S Score', format: formatObj, args: 's'}, 	
	{ name: 'result', title: 'A Score', format: formatObj, args: 'a'},
	{ name: 'result', title: 'E Score', format: formatObj, args: 'e'},
	{ name: 'result', title: 'Total', format: formatObj, args: 't'}, 
	{ name: 'createdAt', title:'Date', format: formatDate},
] ;

const nhapassColumns = [
	{name: 'sno'}, { name: 'owner'}, 
	{ name: 'result', title: 'N Grade', format: formatDeepObj, args: ['t', 'n'] },
	{ name: 'result', title: 'H Grade', format: formatDeepObj, args: ['t', 'h'] },
	{ name: 'result', title: 'A Grade', format: formatDeepObj, args: ['t', 'a'] },
	{ name: 'createdAt', format: formatDate},  	
] ;

const nhapassDisplay = [
	{ name: 'owner', title:'Name'}, { name: 'email', title:'E-Mail'}, 
	{ name: 'mobile', title:'Mobile No.'}, 
	{ name: 'result', title: 'N Grade', format: formatDeepObj, args: ['t', 'n'] }, 	
	{ name: 'result', title: 'H Grade', format: formatDeepObj, args: ['t', 'h'] },
	{ name: 'result', title: 'A Grade', format: formatDeepObj, args: ['t', 'a'] },
	{ name: 'createdAt', title:'Date', format: formatDate},
] ;

const accisColumns = [
	{ name: 'sno'}, { name: 'owner'}, { name: 'email'}, { name: 'mobile'}, 
	{ name: 'result', title: 'Total', format: formatObj, args: 't'}, 
	{ name: 'createdAt', format: formatDate},	
] ;

const accisDisplay = [
	{ name: 'owner', title:'Name'}, { name: 'email', title:'E-Mail'}, 
	{ name: 'mobile', title:'Mobile No.'}, 
	{ name: 'result', title: 'Total', format: formatObj, args: 't'}, 
	{ name: 'createdAt', title:'Date', format: formatDate}
] ;

const letaData = {
	columns: accisColumns, 
	display: accisDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno'],
	}
} ;

const accisData = {
	columns: accisColumns, 
	display: accisDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno'],
	}
} ;

const ustopData = {
	columns: ustopColumns, 
	display: ustopDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno'],
	}
} ;

const nhapassData = {
	columns: nhapassColumns, 
	display: nhapassDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno'],
	}
} ;

export {ustopData, letaData, accisData, nhapassData}