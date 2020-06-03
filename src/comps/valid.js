// THIS FILE REQUIRES 'validator' PACKAGE TO WORK

import valid from 'validator' ;

const isBlank = (str, field) => {
	if(str === '')
		return (field + ' can not be blank') ;
	else
		return false ;
}

const invalidEmail = (str) => {
	if(str === '')
		return 'E-Mail can not be blank' ;
	else if(!valid.isEmail(str))
		return 'This might not be a valid E-Mail address';
	else
		return false ;
}

const invalidPass = (str, str2) => {
	if(str === '' || str2 === '')
		return 'Password can not be blank' ;
	else if (str.length < 6 || str2.length < 6 )
		return 'Password must be at least 6 digits long' ;
	else if ( str !== str2 )
		return 'Re-Password must match password' ;
	else
		return false ;
}

const invalidMobile = (str) => {
	if(str === '')
		return 'Mobile No. can not be blank' ;
	else if(!valid.isNumeric(str))
		return 'Mobile No. must only contain digits or -';
	else if(str.length < 10)
		return 'Mobile No. must be at least 10 digits long' ;
	else
		return false ;
}

const isMaxMin = (str, field, min, max) => {
	if(str === 0)
		return (field + ' can not be 0') ;
	else if(str < min || str > max)
		return (field + ' must be between '+ min +' & '+ max) ;
	else
		return false ;
}

export { isBlank, isMaxMin, invalidPass, invalidMobile, invalidEmail} ;