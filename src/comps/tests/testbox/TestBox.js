import React from 'react' ;
import { Link } from'react-router-dom' ;

import './tb.css' ;

const TestBox = (props) => {
	return(
		<div className = 'testbox'>
			<div className="testbox-left">
				<h2> {props.title} </h2>
				<p> {props.desc}  </p>
			</div>
			<div className="testbox-right">
				<Link className="sched-btn" to={props.link}> Take the Test </Link> 
			</div>
		</div>
	) ;
}

export default TestBox ;