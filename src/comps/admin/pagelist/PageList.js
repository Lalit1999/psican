import { Fragment } from 'react' ;
import Pagination from 'react-bootstrap/Pagination' ;

import './pagelist.css' ;

const PageList = ({current, setPage, max, start=0}) => {
	const checkMin = () => {
		if(current >= start+2)
			return (
				<Fragment>
					<Pagination.Prev onClick={()=>setPage(current-1)}/>
				    <Pagination.Item onClick={()=>setPage(current-2)}>{current-1}</Pagination.Item>
				    <Pagination.Item onClick={()=>setPage(current-1)}>{current}</Pagination.Item>
				</Fragment>
			) ;
		else if (current === start+1)
			return (
				<Fragment>
					<Pagination.Prev onClick={()=>setPage(current-1)}/>
				    <Pagination.Item onClick={()=>setPage(current-1)}>{current}</Pagination.Item>
				</Fragment>
			) ;
	}

	const checkMax = () => {
		if(current <= max-2)
			return (
				<Fragment>
					<Pagination.Item onClick={()=>setPage(current+1)}>{current+2}</Pagination.Item>
				    <Pagination.Item onClick={()=>setPage(current+2)}>{current+3}</Pagination.Item>
				    <Pagination.Next onClick={()=>setPage(current+1)}/>
				</Fragment>
			) ;
		else if (current === max-1)
			return (
				<Fragment>
					<Pagination.Item onClick={()=>setPage(current+1)}>{current+2}</Pagination.Item>
				    <Pagination.Next onClick={()=>setPage(current+1)}/>
				</Fragment>
			) ;
	}

	return (
		<div className="page-list"> 
			<Pagination>
			  {checkMin()}
			  <Pagination.Item active>{current+1}</Pagination.Item>
			  {checkMax()}
			</Pagination>
		</div>
	)
}

export default PageList ;