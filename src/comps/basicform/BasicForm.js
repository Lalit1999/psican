import {useEffect, useState, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import NumberInput from './inputs/NumberInput.js' ;
import DateInput from './inputs/DateInput.js' ;
import FileInput from './inputs/FileInput.js' ;
import Range from './inputs/Range.js' ;
import DropDown from './inputs/DropDown.js' ;
import ColorInput from './inputs/ColorInput.js' ;
import Text from './inputs/Text.js' ;
import TextArea from './inputs/TextArea.js' ;
import Btn from './inputs/Btn.js' ;
import IconBtn from './inputs/IconBtn.js' ;

import './form.css' ;

const BasicForm = ({initData, onClick, data, errors}) => {
	const [userData, setUserData] = useState(initData) ;

	useEffect( () => {
		setUserData(initData) ;
	}, [initData]) ;

	const createElement = (element) => {
		const {type, name} = element ;

		const formComps = {
			text: <Text data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]}/>,
			textArea: <TextArea data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]}/>,
			password : <Text type = "password" data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]}/>,
			disabled : <Text data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]} disabled={true}/>,
			plainText : <Text data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]} plaintext={true}/>,
			link: <Link to={element.to} className={element.style}>{name}</Link>,
			btn: <Btn data={element} userData={userData} onClick={onClick[name]}/>,
			iconBtn: <IconBtn data={element} userData={userData} onClick={onClick[name]} />,
			file : <FileInput data={element} onInputChange={onFileChange} error={errors[name]} />,
			multiFile : <FileInput data={element} onInputChange={onFileChange} error={errors[name]} multiple={true}/>,
			color: <ColorInput data={element} onInputChange={onInputChange} error={errors[name]}/>,
			dropdown : <DropDown data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]} />,
			range: <Range data={element} onInputChange={onInputChange} value={userData[name]} />,
			date: <DateInput data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]}/>,
			number: <NumberInput data={element} onInputChange={onInputChange} value={userData[name]} error={errors[name]}/>,
		} ;

		return formComps[type] ;
	}

	const onInputChange = (event) => {
		setUserData({...userData, [event.target.name] : event.target.value}) ;
	}

	const onFileChange = (event) => {
		const {files} = event.target ;
		
		if(files && files.length > 0)
			setUserData({...userData, [event.target.name] : files}) ;
		else
			setUserData({...userData, [event.target.name] : []}) ; 
	}

	return (
		<Form noValidate >
			{	data.map( (one, i) => {
					return (<Row className="mb-3" key={i}> 
						{one.map((two, i) => <Fragment key={i}>{createElement(two)}</Fragment> )} 
					</Row>)
				}) 
			}
		</Form>
	) ;
}

export default BasicForm ;