import {Fragment, useState} from 'react' ;
import Button from 'react-bootstrap/Button' ;
import Form from 'react-bootstrap/Form' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons' ;

import Sure from '../../../comps/sure/Sure.js' ;
import AdminForm from '../adminform/AdminForm.js' ;
import {DisplayElement, TableCell} from './TableComps.js' ;
import './gtable.css' ;

const TableRow = ({sno, rowData, columns, actions, selected, setSelected, setSideMenu, display, editData}) => {
	const [active, setActive] = useState(true) ;
	const [checked, setChecked] = useState(false) ;
	const [checked2, setChecked2] = useState(false) ;

	const toggleActive = () => setActive(!active) ;	
	const toggleCheckBox = () => setChecked(!checked) ;	
	const toggleCheckBox2 = () => setChecked2(!checked2) ;	

	const onSwitchClick = (event) => {
		toggleActive() ;
		actions['switch'](event) ;
	}

	const onOffSwitchClick = (event) => {
		toggleCheckBox2() ;
		actions['offswitch'](event) ;
	}

	const onCheckBoxClick = (event) => {
		toggleCheckBox() ;
		const contains = selected.filter(one => one !== event.target.ariaLabel) ;
		if(selected.length === contains.length)
			setSelected([...selected, event.target.ariaLabel]) ;
		else
			setSelected(contains) ;
	}

	const onViewClick = () => {
		// console.log(rowData) ;
		if(display)
			setSideMenu(display.map((dis, i)=> <DisplayElement key={i} dis={dis} data={rowData[dis.name]} />)) ;
	}

	const onEditClick = () => {
		// console.log(rowData) ;
		// setSideMenu('qwerty') ;
		if(editData) 
			setSideMenu(<AdminForm {...editData} initData={rowData}/>) ;
	}

	const onDeleteClick = () => {
		if(actions['delete'])
			setSideMenu(
				<Sure descr="Are your sure you want to Delete?" onYesClick={actions['delete']} onNoClick={()=>setSideMenu(" ")} 
				/>
			) ;
	}

	const createTableComps = (one, sno) => {
		const {_id, owner, email} = rowData ;

		const aria = `${one}+${_id}+${owner}+${email}` ;

		const tableComps = {
			sno: <td onClick={actions['sno']}>{sno}</td>,
			view: <td onClick={onViewClick}><FontAwesomeIcon className="gtable-icon gtable-eye" icon={faEye} /></td>,
			checkbox: <td><Form.Check aria-label={aria} onChange={onCheckBoxClick} checked={checked}/></td>,
			delete: <td onClick={onDeleteClick}><FontAwesomeIcon className="gtable-icon gtable-trash" icon={faTrash} /></td>,
			edit: <td onClick={onEditClick}><FontAwesomeIcon className="gtable-icon gtable-pen" icon={faPenToSquare} /></td>,
			switch: <td><Form.Check aria-label={aria} type="switch" checked={active} onChange={onSwitchClick}/></td>,
			offswitch: <td><Form.Check aria-label={aria} type="switch" checked={checked2} onChange={onOffSwitchClick}/></td>,
			cancel: <td onClick={actions['cancel']}><Button variant="danger">Cancel</Button></td>,
		}

		return tableComps[one] ;
	}

	return (
		<tr>
			{actions.before.map((one, i) => <Fragment key={i}>{createTableComps(one, sno)}</Fragment>)}
			{columns.map((col, i)=> <TableCell key={i} col={col} cellData={rowData[col.name]} />)}
			{actions.after.map((one, i) => <Fragment key={i}>{createTableComps(one, sno)}</Fragment>)}
		</tr>
	) ;
}

export default TableRow ;