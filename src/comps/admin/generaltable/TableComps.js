import Button from 'react-bootstrap/Button' ;
import Form from 'react-bootstrap/Form' ;

import SortBtn from '../sortbtn/SortBtn.js' ;

const TableHeader = ({columns, before, after, filter, changeFilter, filterOrder}) => {
	const heads = {
		sno: <Button variant="light">SNo.</Button>,
		view: 'View',
		delete: 'Del',
		edit: 'Edit',
		checkbox: <Form.Check aria-label="select-all" />,
		switch: 'Active',
		cancel: 'Cancel Order'
	}

	if(columns.length>0)
		return (
			<thead className="gtable-head"><tr>
				{before.map((one, i)=><th key={i}>{heads[one]}</th>)}
				{columns.map((col, i) => <th key={i}><SortBtn text={col.title?col.title:col.name} click={changeFilter} icon={col.name === filter?filterOrder:' '} /></th>)}
				{after.map((one, i)=><th key={i}>{heads[one]}</th>)}
			</tr></thead>
		) ;
	else 
		return null ;
}

const TableCell = ({col, cellData}) => {
	if(col.format)
		if(col.args)
			return <td>{col.format(cellData, col.args)}</td>
		else
			return <td>{col.format(cellData)}</td>
	else
		return <td>{cellData}</td> ;
}

const DisplayElement = ({dis, data}) =>{
	return(
		<div className="data-flex"> 
			<p className="data-bold">{dis.title?dis.title:dis.name}</p>
			<div className="data-right">{dis.format?dis.format(data):data} </div>
		</div>
	) ;
}

export {TableCell, TableHeader, DisplayElement} ;