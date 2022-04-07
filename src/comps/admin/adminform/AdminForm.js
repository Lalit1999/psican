import {useState, useEffect, useContext} from 'react';

import { isBlank, isLink, isNonZero, invalidEmail } from '../../../comps/valid.js' ;
import BasicForm from '../../../comps/basicform/BasicForm.js' ;
import {UserContext} from '../../../context/UserContext.js' ;

import './adminform.css' ;

const AdminForm = ({name, formData, sendRequest, errorObj, initData={}, btnText="Change"}) => {
	const [data, setData] = useState(initData) ;
	const [error, setError] = useState({}) ;
	const {userToken} = useContext(UserContext) ;

	const returnValid = (type, name) => {
		switch(type) {
			case 'blank' : return isBlank(data[name], name) ;
			case 'link' : return isLink(data[name], name) ;
			case 'number' : return isNonZero(data[name], name) ;
			case 'email' : return invalidEmail(data[name]) ;
			default : return false ;
		}
	}

	useEffect(() => {
		const errorCount = Object.keys(error).filter(one => error[one]).length ;
		const errorKeyCount = Object.keys(error).length ;
		if(errorCount === 0 && errorKeyCount > 0) {
			sendRequest(data, userToken) ;
		}
		//eslint-disable-next-line
	}, [error]) ;

	useEffect(()=>{
		if(data.flag === 'yes') {
			const newError = {} ;

			Object.keys(errorObj).forEach( one => newError[one] = returnValid(errorObj[one], one))

			setError(newError) ;
		}
		//eslint-disable-next-line
	}, [data])

	const onChangeClick = (obj) => setData({...obj, flag: 'yes'}) 

	if(Object.keys(data).length > 0)
		return (
			<div className="admin-form"> 
				<h3 className="login-heading">{name}</h3>
				<BasicForm data={formData} errors={error} onClick={{[btnText]: onChangeClick}} initData={initData}/>
			</div> 
		) ;
	else
		return <div className="admin-form"> This is Admin Form </div> ;
}

export default AdminForm ;