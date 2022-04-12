import {formatDate} from './format.js' ;

const conAppColumns = [
	{name: 'sno'}, {name: 'owner'}, { name: 'mobile'}, { name: 'date'}, { name: 'title'},  { name: 'createdAt', title: 'Booked At', format: formatDate},  
] ;

const conAppDisplay = [
	{name: 'owner', title: 'Name'}, { name: 'mobile'}, { name: 'email'}, 
	{name: 'date', title: 'Appointment Time'}, { name: 'title', title: 'Reason'}, 
	{name: 'reason', title: 'Details'}, { name: 'createdAt', title: 'Booked At', format: formatDate}
] ;

const confirmedAppoint = {
	columns: conAppColumns, 
	display: conAppDisplay,
	actions: {
		before: [], 
		after: ['view'],
		search: ['sno', 'title'],
	},
} ;

const onOffSwitchClick = (e) => {
	if(e.target.checked) {
		const split = e.target.ariaLabel.split('+') ;
		fetch(`https://api.psyment.com/confirm-appoint?appoint=${split[1]}&name=${split[2]}&email=${split[3]}`)
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(resp => console.log(resp) ) 
		.catch( err => console.log(err) ) ;
	}
}

const appointRequest = {
	columns: conAppColumns, 
	display: conAppDisplay,
	actions: {
		before: [], 
		after: ['view', 'offswitch'],
		search: ['sno', 'title'],
		offswitch: onOffSwitchClick,
	},
} ;

export {confirmedAppoint, appointRequest} ;