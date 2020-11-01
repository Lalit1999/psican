import React from 'react' ;
import { Link } from'react-router-dom' ;

import './tb.css' ;

class TestBox extends React.Component
{
	render()
	{
		return(
			<div className = 'testbox'>
				<div className="testbox-left">
					<h2> {this.props.title} </h2>
					<p> Anxiety test designed for evaluating anxiety levels of an individual.  </p>
				</div>
				<div className="testbox-right">
					<Link className="sched-btn" to={this.props.link}> Take the Test </Link> 
				</div>
			</div>
		) ;
	}
}

export default TestBox ;