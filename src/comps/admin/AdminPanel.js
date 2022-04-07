import {useState, useEffect, Fragment} from 'react' ;
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import AdminForm from './adminform/AdminForm.js' ;
import GeneralTable from './generaltable/GeneralTable.js' ;
import './admin.css' ;

const Dashboard = ({data}) => {
	return <div> This is Dashboard </div> ;
}

const AdminPanel = ({panelData}) => {
	const [components, setComponents] = useState({}) ;
	const [mode, setMode] = useState('Dashboard') ;
	
	useEffect( () => {
		const comps = panelData.map(one => {
			if(one.children)
				return one.children ;
			else
				return one ;
		}).flat().map((one, i) => {
			const match = {
				table: <GeneralTable key={i} {...one} />,
				form: <AdminForm key={i} {...one}/>,
				dashboard: <Dashboard key={i} {...one} />,
			}

			return { key: one.name, value: match[one.type] } ;
			//eslint-disable-next-line
		}).reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});

		setComponents(comps) ;
	}, [panelData]) ;

	const createSideBarElement = (el) => {
		if(el.type === "parent")
			return (
				<Accordion flush>
					<Accordion.Item eventKey="0">
					    <Accordion.Header>{el.name}</Accordion.Header>
					    <Accordion.Body>
					      {el.children.map((one, i)=><Fragment key={i}>{createSideBarElement(one)}</Fragment>)}
					    </Accordion.Body>
				    </Accordion.Item>
			 	</Accordion> 
			);
		else
			return (
				<Button selected={mode===el} variant="light" onClick={() => setMode(el.name)}>
					{el.name}
				</Button>
			) ;
	}

	return (
		<div className="admin-panel">
			<div className="userp-left admin-sidebar"> 
				{ panelData.map((one, i) => <Fragment key={i}>{createSideBarElement(one)}</Fragment>) } 
			</div>
			<div className="admin-right">
				{components[mode]}
			</div>
		</div>
	) ;
}

export default AdminPanel ;