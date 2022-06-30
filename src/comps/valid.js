// THIS FILE REQUIRES 'validator' PACKAGE TO WORK

import valid from 'validator' ;

const isBlank = (str, field) => {
	str = str.trim() ;
	if(str === '')
		return (field + ' can not be blank') ;
	else
		return false ;
}

const invalidEmail = (str) => {
	str = str.trim() ;
	if(str === '')
		return 'E-Mail can not be blank' ;
	else if(!valid.isEmail(str))
		return 'This might not be a valid E-Mail address';
	else
		return false ;
}

const invalidName = (str) => {
	str = str.trim() ;
	if(str === '')
		return 'Name(s) cannot be Blank' ;
	else if ( !valid.isAlpha(str.replace(/\s/g, 'z')))
		return 'Name(s) cannot contain digits(0-9) or Symbols' ;
	else 
		return false ;
}

const invalidPass = (str, str2) => {
	str = str.trim() ;
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
	str = str.trim() ;
	if(str === '')
		return 'Mobile No. can not be blank' ;
	else if(!valid.isNumeric(str))
		return 'Mobile No. must only contain digits or -';
	else if(str.length < 10)
		return 'Mobile No. must be at least 10 digits long' ;
	else if(str.length > 14)
		return 'Mobile No. can not be this long' ;
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

const invalidDate = (date) => {
	let current = new Date().toString() ;
	if(!valid.isDate(date))
		return 'Invalid Date' ;
	else if(!valid.isAfter(date, current))
		return 'Date must be after today' ;
	else
		return false ;
}

const isNonZero = (str, field) => {
	if(str === 0)
		return `${field} can not be 0` ;
	else
		return false ;
}

const isLink = (str, field) => {
	if(typeof str === 'object')
		return `${field} needs to be uploaded first`
	else {
		str = str.trim() ;
		if(str === '')
			return `${field} can not be blank` ;
		else if(!valid.isURL(str))
			return `${field} might not be a valid URL`;
		else
			return false ;
	}
}

export { isBlank, isMaxMin, invalidPass, invalidMobile, invalidEmail, invalidName, invalidDate, isLink, isNonZero} ;