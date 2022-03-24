import { Link } from'react-router-dom' ;

import './tb.css' ;

const TestBox = ({title, desc, link}) => {
	return(
		<div className = 'testbox'>
			<div className="testbox-left">
				<h2> {title} </h2>
				<p> {desc}  </p>
			</div>
			<div className="testbox-right">
				<Link className="sched-btn" to={link}> Take the Test </Link> 
			</div>
		</div>
	) ;
}

export default TestBox ;