import {useState, useEffect} from 'react' ;
import Table from 'react-bootstrap/Table' ;
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons' ;
import { Link } from'react-router-dom' ;

import DropDown from '../../../comps/basicform/inputs/DropDown.js' ;
import PageList from '../pagelist/PageList.js' ;
import TableRow from './TableRow.js' ;
import {TableHeader} from './TableComps.js' ;
import './gtable.css' ;

const GeneralTable = ({name, data, columns, actions, display, editData}) => {
	const [sideMenu, setSideMenu] = useState(null) ;
	const [sideMenuOpen, setSideMenuOpen] = useState(false) ;
	const [selected, setSelected] = useState([]) ;
	const [filter, setFilter] = useState('createdAt') ;
	const [filterOrder, setFilterOrder] = useState('asc') ;
	const [qty, setQty] = useState(15) ;
	const [page, setPage] = useState(0) ;
	const [searchText, setSearchText] = useState('') ;
	const [filteredData, setFilteredData] = useState(data) ;

	useEffect( () => {
		if(sideMenu)
			setSideMenuOpen(!sideMenuOpen) ;
		//eslint-disable-next-line
	}, [sideMenu]) ;

	useEffect( ()=> {
		setFilteredData(data.filter(one => actions.search.map(two => one[two]).join(' ').toLowerCase().includes(searchText.toLowerCase())) )
	}, [data, searchText, actions])

	// console.log(selected) ;
	const propObj = {columns, actions, selected, setSelected, setSideMenu, display, editData} ;

	const createRows = () => {
		const compare = ( a, b ) => {
			if(filter !== ' ') {
				let mul = filterOrder === 'asc'?1:-1 ;
				let ans ;	
			  	if( a[filter] < b[filter] )
			    	ans = -1;
			  	else
			    	ans = 1;
			    return ans*mul ;
			}		
		  	return 0;
		}

		return filteredData.sort(compare).slice(page*qty, (page*qty)+qty).map( (one, i) => <TableRow key={i} sno={i+1} rowData={one} open={handleOpen} {...propObj} /> ) ;
	}

	const handleClose = () => setSideMenuOpen(false) ;
	const handleOpen = () => setSideMenuOpen(true) ; 

	const changeFilter = (str) => {
		if(filter === str) {
			if(filterOrder === 'asc')
				setFilterOrder('desc') ;
			else {
				setFilter('createdAt') ;
				setFilterOrder('asc') ;
			}
		}
		else {
			setFilter(str) ;
			setFilterOrder('asc') ;
		}
	}
	const headProps = {columns, before:actions.before, after:actions.after, filter, filterOrder, changeFilter} ; 

	const checkLength = () => (searchText.length > 0?'':'hide')
	const clearSearch = () => setSearchText('') ;

	const getMax = () => (filteredData.length%qty===0)?(filteredData.length/qty)-1:(Math.floor(filteredData.length/qty))

	if(data.length > 0)
		return (
			<div>
				<div className="table-title">
					<h3 className="login-heading">{name}</h3>
					<p className="total-rows"> Total No. of Rows : {filteredData.length} </p>
					<div className = 'search-con'>
						<input className = "search-input" type = 'text' placeholder='Search' value={searchText} onChange={e=>{
								setSearchText(e.target.value) ;
								setPage(0) ;
							}} />
						<FontAwesomeIcon className={checkLength()} icon={faTimes} onClick={clearSearch} />
						<Link className="search-btn" to=""><FontAwesomeIcon icon={faSearch}/></Link>
					</div>
					<div className="dd-con">
						<PageList current={page} setPage={setPage} max={getMax()}/>
						<DropDown onInputChange={e=>{
							setQty(Number.parseInt(e.target.value)) ;
							setPage(0) ;
						}} value={qty} error={false} data={ {name: 'qty', label: 'No. of Rows', options: [5, 15, 30, 50, 100, 250]} }/>
					</div>
				</div>
	            <Table className="gtable" striped bordered hover responsive>
				  <TableHeader {...headProps} />
				  <tbody>{createRows()}</tbody>
				</Table>
				<Offcanvas show={sideMenuOpen} onHide={handleClose} placement="end">
			        <Offcanvas.Header closeButton>
			          	<Offcanvas.Title className="offcanvas-title">
			          		{name} data
			          	</Offcanvas.Title>
			        </Offcanvas.Header>
			        <Offcanvas.Body>
			          	<div className="offcanvas-body" >
			 				{sideMenu}
			 			</div>
			        </Offcanvas.Body>
		      	</Offcanvas>
	        </div>
	    ) ;
	else
		return <div> This is Table </div> ;
}

export default GeneralTable ;